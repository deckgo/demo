const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const {DeckDeckGoInfoPlugin, DeckDeckGoRemoveNotesPlugin} = require('deckdeckgo-webpack-plugins');

const {GenerateSW} = require('workbox-webpack-plugin');

const webpack = require('webpack');

const path = require('path');

const config = {
    entry: './src/index.js',
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
};

const plugins = [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
        hash: true,
        inject: true,
        template: './src/index.html',
        path: path.join(__dirname, '../dist/'),
        filename: 'index.html'
    }),
    new CopyWebpackPlugin([
        {from: 'src/assets/', to: 'assets'},
        {from: 'src/manifest.json', to: ''},
        {from: 'src/robots.txt', to: ''},
        {from: 'node_modules/ionicons/dist/ionicons/svg/', to: 'svg'}
    ]),
    new ProgressBarPlugin()
];

module.exports = (env, argv) => {

    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }

    if (argv.mode === 'production') {
        plugins.push(new GenerateSW());
        plugins.push(new DeckDeckGoInfoPlugin());

        if (!argv.notes) {
            plugins.push(new DeckDeckGoRemoveNotesPlugin());
        }
    }

    plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                SIGNALING_SERVER: JSON.stringify('https://api.deckdeckgo.com')
            }
        })
    );

    config.plugins = plugins;

    return config;
};
