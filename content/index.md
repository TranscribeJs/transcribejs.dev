<div class="cover">
  <main id="main" class="content flow" style="--flow-spacing:2rlh;">
    <h1>Transcribe.js <span class="version">__VERSION__</span></h1>
    <p>Speech to text in the browser.</p>

```js
import createModule from "@transcribe/shout";
import { FileTranscriber } from "@transcribe/transcriber";

// create new instance
const transcriber = new FileTranscriber({
  createModule,
  model: "ggml-tiny-q5_1.bin", // path to ggml model file
});

// init wasm transcriber worker
await transcriber.init();

// transcribe audio/video file
const result = await transcriber.transcribe("my.mp3");
```

    <p class="flex" style="gap:2rlh">
      <a href="https://github.com/transcribejs/transcribe.js" class="btn outline">GitHub</a>
      <a href="/docs" class="btn">Documentation</a>
    </p>

  </main>
</div>
