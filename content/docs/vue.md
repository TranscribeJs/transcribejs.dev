# Vue

[Full Working Example](https://github.com/TranscribeJs/examples/tree/main/vue)

## Install

Install the package

```bash
npm install @transcribe/transcriber
```

and copy the files from `@transcribe/shout` to `/public`

```bash
cp -r node_modules/@transcribe/shout/src/shout/* public/
```

### Cross-Origin Headers

The wasm files must be served with the correct Cross-Origin headers. Otherwise browsers will refuse to load the files.

For the development and preview server the headers are added in `vite.config.ts`.

```js
// vite.config.ts

// ...

export default defineConfig({
  // ...
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
  preview: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
});
```

## Import/Bundle

Rollup is not able to bundle `shout.wasm.js`. To work around this we include an `importmap` in `index.html` that loads the module

```html
<!-- index.html -->
<head>
  <!-- ... -->
  <script type="importmap">
    {
      "imports": {
        "@transcribe/shout": "/shout.wasm.js"
      }
    }
  </script>
  <!-- ... -->
</head>
```

and exclude the package from the bundler

```js
// vite.config.ts

// ...

export default defineConfig({
  // ...
  build: {
    rollupOptions: {
      external: ["@transcribe/shout"],
    },
  },
});
```

## Usage

Now you can use Transcribe.js in your Vue components

```html
<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import createModule from "@transcribe/shout";
  import { FileTranscriber } from "@transcribe/transcriber";

  let transcriber: FileTranscriber;
  const text = ref<string>("");

  async function transcribe() {
    // check if transcriber is initialized
    if (!transcriber?.isReady) return;

    // there must be at least one user interaction (e.g click) before you can call this function
    const result = await transcriber.transcribe("/jfk.wav", { lang: "en" });

    // do something with the result
    text.value = result.transcription.map((t) => t.text).join(" ");
  }

  onMounted(async () => {
    // create new instance
    transcriber = new FileTranscriber({
      createModule,
      model: "/ggml-tiny-q5_1.bin",
      workerPath: "/",
    });

    // and initialize the transcriber
    await transcriber.init();
  });
</script>
```
