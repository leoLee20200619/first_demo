module.exports = {
    devServer: {
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        proxy: {
            '/users': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            }
        }
    }
};