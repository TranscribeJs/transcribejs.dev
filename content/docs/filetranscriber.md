---
title: "File Transcriber"
---

# File Transcriber

FileTranscriber transcribes audio from media files like mp3, mp4, wav, ogg, ect.
The supported file types depend on the browser used. Every format that can be played by the `<audio>` or `<video>` tag should work.

Full example of the `FileTranscriber`.

```js
import createModule from "/your/project/shout.wasm.js"; // make sure to exclude from your bundler
// import createModule from "@transcribe/shout"; // if you use import map
import { FileTranscriber } from "@transcribe/transcriber";

// create new instance
const transcriber = new FileTranscriber({
  createModule, // create module function from emscripten wasm build
  model: "/path/to/model.bin", // can be path to model file, or File() object

  dtwType: "tiny", // optional, use for word level timestamps, must match model type (tiny, tiny.en, base, base.en, ...)

  // custom build callbacks
  onReady: () => console.log("ready"), // called after init, aka. transcriber is ready
  onProgress: (progress) => console.log(progress), // progress 0..100
  onSegment: (segment) => console.log(segment), // on new segement
  onComplete: (result) => console.log(result), // on transcription done
  onCanceled: () => console.log("canceled"), // called after transcriber.cancel() when the wasm operation actually canceled

  print: (message) => console.log(message), // message print to stdout
  printErr: (message) => console.error(message), // message print to errout

  // other emscripten Module callbacks
  preInit: () => {},
  preRun: () => {},
  onAbort: () => {},
  onExit: (existStatus) => {},
});

// init wasm (loads model file and creates a new shout instance)
await transcriber.init();

// transcribe audio/video file
const result = await transcriber.transcribe(
  "my.mp3", // path to media file, or File() object
  {
    lang: "en", // language of the speech to transcribe
    threads: 2, // use number of threads (choose based on number of instances and hardware)
    translate: false, // translate to english
    max_len: 0, // limit max number of characters in one token, 0 -> no limit
    split_on_words: false, //split on new word rather than token
    suppress_non_speech: false, // remove non speech tokens
    token_timestamps: true, // calculate token level timestamps
  }
);

console.log(result);

// clear instances and memory when all transcriptions are done
transcriber.destroy();
```
