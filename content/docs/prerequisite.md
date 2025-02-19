---
title: "Prerequisites"
---

# Prerequisite

## Webserver

Your webserver must serve the files with cross origin headers.

`"Cross-Origin-Embedder-Policy": "require-corp"`  
`"Cross-Origin-Opener-Policy": "same-origin"`

## Browser

Your browser must support `SharedArrayBuffer`. ([brower support](https://caniuse.com/sharedarraybuffer))

The default wasm files are built with SIMD enabled. If your browser/device doens't [support SIMD](https://caniuse.com/wasm-simd) **use the `no-simd` files** instead. Also check out the [example code](https://github.com/TranscribeJs/transcribe.js/blob/main/examples/index.html) on how to use it.

Also make sure that the file `shout.wasm.worker.mjs` is served with `Content-Type: text/javascript` (not `application/wasm`)

## Model File

You need a ggml model file to run Transcribe.js. You can download them on hugging face [https://huggingface.co/ggerganov/whisper.cpp/tree/main](https://huggingface.co/ggerganov/whisper.cpp/tree/main).

You should start with the (quantized) tiny or base models. Larger models propably won't work due to memory restrictions of wasm or will be just too slow, but you can try it, though.
