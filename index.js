/**
 * 提供常用辅助类库
 * @author TZ <atian25@qq.com>
 */
"use strict";

var logger = require('winston');

exports.utils = require(getPath('utils'));
exports._ = require('underscore')._;

/**
 * 获取基于./vendor/的路径
 */
function getPath(filePath){
  return require('path').join(__dirname, 'vendor', filePath);
}

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
 * @return {Object}      需要的类库引用
 */
exports.get = exports.getModule = function(name){
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

    case 'bootstrap':
      return getPath('bootstrap');    

    case 'jquery':
      return getPath('jquery.min.js');

    default:
      return require(name);
  }
}