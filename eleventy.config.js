const eleventyPluginFilesMinifier = require("@sherby/eleventy-plugin-files-minifier");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const { execSync } = require("child_process");
const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = function (eleventyConfig) {
  // plugins
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(eleventyPluginFilesMinifier);

  eleventyConfig.addWatchTarget("./css/");

  // copy CNAME file
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy(".nojekyll");

  // copy static files
  eleventyConfig.addPassthroughCopy("assets");

  // replace __VERSION__ with current version
  const version = execSync("npm view @transcribe/transcriber version");
  eleventyConfig.addTransform("replace-version", (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      return content.replace(/__VERSION__/g, version);
    }

    return content;
  });

  // load md from github
  eleventyConfig.addAsyncShortcode("remote_include", async function (urlPath) {
    const url = new URL(urlPath).href;
    const data = await EleventyFetch(url, {
      duration: "5m",
      type: "text",
    });

    return data;
  });

  eleventyConfig.on("afterBuild", () => {
    const CleanCSS = require("clean-css");
    const fs = require("fs");

    // Run me after the build ends
    var input = fs.readFileSync("docs/styles.css", "utf8");
    var output = new CleanCSS().minify(input);
    fs.writeFile("docs/styles.css", output.styles, function (err) {
      if (err) return console.log("Error minifying main.css" + err);
      //success
    });
  });

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      output: "docs",
      layouts: "../_layouts",
    },
  };
};
