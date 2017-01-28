const babel = require('rollup-plugin-babel')

module.exports = function (config) {
  config.set({
    autoWatch: true,
    browsers: ['PhantomJS'],
    frameworks: [
      'mocha',
      'chai'
    ],
    files: [
      'test/fixtures/fixture.html',
      'test/spec.js'
    ],
    preprocessors: {
      'test/fixtures/fixture.html': ['html2js'],
      'test/spec.js': ['rollup']
    },
    reporters: ['mocha'],
    rollupPreprocessor: {
      plugins: [
        babel()
      ],
      sourceMap: 'inline'
    }
  })
}
