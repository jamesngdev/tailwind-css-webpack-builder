const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require("./paths")
const {findHtmlFiles} = require('./utils')
const htmlFiles = findHtmlFiles(paths.src);
const path = require('path');

const htmlWebpackPlugins = htmlFiles?.map(p => new HtmlWebpackPlugin({
    template: path.join(paths.src, p),
    filename: path.join(paths.build, p)
}))

module.exports = {
    // Where webpack looks to start building the bundle
    entry: [paths.src + '/index.js'],

    // Where webpack outputs the assets and bundles
    output: {
        path: paths.build + "/",
        filename: '[name].bundle.js',
        publicPath: '/',
    },

    // Customize the webpack build process
    plugins: [
        // Removes/cleans build folders and unused assets when rebuilding
        new CleanWebpackPlugin(),

        // Copies files from target to destination folder
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.public,
                    to: '',
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),
        ...htmlWebpackPlugins
    ],

    // Determine how modules within the project are treated
    module: {
        rules: [
            // JavaScript: Use Babel to transpile JavaScript files
            {test: /\.js$/, use: ['babel-loader']},

            // Images: Copy image files to build folder
            {test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource'},

            // Fonts and SVGs: Inline files
            {test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline'},
        ],
    },

    resolve: {
        modules: [paths.src, 'node_modules'],
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': paths.src,
            assets: paths.public,
        },
    },
}
