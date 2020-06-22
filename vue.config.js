module.exports = {
    devServer: {
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            //'Access-Control-Allow-Headers': 'Origin, Content-Type, Authorization ,ADMINID, TOKEN ,TIMESTAMP',
        },
        proxy: {
            '/users': {
                target: 'http://localhost:8000',
                //target: 'http://172.19.83.92:8000',
                changeOrigin: true,
            }
        }
    }
};