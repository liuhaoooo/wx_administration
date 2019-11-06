'use strict';

const Controller = require('egg').Controller,
  fs = require('fs'),
  path = require('path'),
  awaitWriteStream = require('await-stream-ready').write,
  sendToWormhole = require('stream-wormhole');

class StoreController extends Controller {
  async changestore() {//修改商品信息
    const { ctx } = this;
    const { id, text, price, fenlei, details } = ctx.request.body;
    let data = { id, text, price, fenlei, details }
    let isok = await this.service.store.changestore(data)
    ctx.status = 200;
    if (isok) {
      ctx.body = { msg: '修改成功', success: true }
    } else {
      ctx.body = { msg: '修改失败', success: false }
    }
  }
  async getsort() {//获取分类
    const { ctx } = this;
    ctx.status = 200;
    ctx.body = await this.service.store.getsort();
  }

  async changeimg() {//修改商品封面
    const { ctx } = this;
    let stream = await ctx.getFileStream();//获取流
    let name = Math.random() * 10
    let target = path.join(this.config.baseDir, `app/public/img/${name + stream.filename}`);//创建路径
    //let target = path.join(`/home/public/storeimages/${name + stream.filename}`);//创建路径
    const file = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(file));
    } catch (err) {
      await sendToWormhole(stream);//出错关闭管道
      throw err
    }
    let isok = false;
    if (stream.fields.id) {//判断是修改还是增加，true为修改
      let img = stream.fields.img.split('/').pop()//拿到原来图片的名字
      let url = `app/public/img/${img}`
      //let url = `/home/public/storeimages/${img}`
      let data = { id: stream.fields.id, url: `http://127.0.0.1:8848/public/img/${name + stream.filename}` }//存入数据库的值
      //let data = { id: stream.fields.id,url: `http://101.37.25.179/storeimages/${name + stream.filename}` }//存入数据库的值
      isok = await this.service.store.changestore(data)//把文件目录存入数据库
      fs.readdir('app/public/img', function (error, data) {//查询img文件夹的目录//'/home/public/storeimages'
        if (error) {
          throw error
        }
        if ((data.indexOf(img)) == -1) { return }//判断文件夹中是否存在原来的文件
        else {
          fs.unlink(url, function (error) {//在文件夹中删除原来的封面
            if (error)
              throw error;
          })
        };
      })
      let imgurl = await this.service.store.getstoreinfo(stream.fields.id, "url")
      ctx.status = 200;
      if (isok) {
        ctx.body = {
          msg: '修改成功',
          success: true,
          imgurl
        }
      } else {
        ctx.body = {
          msg: '修改失败',
          success: false,
          imgurl
        }
      }
    } else {//添加
      const {text,fenlei,details,price} = stream.fields 
      let data = {text,fenlei,details,price,url: `http://127.0.0.1:8848/public/img/${name + stream.filename}`}
      isok = await this.service.store.addstore(data)//把数据存入数据库
      ctx.status = 200;
      if (isok) {
        ctx.body = {
          msg: '添加成功',
          success: true
        }
      } else {
        ctx.body = {
          msg: '添加失败',
          success: false
        }
      }
    }
    
  }
}

module.exports = StoreController;
