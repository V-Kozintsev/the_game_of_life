const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // Вы можете изменить на 'development' при необходимости
  entry: {
    main: path.resolve(__dirname, "./src/index.ts"), // Измените на .ts, если используете TypeScript
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].main.ts", // Имя выходного файла
    clean: true, // Очищает output папку перед новой сборкой
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "./css/style.css", // Имя выходного файла для CSS
      chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // Извлечение CSS
          "css-loader", // Обработка CSS
        ],
      },
      {
        test: /\.(js|mjs|cjs|ts)$/, // Поддержка JS и TS
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i, // Поддержка изображений и шрифтов
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]", // Путь, куда будут сохраняться изображения
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".css", ".tsx"], // Автоматическое добавление расширений
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true, // Включает сжатие
    port: 9000, // Порт для dev server
  },
};
