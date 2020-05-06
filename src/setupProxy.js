const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  const target =
    process.env.ENVIRONMENT === 'dev'
      ? 'https://uke4egycm4.execute-api.us-east-1.amazonaws.com/dev'
      : 'http://localhost:4000';

  console.log(`Creating proxy to ${target}`);
  app.use(
    '/graphql',
    createProxyMiddleware({
      target,
      changeOrigin: true,
    })
  );
};
