const css = {
	test: /\.css$/, // test - проверка на расширение.
	use: [
		{
			loader: MiniCssExtractPlugin.loader
		},
		"css-loader"
	]
};
const js = {
	test: /\.js$/,
	exclude: /node_modules/,
	loader: "babel-loader"
};

export const modules = {
	rules: [css, js]
};