<template>
  <div class="uploadimg">
    <el-upload
      action
      :file-list="filelist"
      multiple
      :on-change="upload"
      list-type="picture-card"
      :on-preview="seephoto"
      :on-remove="delephoto"
      :auto-upload="false"
      :limit="4"
      accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  components: {}
})
export default class storeadmin extends Vue {
  public dialogImageUrl: string = "";
  public dialogVisible: boolean = false;
  public filelist: string[] = [];
  //删除图片
  public delephoto(file: any, fileList: any) {
    this.filelist = fileList;
  }
  //查看图片
  public seephoto(file: any) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
  }
  public upload(file: any, filelist: any) {
    this.filelist = filelist;
  }
  public add() {
    let fd = new FormData();
    for (let file of this.filelist) {
      fd.append("file", file);
    }
    var options = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    this.axios.post("", fd, options).then((res: any) => {
      console.log(res);
    });
  }
}
</script>
<style lang="scss" scoped>
</style>