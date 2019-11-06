'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async getuser() {
    const {ctx} = this;
    ctx.status = 200;
    ctx.body = await this.service.user.getuser("user")
  }
  async getstore() {
    const {ctx} = this;
    ctx.status = 200;
    ctx.body = await this.service.user.getuser("store")
  }
  async getdongtai() {
    const {ctx} = this;
    ctx.status = 200;
    ctx.body = await this.service.user.getuser("dongtai")
  }
}

module.exports = UserController;
