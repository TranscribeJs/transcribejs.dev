---
title: "SvelteKit"
---

# SvelteKit

[Full Working Example](https://github.com/TranscribeJs/examples/tree/main/svelte-kit)

## Install

Install the package

```bash
npm install @transcribe/transcriber
```

## Cross-Origin Headers

The wasm files must be served with the correct Cross-Origin headers. Otherwise browsers will refuse to load the files.

For the development server the headers are added by a "plugin" in `vite.config.ts`.

```js
// vite.config.ts

// ...

export default defineConfig({
  plugins: [
    {
      name: "configure-response-headers",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
          res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
          next();
        });
      },
    },
    sveltekit(),
  ],
  // ...
});
```

For the preview server you can use the `adapter-node` in combination with a [custom server](https://svelte.dev/docs/kit/adapter-node#Custom-server) that adds the headers.

```js
// server.js

// ...

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// ...
```

Depending on your deployment target you need to make sure that the webserver sets the [correct headers](/docs/prerequisite) for `shout.wasm.js` and `shout.wasm.worker.mjs` .

## Import/Bundle

Exclude the `@transcribe/shout` package from dependency optimization and set `worker.format: "es"`.

```js
// vite.config.ts

// ...

export default defineConfig({
  // ...
  optimizeDeps: {
    exclude: ["@transcribe/shout"],
  },
  worker: {
    format: "es",
  },
});
```

## Usage

Now you can use Transcribe.js in your Svelte-Kit components

```html
// +page.svelte
<script lang="ts">
  import createModule from "@transcribe/shout";
  import { onMount } from "svelte";
  import { FileTranscriber } from "@transcribe/transcriber";

  let transcriber: FileTranscriber;

  async function transcribe() {
    // check if transcriber is initialized
    if (!transcriber?.isReady) return;

    // there must be at least one user interaction (e.g click) before you can call this function
    const result = await transcriber.transcribe("/jfk.wav", { lang: "en" });

    // do something with the result json
    this.result = result.transcription.map((t) => t.text).join(" ");
  }

  onMount(async () => {
    // create new instance
    transcriber = new FileTranscriber({
      createModule,
      model: "/ggml-tiny-q5_1.bin",
    });

    // and initialize the transcriber
    await transcriber.init();
  });
</script>
```

**Note:** Transcribe.js only runs in the browser. Node.js is not supported. Make sure that the code only gets executed in browser context and on/after user interaction.
