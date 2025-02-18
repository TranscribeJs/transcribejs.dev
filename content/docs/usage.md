# Usage

Check out the [Example](https://examples.transcribejs.dev/examples/index.html).

```js
import createModule from "@transcribe/shout"; // if you use import map or bundler like vite
// import createModule from "/your/project/shout.wasm.js"; // you can also exclude @transcibe/shout from your bundler and import them manually
import { FileTranscriber } from "@transcribe/transcriber";

// create new instance
const transcriber = new FileTranscriber({
  createModule, // create module function from emscripten build
  model: "/your/project/ggml-tiny-q5_1.bin", // path to ggml model file
  // workerPath: "/your/project", // only set if you don't use a bundler; directory of shout.wasm.worker.mjs copied before
});

// init wasm transcriber worker
await transcriber.init();

// transcribe audio/video file
const result = await transcriber.transcribe("/your/project/my.mp3");

console.log(result);
```

The `result` is an JSON object containg the text segements and timestamps.

```js
{
  "result": {
    "language": "en"
  },
  "transcription": [
    {
      "timestamps": {
        "from": "00:00:00,000",
        "to": "00:00:11,000"
      },
      "offsets": {
        "from": 0,
        "to": 11000
      },
      "text": " And so my fellow Americans ask not what your country can do for you, ask what you can do for your country.",
      "tokens": [
        {
          "text": " And",
          "timestamps": {
            "from": "00:00:00,320",
            "to": "00:00:00,350"
          },
          "offsets": {
            "from": 320,
            "to": 350
          },
          "id": 400,
          "p": 0.726615 // propability, aka. how likely the estimate is true, 0..1, 1 is best
        },
        // ... one token per word
      ]
    }
  ]
}
```
