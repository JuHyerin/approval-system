var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',

    entry: './src/index.tsx',


    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],     /* ts|tsx 파일 import 가능 */
        alias: {
            "@": path.resolve(__dirname, 'src'),
            "@components": path.resolve(__dirname, 'src/components'),
            "@img": path.resolve(__dirname, 'public/img')
        }
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),      /* 빌드 결과 저장 위치 (로컬 지준 절대경로) */
        publicPath: '/',     /* 번들 파일 업로드 위치 (배포된 서버 기준 상대경로) */
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',      /* 프로젝트 내 파일로 index.html 설정 */
            // title: 'React Typescript Base',      /* config 파일에서 index.html 설정 */
        }),
    ],

    /* https://webpack.kr/configuration/dev-server/ */
    devServer: {
        port: 9000,
        open: true,
        historyApiFallback: {
            rewrites: [{ from: /.*/g, to: '/index.html' }],
        },
    },

    /*
    * Webpack 은 오직 Javascript 와 Json 만 이해
    * ts나 css는 loader를 사용하여 처리 가능한 모듈로 변환*/
    module: {
        rules: [
            { test: /\.(ts|tsx)$/, use: 'ts-loader' },
        ]
    }
}
