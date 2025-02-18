# Installation

[Svelte](/docs/svelte)  
[SvelteKit](/docs/svelte-kit)  
[Vue](/docs/vue)  
[Angular](/docs/angular)  
[Other](/docs/integration-other)

## NPM (without bundler)

Install shout wasm and transcriber packages

```bash
npm install --save @transcribe/transcriber
```

The `shout.wasm` files must be accessable and served by your webserver. Depending on your project setup you may need to copy them from `node_modules` to your public directory.

```bash
# copy shout wasm
cp node_modules/@transcribe/shout/src/shout/shout.wasm.worker.mjs /your/project
cp node_modules/@transcribe/shout/src/shout/shout.wasm.js /your/project

# only needed if you want to use StreamTranscriber
cp -r node_modules/@transcribe/transcriber/src/audio-worklets /your/project
```

## Manual Installation

You can use Transcribe.js without a bundler or package manager. Download the files from the [repository](https://github.com/TranscribeJs/transcribe.js), copy the `src/*` directorie to your webserver and include the following into your HTML. Make sure to set the correct paths in the import map.

```html
<!-- set paths to js files -->
<script type="importmap">
  {
    "imports": {
      "@transcribe/shout": "/src/shout/shout.wasm.js",
      "@transcribe/transcriber": "/src/index.js"
    }
  }
</script>

<!-- use type="module" for es6 imports -->
<script type="module">
  import createModule from "@transcribe/shout";
  import { FileTranscriber } from "@transcribe/transcriber";

  const transcriber = new FileTranscriber({
    createModule,
    model: "/path/to/ggml-tiny-q5_1.bin",
  });
</script>
```
