<template>
  <div class="dialogs">
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="名称">
          <el-input v-model="formData.text"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="formData.fenlei" clearable>
            <el-option
              v-for="item in sort"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="formData.price"></el-input>
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="formData.details"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-upload
            action
            :file-list="filelist"
            :on-change="upload"
            list-type="picture-card"
            :on-remove="delephoto"
            :auto-upload="false"
            :limit="1"
            :on-exceed="err"
            accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="changefromdata">确 定</el-button>
      </div>
    </el-dialog>
    <el-button
      class="add"
      type="primary"
      @click="dialogFormVisible = true"
      v-if="!dialogFormVisible"
    >添加</el-button>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import interfaces from "@/utils/interfaces.ts";
//定义数据接口
interface tableData {
  text: string;
  fenlei: string;
  price: number;
  details: string;
}
interface sort {
  value: string;
  label: string;
}

@Component({
  components: {}
})
export default class storeadmin extends Vue {
  public formData: tableData = {} as tableData;
  public dialogFormVisible: boolean = false;
  public filelist: any[] = [];
  public sort: sort[] = [
    { value: "坚果炒货", label: "坚果炒货" },
    { value: "肉干肉脯", label: "肉干肉脯" },
    { value: "饼干膨化", label: "饼干膨化" },
    { value: "豆干素食", label: "豆干素食" },
    { value: "鱿鱼海味", label: "鱿鱼海味" },
    { value: "生鲜水果", label: "生鲜水果" },
    { value: "糕点糖果", label: "糕点糖果" },
    { value: "果干蜜饯", label: "果干蜜饯" }
  ];
  //点击确认
  public changefromdata() {
    const { text, fenlei, price, details } = this.formData;
    if (!text || !fenlei || !price || !details || this.filelist.length == 0) {
      //判断空
      this.$message.error("每一项都不能为空");
      return;
    }
    let fd: any = new FormData();
    fd.append("text", text);
    fd.append("fenlei", fenlei);
    fd.append("details", details);
    fd.append("price", price);
    for (let file of this.filelist) {
      fd.append("file", file.raw);
    }
    const options = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    this.axios.post("/api/changeimg", fd, options).then(
      (res: any) => {
        if (res.data.success) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          this.dialogFormVisible = false;
        } else {
          this.$message.error(res.data.msg);
        }
      },
      (err: any) => {
        throw err;
      }
    );
  }
  //点击取消
  public cancel() {
    this.formData = {} as tableData;
    this.filelist = [];
    this.dialogFormVisible = false;
  }
  //删除图片
  delephoto(file: any, fileList: any[]) {
    this.filelist = fileList;
  }
  upload(file: any, fileList: any[]) {
    this.filelist = fileList;
  }

  //超出图片数量范围执行的函数
  err(files: any, fileList: any) {
    this.$message.error("图片过多");
    return;
  }
}
</script>
<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.add {
  position: relative;
  left: 87%;
  z-index: 999;
}
</style>