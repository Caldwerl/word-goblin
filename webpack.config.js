const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const SitemapPlugin = require("sitemap-webpack-plugin").default;
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
// const RemoveServiceWorkerPlugin = require("webpack-remove-serviceworker-plugin");
const webpack = require("webpack");

// const paths = [
//     {
//         path: "/info",
//         lastMod: "2019-03-01",
//         priority: "1.0",
//     },
// ];

const PUBLIC_PATH = "/";

const config = {
    mode: "development",
    entry: {
        main: path.resolve(__dirname, "src/index.jsx"),
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].[contenthash].bundle.js",
        publicPath: PUBLIC_PATH,
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    failOnWarning: false,
                    failOnError: true,
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.(webm|mp4)$/,
                exclude: /node_modules/,
                loader: "file-loader?name=images/[name].[ext]",
            },
            { test: /\.svg$/, loader: "file-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]" },
            { test: /\.woff$/, loader: "file-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]" },
            { test: /\.woff2$/, loader: "file-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]" },
            { test: /\.[ot]tf$/, loader: "file-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]" },
            { test: /\.eot$/, loader: "file-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]" },
            { test: /\.ico$/, loader: "file-loader?name=[name].[ext]" },
            { test: /\.(png|jpg|gif)$/, loader: "file-loader?name=images/[name].[ext]" },
            { test: /app-store-badge\.svg$/, loader: "file-loader?name=images/[name].[ext]" },
            { test: /\.(scss|css)$/, loader: ["style-loader", "css-loader", "sass-loader"] },
        ],
    },
    devServer: {
        historyApiFallback: true,
        publicPath: PUBLIC_PATH,
        port: 8080,
    },
    optimization: {
        minimize: false,
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 0,
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            inject: true,
        }),
        // new SitemapPlugin("https://www.word-goblin.com", paths),
    ],
};

module.exports = (env, argv) => {
    if (argv.mode === "production") {
        config.mode = argv.mode;
        config.optimization.minimize = true;

        config.plugins.push(
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify("production"),
            }),
            // new RemoveServiceWorkerPlugin({ filename: "service-worker.js" }),
            // new SWPrecacheWebpackPlugin({
            //     // By default, a cache-busting query parameter is appended to requests
            //     // used to populate the caches, to ensure the responses are fresh.
            //     // If a URL is already hashed by Webpack, then there is no concern
            //     // about it being stale, and the cache-busting can be skipped.
            //     dontCacheBustUrlsMatching: /\.\w{8}\./,
            //     filename: "service-worker.js",
            //     logger(message) {
            //         if (message.indexOf("Total precache size is") === 0) {
            //             // This message occurs for every build and is a bit too noisy.
            //             return;
            //         }
            //         if (message.indexOf("Skipping static resource") === 0) {
            //             // This message obscures real errors so we ignore it.
            //             // https://github.com/facebookincubator/create-react-app/issues/2612
            //             return;
            //         }
            //         console.log(message);
            //     },
            //     minify: true,
            //     // For unknown URLs, fallback to the index page
            //     navigateFallback: PUBLIC_PATH,
            //     // Ignores URLs starting from /__ (useful for Firebase):
            //     // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
            //     navigateFallbackWhitelist: [/^(?!\/__).*/],
            //     // Don't precache sourcemaps (they're large) and build asset manifest:
            //     staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
            // }),
            // new BundleAnalyzerPlugin(),
        );
    }

    return config;
};
