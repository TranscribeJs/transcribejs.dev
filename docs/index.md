# Transcribe.js

Transcribe speech to text in the browser.

## What it is

Transcribe.js is a JavaScript library that provides a high level api/interface for the wasm build of [whisper.cpp](https://github.com/ggerganov/whisper.cpp).

## Features

- transcribe audio/video files (formats supported by the browser)
- load media and model file from URL or use File object (eg. from file input)
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

## Support (ideas, code, coffee)

Please support this project if you can. Code, coffee or any other support, everything is very welcome and appreciated.

<div style="display:flex; align-items:center; column-gap: 3rem; flex-wrap: wrap;">

<a href="https://www.buymeacoffee.com/thurti" target="_blank"><img src="_media/bmac.png" alt="Buy Me A Coffee" style="max-height: 2.25rem" /></a>

<a href="https://ko-fi.com/thurti" target="_blank"><img src="_media/kofi.webp" alt="Support on Ko-Fi" style="max-height: 2.5rem" /></a>

<a href="https://github.com/sponsors/thurti">Sponsor on Github</a>

</div>

If this or any other open source software has saved you and/or your team time in development, tell your boss and ask them to donate to open source projects. Thank you, you are awesome!
