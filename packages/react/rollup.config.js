import Path from 'path'
import Ts from 'rollup-plugin-typescript2'

const resolve = path => Path.resolve(__dirname, path)

export default {
    input: [
        resolve('src/index.ts'),
        resolve('src/atoms/Color/index.ts'),
        resolve('src/atoms/Margin/index.ts'),
        resolve('src/organisms/Select/index.ts'),
    ],
    output: {
        dir: 'lib',
        format: 'esm',
        sourcemap: true
    },
    plugins: [Ts()],
    preserveModules: true,
    external: ['react', '@ds.e-2/foundation']
}
