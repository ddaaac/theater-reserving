const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        proxy({
            target: 'http://ec2-3-14-151-9.us-east-2.compute.amazonaws.com:3000',
            changeOrigin: true,
        })
    );
};