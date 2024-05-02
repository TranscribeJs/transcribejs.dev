# Transcribe.js

Transcribe speech to text in the browser.

## What it is

Transcribe.js is a JavaScript library that provides a high level api/interface for the wasm build of [whisper.cpp](https://github.com/ggerganov/whisper.cpp).

## Features

- transcribe audio/video files (formats supported the browser)
- load audio and model file from URL or use File object (eg. from file input)
- output detailed JSON
- optional dtw word level timestamps
- optional translate to english
- experimental media stream support

## Examples

- [File Transcriber](https://examples.transcribejs.dev/examples/index.html)
- [Stream Transcriber (experimental)](https://examples.transcribejs.dev/examples/stream.html) (doesn't work in firefox)

## Packages

All packages are under [@transcribe](https://www.npmjs.com/search?q=%40transcribe) namespace.

| Package                 | Description                                                                                                                                                |
| :---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| @transcribe/shout       | Wasm build based on [whisper.cpp](https://github.com/ggerganov/whisper.cpp). Contains Module file including the wasm binary and a separate webworker file. |
| @transcribe/transcriber | `FileTranscriber` and `StreamTranscriber` for transcribing media files or streams.                                                                         |
