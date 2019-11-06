<template>
  <div class="home">
    <el-tabs tab-position="left" :style="'height:'+innerHeight+'px;'">
      <el-tab-pane label="首页">
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="medium">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-tab-pane>
      <el-tab-pane label="用户管理"><div class="tittle">用户管理</div><userlist></userlist></el-tab-pane>
      <el-tab-pane label="商品管理"><div class="tittle">商品管理</div><goods></goods></el-tab-pane>
      <el-tab-pane label="动态管理"><div class="tittle">动态管理</div><dongtailist></dongtailist></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import goods from "@/components/goods/goods.vue";
import userlist from "@/components/user/userlist.vue";
import dongtailist from "@/components/dongtai/dongtailist.vue";

@Component({
  components: {
    goods,
    userlist,
    dongtailist
  }
})
export default class Home extends Vue {
  //获取浏览器高度
  get innerHeight() {
    return window.innerHeight;
  }
}
</script>
<style lang="scss">
.el-menu {
  width: 350px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.tittle{
  height: 30px;
  width: 100%;
  color: #999;
  font-size: 24px;
  line-height: 30px;
  background: rgb(191, 223, 245);
  text-align: center
}
</style>