'use strict';

const Service = require('egg').Service;

class StoreService extends Service {
  async getstoreinfo(id,data){//获取商品信息
    const results = await this.app.mysql.select('store', { 
      where: { id }, // WHERE 条件
      columns: [data], // 要查询的表字段
    });
    return results
  }
  async changestore(data) {//修改商品信息
      const result = await this.app.mysql.update('store', data);
      return result.affectedRows === 1?true:false;
  }
  async getsort(){//获取分类
    let sql = 'select distinct fenlei from store';
    const data = await this.app.mysql.query(sql);
    return data;
  }
  async addstore(data){//增加商品
    const result = await this.app.mysql.insert('store',data);
    return result.affectedRows === 1?true:false;
  }
}

module.exports = StoreService;
