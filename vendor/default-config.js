/**
 * 默认配置
 */
exports = module.exports = {
  config: {
    name: '<your-project-name>',
    title: '<your-project-name>',
    description: '<your-project-name> - <your-project-description>',
    version: '0.0.1',
    db_url: '127.0.0.1:27017/<your-project-name>',
    cookie_secret: 'cookie-<your-project-name>-2012',
    session_secret: 'session-<your-project-name>-2012',
    auth_cookie_name: 'auth-<your-project-name>-2012',
    port: 9000,
    watch_interval: 1000 * 60 * 5
  }
}