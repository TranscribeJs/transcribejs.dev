# FileTranscriber API

Transcribe speech from audio/video files to text using the whisper.cpp speech-to-text implementation.

## FileTranscriber(options)

Create a new FileTranscriber instance.

### Syntax

```js
const transcriber = new FileTranscriber(options);
```

### Parameters

| **Param**   | **Type**                                                                       | **Description**                                                                                              |
| :---------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| **options** | `FileTranscriberOptions`                                                       |                                                                                                              |
| model       | `string` \| `File`                                                             | Whisper.cpp model file in ggml format. Will call `fetch()` if string, otherwise will use the provided file.  |
| workerPath  | `string`                                                                       | Path to `shout.wasm.worker.mjs` file. Defaults to the directory where `shout.wasm.js` is located.            |
| dtwType     | `DtwType: "tiny" \| "base" \| "small" \| "tiny.en" \| "base.en" \| "small.en"` | Specify the type of the model used if should compute word level timestamps using DTW algorithm.              |
| onReady     | `() => void`                                                                   | Called after init.                                                                                           |
| onProgress  | `(progress: number) => void`                                                   | Called on progress (new segment), `0..100`                                                                   |
| onCanceled  | `() => void`                                                                   | Called after transcription process got canceled.                                                             |
| onSegment   | `(segment: TranscribeResultSegment) => void`                                   | Called when a new transcribed segment is ready.                                                              |
| onComplete  | `(result: TranscriptionResult) => void`                                        | Called when transcription is complete.                                                                       |

### Returns

Returns a new `FileTranscriber` instance.

## init()

Loads model and creates a new shout instance. **Must** be called before `transcribe()`.

### Syntax

```js
await transcriber.init();
```

### Returns

A promise that resolves to void `Promise<void>`.

## transcribe(file, options?)

Transcribes audio to text and returns a `Promise` that resolves with a `TranscriptionResult` that contains the transcription data as JSON.

### Syntax

```js
await transcriber.transcribe("my.mp3");
await transcriber.transcribe("my.mp3", options);
await transcriber.transcribe(file, options);
```

### Parameters

| **Param**           | **Type**                 | **Default**        | **Description**                                                      |
| :------------------ | ------------------------ | ------------------ | -------------------------------------------------------------------- |
| **audio**           | `string \| File`         |                    | URL to audio file or `File` object.                                  |
| **options**         | `FileTranscriberOptions` |                    |                                                                      |
| lang                | `string`                 | `"auto"`           | Language code of the audio language (eg. `en`)                       |
| threads             | `number`                 |  `this.maxThreads` | Number of threads to use. Defaults to max available.                 |
| translate           | `boolean`                | `false`            | Translate result to english.                                         |
| max_len             | `number`                 | `0`                | Max number of characters in a single segment, `0` means no limit.    |
| split_on_word       | `boolean`                | `false`            | If `true`, transcriber will try to split the text on word boundarie. |
| suppress_non_speech | `boolean`                | `false`            | If `true`, transcriber will try to suppress non-speech segments.     |
| token_timestamps    | `boolean`                | `true`             | If `true`, token level timestamps will be calculated.                |

### Returns

A promise that resolve to a transcribe result `Promise<TranscripeResult>` JSON containing all transcribe data like, text, timestamps, ect. .

## cancel()

Cancels the current transcription. May take some time.

### Syntax

```js
await transcriber.cancel();
```

### Returns

Returns a Promise that resolve to void `Promise<void>`.

## destroy()

Destroys shout instance and frees wasm memory.

### Syntax

```js
transcriber.destroy();
```
