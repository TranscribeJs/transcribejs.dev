---
title: "React"
---

# React (Next.js)

[Full Working Example](https://github.com/TranscribeJs/examples/tree/main/react)

## Install

Install the package

```bash
npm install @transcribe/transcriber
```

and copy the files from `@transcribe/shout` to `/public`

### Cross-Origin Headers

The wasm files must be served with the correct Cross-Origin headers. Otherwise browsers will refuse to load the files.

For the development server the headers are added in `next.config.ts`.

```js
// next.config.ts
export default {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
    ];
  },
};
```

## Usage

Now you can use Transcribe.js in your Next.js components

```js
import React, { useRef, useEffect, useState } from "react";
import { FileTranscriber } from "@transcribe/transcriber";
import type { default as CreateModule } from "@transcribe/shout";

const Transcribe = () => {
  const [text, setText] = useState("");
  const [isReady, setIsReady] = useState(false);
  const transcriber = (useRef < FileTranscriber) | (null > null);

  useEffect(() => {
    // Initialize the transcriber when the component mounts
    async function initializeTranscriber() {
      // dynamically import the createModule function
      // because bundler does not support loading .wasm files
      const createModule: typeof CreateModule = // @ts-ignore
        (await import(/* webpackIgnore: true */ "/shout.wasm.js")).default;

      transcriber.current = new FileTranscriber({
        createModule,
        model: "/ggml-tiny-q5_1.bin",
      });

      await transcriber.current.init();

      setIsReady(true);
    }

    initializeTranscriber();
  }, []);

  async function handleTranscribe() {
    if (!transcriber.current) return;

    try {
      const result = await transcriber.current.transcribe("/jfk.wav", {
        lang: "en",
      });
      setText(result.transcription.map((t: any) => t.text).join(" "));
      console.log(result);
    } catch (error) {
      setText("Transcription failed.");
      console.error(error);
    }
  }

  return <div>...</div>;
};

export default Transcribe;
```
