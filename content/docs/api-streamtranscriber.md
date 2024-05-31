# StreamTranscriber API

Transcribe an audio stream (e.g microhpone input) to text using the whisper.cpp speech-to-text implementation. This is experimental and not working in Firefox because sample rate conversion with AudioContext is not supported. Also, wasm is way to slow for real-time transcription.

## StreamTranscriber(options)

Creates a new StreamTranscriber instance.

### Syntax

```js
const streamTranscriber = new StreamTranscriber(options);
```

### Parameters

| **Param**         | **Type**                                     | **Default**                                                 | **Description**                                                                                                            |
| :---------------- | -------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **options**       | `FileTranscriberOptions`                     |                                                             |
| createModule      | `(moduleArg = {}) => Promise<any>`           |                                                             | Exported `createModule()` function from `@transcribe/shout`                                                                |
| model             | `string` \| `File`                           |                                                             | Whisper.cpp model file in ggml format. Will call `fetch()` if string, otherwise will use the provided file.                |
| workerPath        | `string`                                     | Defaults to the directory where `shout.wasm.js` is located. | Path to `shout.wasm.worker.mjs` file.                                                                                      |
| audioWorkletsPath | `string`                                     | `${currentUrl}/audio-worklets`                              | Path to `vad.js` & `buffer.js` files. Defaults to the `audio-worklets/` directory where `StreamTranscriber.js` is located. |
| onReady           | `() => void`                                 | `() => {}`                                                  | Called after init.                                                                                                         |
| onStreamStatus    | `(status: StreamStatus) => void`             | `() => {}`                                                  | Called when stream status changes. `StreamStatus: "loading" \| "waiting" \| "processing" \| "stopped"`                     |
| onSegment         | `(segment: TranscribeResultSegment) => void` | `() => {}`                                                  | Called when a new transcribed segment is ready.                                                                            |

### Returns

A new `StreamTranscriber` instance.

## init()

Loads model, audio worklets and creates a new wasm instance. **Must** be called before `start()`.

### Syntax

```js
await streamTranscriber.init();
```

### Returns

A promise resolving to void `Promise<void>`.

## start(options?)

Starts a new stream transcriber (technically a loop in wasm space waiting for audio input). **Must** be called before `transcribe()`.

### Syntax

```js
await streamTranscriber.start(options);
```

### Parameters

| **Param**           | **Type**                 | **Default**        | **Description**                                                |
| :------------------ | ------------------------ | ------------------ | -------------------------------------------------------------- |
| **options**         | `FileTranscriberOptions` |                    |                                                                |
| lang                | `string`                 | `"auto"`           | Language code of the audio language (eg. `"en"`)               |
| threads             | `number`                 |  `this.maxThreads` | Number of threads to use. Defaults to max available.           |
| translate           | `boolean`                | `false`            | Translate result to english.                                   |
| suppress_non_speech | `boolean`                | `false`            | If true, transcriber will try to suppress non-speech segments. |
| max_tokens          | `number`                 | `16`               | Maximum number of tokens in a single segment, see whisper.cpp. |
| audio_ctx           | `boolean`                | `512`              | Audio context buffer size in samples, see whisper.cpp.         |

### Returns

A promise resolving to void `Promise<void>`.

## stop()

Stops wasm loop waiting for audio input.

### Syntax

```js
await streamTranscriber.stop();
```

### Returns

A promise resolving to void `Promise<void>`.

## transcribe(stream, options?)

Transcribes the audio signal from `stream`. Wasm calls the `onSegment(result)` callback once the transcription is ready.

The function starts buffering the audio when speech is detected. The buffer is then sent to wasm when silence is detected or `maxRecordMs` is exceeded.

### Syntax

```js
await streamTranscriber.transcribe(stream, options);
```

| **Param**       | **Type**                     | **Default** | **Description**                                                                          |
| :-------------- | ---------------------------- | ----------- | ---------------------------------------------------------------------------------------- |
| **options**     | `FileTranscriberOptions`     |             |                                                                                          |
| preRecordsMs    | `number`                     | `200`       | Time of audio in ms to include before, because voice activity detection needs some time. |
| maxRecordMs     | `number`                     | `5000`      | If buffer reaches this length it will get flushed to wasm, even during speech.           |
| minSilenceMs    | `number`                     | `500`       | Minimum time in ms of silence before transcribe is called.                               |
| onVoiceActivity | `(active: boolean) => void`  |             | Called when there's a change in voice activity.                                          |

### Returns

A promise resolving to void `Promise<void>`.

## destroy()

Destroys the wasm instance and frees wasm memory.

### Syntax

```js
transcriber.destroy();
```
