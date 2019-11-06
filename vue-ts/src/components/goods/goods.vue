<template>
  <div class="storeadmin">
    <el-input placeholder="搜索商品名称" prefix-icon="el-icon-search" v-model="searchtext"></el-input>
    <el-table
      :data="tableData"
      style="width: 100%"
      :height="innerHeight"
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="60"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.text }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.fenlei }}</span>
            </el-form-item>
            <el-form-item label="商品详情">
              <span>{{ props.row.details }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="封面">
              <div class="img">
                <el-upload
                  :data="datas"
                  class="avatar-uploader"
                  action="/api/changeimg"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  accept=".jpg, .jpeg, .png, .JPG, .JPEG"
                >
                  <img
                    v-if="props.row.url"
                    :src="props.row.url"
                    @click="clickimg(props.row.id,props.row.url)"
                  />
                </el-upload>
              </div>
            </el-form-item>
            <el-form-item label="商品图片">
              <uploadimg></uploadimg>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品 ID" prop="id"></el-table-column>
      <el-table-column label="商品名称" prop="text"></el-table-column>
      <el-table-column label="分类" prop="fenlei"></el-table-column>
      <el-table-column label="价格(元)" prop="price"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="mini">更多</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改窗 -->
    <goodsdialog :dialogFormVisible="dialogFormVisible" @close="close" :formData="formData"></goodsdialog>
    <!-- 添加框 -->
    <dialogs></dialogs>
    <el-button type="danger" @click="deletestore" v-if="ischeck">删除</el-button>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="100"
      hide-on-single-page
      @current-change="currentPage"
    ></el-pagination>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import interfaces from "@/utils/interfaces.ts";
import dialogs from "@/components/goods/dialogs.vue";
import goodsdialog from "@/components/goods/goodsdialog.vue";
import uploadimg from "@/components/goods/uploadimg.vue";
import { fn } from "@/utils/fn";
//定义数据接口-------------------------------------
interface tableData {
  //商品信息类型
  id: number;
  text: string;
  fenlei: string;
  url: string;
  price: number;
  details: string;
}

interface datas {
  //修改封面需要传的参数类型
  id: number;
  img: string;
}
@Component({
  components: {
    uploadimg,
    dialogs,
    goodsdialog
  }
})
export default class storeadmin extends Vue {
  public tableData: tableData[] = []; //列表数据
  public tableData1: tableData[] = []; //用于搜索
  public formData: tableData = {} as tableData; //修改框的数据
  public dialogFormVisible: boolean = false;
  public ischeck: boolean = false; //是否勾选
  public idArr: tableData[] = []; //已勾选的数据
  public searchtext: string = ""; //搜索框

  public datas: datas = {} as datas; //修改封面需要传的参数
  //方法-----------------------------------------
  public created(): void {
    this.getstore();
  }
  //获取浏览器高度
  get innerHeight(): number {
    return window.innerHeight - 140;
  }
  //dialog点击取消触发的方法
  public close(val: boolean) {
    this.dialogFormVisible = val;
    this.getstore()
  }
  //分页
  public currentPage(index: number) {
    console.log(index);
  }
  //请求数据
  public getstore() {
    this.axios.get("/api/getstore").then((res: any) => {
      this.tableData = res.data;
      this.tableData1 = res.data;
    });
  }
  //搜索
  public finddata() {
    this.tableData = this.tableData1.filter(data => {
      return data.text.indexOf(this.searchtext) != -1;
    });
  }

  // 修改------------------------------------------------
  //点击编辑
  public handleEdit(row: tableData): void {
    this.formData = row;
    this.dialogFormVisible = true;
  }
  //点击封面保存id和原来封面链接
  public clickimg(id: number, img: string) {
    this.datas.id = id;
    this.datas.img = img;
  }
  //修改商品封面
  public handleAvatarSuccess(res: any, file: any) {
    if (res.success) {
      this.getstore();
      this.$message({
        message: res.msg,
        type: "success"
      });
    } else {
      this.$message.error(res.msg);
    }
  }

  //删除----------------------------------------------------
  //删除单个
  public handleDelete(row: tableData): void {
    fn.openmodal<tableData>(row, "");
  }
  //多选触发的函数
  public handleSelectionChange(val: tableData[]) {
    this.idArr = val;
  }
  //删除多选
  public deletestore(): void {
    console.log("删除" + this.idArr);
    this.idArr = [];
  }
  //监听-------------------------
  @Watch("idArr")
  idarrychange() {
    this.ischeck = this.idArr.length > 0 ? true : false;
  }
  @Watch("searchtext")
  searchtextchange() {
    this.finddata();
  }
}
</script>
<style lang="scss">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.img {
  width: 148px;
  height: 148px;
}
.img img {
  width: 100%;
  height: 100%;
}
</style>