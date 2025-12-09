---
title: "Nuxt"
---

# Nuxt

[Full Working Example](https://github.com/TranscribeJs/examples/tree/main/nuxt)

## Install

Install the package

```bash
npm install @transcribe/transcriber
```

### Model file

Download a model file from [https://huggingface.co/ggerganov/whisper.cpp/tree/main](https://huggingface.co/ggerganov/whisper.cpp/tree/main) and place it in your public folder. eg. `/public/ggml-tiny-q5_1.bin` .

### Cross-Origin Headers

The wasm files must be served with the correct Cross-Origin headers. Otherwise browsers will refuse to load the files.

For the development and preview server the headers are added in `nuxt.config.ts`.

Exclude the `@transcribe/shout` package from dependency optimization and set `worker.format: "es"`.

```js
// nuxt.config.ts

// ...
export default defineNuxtConfig({
  // ...
  routeRules: {
    "/**": {
      headers: {
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cross-Origin-Opener-Policy": "same-origin",
      },
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@transcribe/shout"],
    },
    worker: {
      format: "es",
    },
    server: {
      headers: {
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cross-Origin-Opener-Policy": "same-origin",
      },
    },
  },
});
```

## Usage

Now you can use Transcribe.js in your Nuxt components

```html
<script setup lang="ts">
  import { onMounted, ref } from "nuxt";
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
      model: "/ggml-tiny-q5_1.bin", //model file in your public folder
    });

    // and initialize the transcriber
    await transcriber.init();
  });
</script>
```
