---
title: "Other Integrations"
---

# Other Integrations

Other frameworks/libraries will be added infrequent.

_Pull requests for examples and/or integration instructions are very welcome_.

The key points are always:

- exclude `@transcribe/shout` from bundling/code-splitting
- make sure `@transcribe/shout` file (`shout.wasm.js `) is accessable by your webserver, eg. copy to your public folder
- set correct [Cross-Origin headers](/docs/prerequisite) for `shout.wasm.js`
