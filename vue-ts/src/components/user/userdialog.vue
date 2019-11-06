<template>
  <div class="userdialogs">
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="手机号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="changefromdata">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Watch, Prop, Emit } from "vue-property-decorator";
interface formData{

}
@Component({
  components: {}
})
export default class storeadmin extends Vue {
  @Prop(Boolean) dialogFormVisible!: boolean;

  //点击确认
  public changefromdata() {}
  //点击取消
  cancel() {
    this.$emit("close", false);
  }

}
</script>
<style lang="scss">
</style>