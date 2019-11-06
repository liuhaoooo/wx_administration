'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async getuser(table) {
    const {app} = this;
    let data = await app.mysql.select(table)
    return data;
  }
}

module.exports = UserService;
