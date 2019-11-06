/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1570776426043_2393';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  //MySQL数据库
  config.mysql = {
    // client: {
    //   host: 'localhost',
    //   port: '3306',
    //   user: 'root',
    //   password: '123456',
    //   database: 'wechat',
    // },
    client: {
      host: '101.37.25.179',
      port: '3306',
      user: 'wechat',
      password: '321123aaa',
      database: 'wechat',
    },
    app: true,
    agent: false,
  };

  //关闭csrf
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: [
      ""
    ]
  };
  //跨域
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  //修改端口号
  config.cluster = {
    listen: {
      path: '',
      port: 8848,
      hostname: '127.0.0.1',
    }
  };
  return {
    ...config,
    ...userConfig,
  };
};
