const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const mode = process.env.NODE_ENV

module.exports = () => {
    const config = {
        entry: {
            index: "./src/index.jsx",
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].[contenthash].js",
        },
        target: "web",
        devServer: {
            compress: true,
            hot: true,
            port: 3333,
            historyApiFallback: true,
            open: true,
        },
        resolve: {
            extensions: [".js", ".jsx"],
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
                    type: "asset/resource",
                },
                {
                    test: /\.(js|jsx)$/i,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                        }
                    }
                },
                {
                    test: /\.(css)$/,
                    use: [
                        require.resolve("style-loader"),
                        {
                            loader: require.resolve("css-loader"),
                        }
                    ],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./index.html",
            }),
            new CleanWebpackPlugin(),
        ],
    }
    if (mode === "development") {
        config.mode = "development"
        config.devtool = "source-map"
    } else {
        config.mode = "production"
        config.optimization = {
            minimize: true,
            concatenateModules: true,
            moduleIds: "deterministic",
            usedExports: true,
            splitChunks: {
                minChunks: 2,
                chunks: "all",
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                    },
                },
            },
            runtimeChunk: {
                name: "runtime",
            },
        }
    }
    return config
}