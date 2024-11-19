SvelteKit

[Full Working Example](https://github.com/TranscribeJs/examples/tree/main/svelte-kit)

## Install

Install the package

```bash
npm install @transcribe/transcriber
```

and copy the files from `@transcribe/shout` to `/public`

```bash
cp -r node_modules/@transcribe/shout/src/shout/* static/
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

## Usage

Rollup is not able to bundle `shout.wasm.js`. Also using an `importmap` like in Svelte doesn't work. To work around this we use a dynamic import that loads the module from `/static/shout.wasm.js`.

First exclude `shout.wasm.js` from the bundler in `vite.config.ts`

```js
// vite.config.ts

// ...

export default defineConfig({
  // ...
  build: {
    rollupOptions: {
      external: ["/shout.wasm.js?url"],
    },
  },
});
```

then use dynamic `import("/shout.wasm.js?url")` in the component

```js
// +page.svelte
<script>
import { onMount } from "svelte";
import { FileTranscriber } from "@transcribe/transcriber";

let createModule;

async function transcribe() {
    if (!createModule) {
      console.error("WASM module not loaded yet");
      return;
    }

    const transcriber = new FileTranscriber({
      createModule,
      model: "/ggml-tiny-q5_1.bin",
      workerPath: "/",
    });

    await transcriber.init();

    const result = await transcriber.transcribe("/jfk.wav", { lang: "en" });
  }


onMount(async () => {
  // dynamic import wasm module from /static
  // this is a workaround because Rollup can't bundle this file
  createModule = (await import("/shout.wasm.js?url")).default;
});
</script>
```

**Note:** Transcribe.js only runs in the browser. Node.js is not supported. Make sure that the code only gets executed in browser context and on/after user interaction.
