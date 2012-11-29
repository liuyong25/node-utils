/**
 * 提供常用辅助类库
 * @author TZ <atian25@qq.com>
 */
"use strict";

var utils = require(getPath('utils'));
var _ = require('underscore')._;
var logger = getLogger({type:'console'});

/**
 * 获取常用的辅助模块
 * @param  {String} name 模块名称,现支持:
 * - utils: 辅助方法
 * - _    : underscore辅助方法
 * - wind : 异步
 * - config: 配置项,会自动生成默认文件
 * - moment: 日期类库,http://momentjs.com/docs/
 * - less
 * - mongoskin: mongodb数据库驱动
 * - winston/logger: 日志类 https://github.com/flatiron/winston
 * - jquery
 *
 * @param  {Object} options 参数
 * @return {Object}      需要的类库引用
 */
function getModule(name,options){
  options = options || {};

  switch(name){
    case 'utils':
      return require(getPath('utils'));

    case '_':
      return require('underscore')._;

    case 'wind':
      var Wind = require("wind");
      Wind.logger.level = Wind.Logging.Level.INFO;
      return Wind;

    case 'winston':
    case 'logger':
      return require('winston');

    case 'config':
      var fs = require('fs');
      var CONFIG_PATH = './config/default.js';
      if(!fs.existsSync(CONFIG_PATH)){
        logger.warn('复制默认配置文件到:',CONFIG_PATH)
        fs.mkdirSync('config');
        fs.createReadStream(getPath('default-config.js')).pipe(fs.createWriteStream(CONFIG_PATH));
      }
      return require('config'); 

    default:
      return require(name);
  }
}
exports.getModule = getModule;

/**
 * 获取logger对象, 参考日志类 https://github.com/flatiron/winston
 */
function getLogger(options){
  //默认参数
  options = _.defaults(options||{},{
    type: 'common'
  });
  
  var winston = require('winston');
  
  //日志Adapter
  var consoleAdapter = new winston.transports.Console(options.consoleOptions || {
    colorize: true,
    timestamp: function(){
      return utils.formatDate(new Date(),'hh:mm:ss');
    }
  });

  var fileAdapter = new winston.transports.File(options.fileOptions || {
    filename: options.filename || 'output.log',
    colorize: false,
    maxsize: 1024 * 1024 * 10,
    maxFiles: 1,
    json: false,
    timestamp: function(){
      return utils.formatDate();
    }
  });
  
  //返回
  var transports = [];
  switch(options.type){
    //默认是Console + File
    case 'common':
      transports = [consoleAdapter,fileAdapter];
      break;

    case 'console':
      transports = [consoleAdapter];
      break;

    case 'file':
      transports = [fileAdapter];
      break;
  }
  return new winston.Logger({transports: transports});
}
exports.getLogger = getLogger;

/**
 * 获取配置文件
 */
function getConfig(key){
  return getModule('config')[key||'config'];
}
exports.getConfig = getConfig;

/**
 * 获取基于./vendor/的路径
 */
function getPath(filePath){
  return require('path').join(__dirname, 'vendor', filePath);
}
exports.getPath = getPath;