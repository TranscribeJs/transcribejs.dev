---
title: "Angular"
---

# Angular

[Full Working Example](https://github.com/TranscribeJs/examples/tree/main/angular)

## Install

Install the package

```bash
npm install @transcribe/transcriber
```

and copy the files from `@transcribe/shout` to `/public`

```bash
cp -r node_modules/@transcribe/shout/src/shout/* public/
```

### Cross-Origin Headers

The wasm files must be served with the correct Cross-Origin headers. Otherwise browsers will refuse to load the files.

For the development server the headers are added in `angular.json`.

```js
// angular.json
{
  // ...
  serve: {
    // ...
    options: {
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
      },
    },
  },
  // ...
}
```

### Bundle Size Limit

You propably need to increase the `budgets.maximumError` for the maximum bundle size. Search for `budget` in `angular.json`.

```js
// angular.json
"budgets": [
  {
    "type": "initial",
    "maximumWarning": "500kB",
    "maximumError": "5MB"
  },
  {
    "type": "anyComponentStyle",
    "maximumWarning": "4kB",
    "maximumError": "5MB"
  }
],
```

## Usage

Now you can use Transcribe.js in your Angular components

```js
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import createModule from "@transcribe/shout";
import { FileTranscriber } from "@transcribe/transcriber";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  result = "";
  transcriber: FileTranscriber;

  constructor() {
    this.transcriber = new FileTranscriber({
      createModule,
      model: "/ggml-tiny-q5_1.bin", // public path to model file
      workerPath: "/", // public path to wasm worker files copied before
    });

    this.initTranscribe();
  }

  async transcribe() {
    // check if transcriber is initialized
    if (!this.transcriber.isReady) return;

    // there must be at least one user interaction (eg. click) before you can call this function
    const result = await this.transcriber.transcribe("/jfk.wav", {
      lang: "en",
    });

    // do something with the result json
    this.result = result.transcription.map((t) => t.text).join(" ");
  }
}
```
