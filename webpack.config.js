const path  = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    entry:'./src/main.js',
    output:{
        path:path.resolve(__dirname,'dist'), 
        filename:'bundle.js',
        publicPath:""
    },
    resolve:{
        extensions:[".js",".json",".jsx",".css",'.vue']
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/(node_modules|bower_components)/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['env'],
                        plugins:['transform-runtime']
                    }
                }
            },
            {test:/\.vue$/,use:'vue-loader'},
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name:'assets/images/[name].[hash:7].[ext]'
                }
            },
        ]
           
    },
    plugins:[
        new HtmlWebpackPlugin({template:'./src/index.html'}),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            {
                from:'./src/assets/',to:'asstes/'
            }
        ])
    ],
    devServer:{
        port:9000,
        compress:true,
        contentBase:path.join(__dirname,'dist'),
        hot:true,
        inline:true
    }
}

module.exports = config;