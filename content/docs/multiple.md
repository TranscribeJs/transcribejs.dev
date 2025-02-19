---
title: "Multiple Instances and Multi Threading"
---

# Multiple Instances and Multi Threading

The `FileTranscriber.init()` function can only spawn one wasm instance. If you want to process multiple files in parallel you can create another instance `const t2 = new FileTranscriber(...);`.

> Be aware that the web assembly version of whisper.cpp is way slower than on a dedicated machine (with gpu support). So parallel processing is propably not a good idead.

You should pay attention to the total number of threads being used. For example, if your machine can run 4 threads (`navigator.hardwareConcurrency`) and you create 2 instances to run 2 files in parallel, each transcribe should only use 2 thread for processing.

```js
// make sure to cache the model file somehow (service worker would be an option)
const model = await fetch("/path/to/model.bin");
const t1 = new FileTranscriber({createModule, model});
const t2 = new FileTranscriber({createModule, model});

async function transcribe1() {
  await t1.init();
  const result = await t1.transcribe("myaudio.mp3", { threads: 2 }),
  console.log(result);
}

async function transcribe2() {
  await t2.init();
  const result = await t2.transcribe("myaudio1.mp3", { threads: 2 }),
  console.log(result);
}

transcribe1();
transcribe2();
```
