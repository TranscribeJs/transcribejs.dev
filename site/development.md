# Development

Clone the repository, install dependencies, start the dev server and open `http://localhost:9876/examples/index.html` in your browser.

```bash
git clone https://github/transcribejs/transcribe.js
cd transcribe
npm install
npm run dev
```

## Types

The library is not written in typescript. This way no extra build step is needed during development and in production. To still get proper type support type definitions get generated from JSDoc comments.

```bash
npm run generate-types
```

## Wasm build

The `whisper.cpp` repository is a git submodule. To get the latest version of `whisper.cpp` go into the directory and pull the latest changes from github.

```bash
cd shout.wasm/whisper.cpp
git pull origin master
```

The wasm files are build from `shout.wasm/src/whisper.wasm.cpp`. If you want to add new functions from whisper.cpp to the wasm build this is the file to add them.

> I'm pretty sure that this will not compile on every machine/architecture, but I'm no expert in C++. If you know how to optimize the build process please let me know or create a pull request. Maybe this should be dockerized.?

```bash
# run cmake to build wasm
npm run wasm:build

# copy emscripten build files to project
npm run wasm:copy
```

## Tests

Unit/functional tests for the `Transcriber` functions using [vitest](https://vitest.dev/).

```bash
npm run test:unit
```

E2E tests using [Playwright](https://playwright.dev/).

Known issues:

- Firefox needs way longer than in a the "real" browser
- Safari doesn't work because [SharedArrayBuffer is disabled in WebKit](https://github.com/microsoft/playwright/issues/14043)

```bash
npm run test:e2e
```

or use the Playwright UI for details

```bash
npm run test:e2e-ui
```
