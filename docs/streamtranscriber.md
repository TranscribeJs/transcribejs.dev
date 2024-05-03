# Stream Transcriber (experimental)

StreamTranscriber transcribes audio from stream media like microphone input. The transcriber waits for voice activity, buffers/records audio and sends the audio data to the wasm.

Unfortunatly processing is ~way too slow~ _depends on your machine and the size of the model_ for real time applications. But maybe this will work in the future. Also this doesn't work in Firefox unless the stream source has a sample rate of 16kHz.

Future ideas:

- add better vad ([Silero VAD](https://github.com/snakers4/silero-vad))
- fix firefox by providing own sample rate convertion (instead of web audio api)

[Stream Example](https://examples.transcribejs.dev/examples/stream.html)

```js
import { StreamTranscriber } from "@transcribe/transcriber";

// create new instance
const streamTranscriber = new StreamTranscriber({
  model: "/your/project/model.bin",
  wasmWorkerPath: "/your/project",
  audioWorkletsPath: "/your/project/audio-worklets",

  // called on new transcription
  onSegment: (segment) => {
    console.log(segment);
  },
});

// init wasm transcriber worker
await streamTranscriber.init();

// start transcriber wasm wait for audio
await streamTranscriber.start({
  lang: "en", // language code
  threads: this.maxThreads, // max threads to use
  translate: false, // translate to english
  suppress_non_speech: true, // ignore non speech tokens
  max_tokens: 32, // max token number
  audio_ctx: 756, // size of audio context
});

// create audio context and media stream
const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

// start transcribing
// audio gets transcribed when silence is detected or maxRecordMs is reached
streamTranscriber.transcribe(stream, {
  preRecordMs: 200, // pre record audio, because vad needs some time
  maxRecordMs: 5000, // max buffer size in milliseconds
  minSilenceMs: 500, // min time of silence before call transcribe
  onVoiceActivity: (active) => {
    console.log("Voice Activity: ", active);
  },
});

// ...do stuff

// stop stream when not needed
await streamTranscriber.stop();

// destroy instance
streamTranscriber.destroy();
```
