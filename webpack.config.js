module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "./bundle.js"
    },
    devServer: {
        inline: true,
        port: 8000,
        contentBase: "./src"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /typings/],
                loader: "babel",
                query: {
                    presets: ["es2015", "react"]
                }
            },
            {
                test: /\.scss$/,
                exclude: [/node_modules/, /typings/],
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/, /typings/],
                loaders: ["style", "css"]
            }
        ]
    }
}