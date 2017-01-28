import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/doorman.js',
  dest: 'umd/doorman.js',
  moduleName: 'Doorman',
  format: 'umd',
  plugins: [
    babel()
  ]
}
