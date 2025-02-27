const htmlmin = require('html-minifier-terser');

module.exports = function (eleventyConfig) {
  // 画像やCSSなどの静的ファイルを[output]配下の指定ディレクトリへコピー
  eleventyConfig.addPassthroughCopy({ public: '/' });
  // 監視ターゲットを追加
  eleventyConfig.addWatchTarget('**/*.(css|scss)');

  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: true,
    autoescape: false // warning: don’t do this!
  });
  // スタイル変更後のホットリロードを有効にする
  eleventyConfig.setBrowserSyncConfig({
    files: 'dist/assets/**/*.css'
  });

  eleventyConfig.addTransform('htmlmin', function (content) {
    if ((this.page.outputPath || '').endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        // useShortDoctype: true,
        removeComments: false,
        collapseWhitespace: true,
        preserveLineBreaks: true
      });

      return minified;
    }

    // If not an HTML output, return content as-is
    return content;
  });

  return {
    dir: {
      input: 'src/pages',
      output: 'dist'
    },
    templateFormats: ['html', 'njk'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  };
};
