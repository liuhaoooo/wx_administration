<template>
  <div class="userdialogs">
    <el-dialog
      :title="'编辑：'+formData.id"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-form>
        <el-form-item label="名称">
          <el-input v-model="formData.text"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="formData.fenlei">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit("close", false)">取 消</el-button>
        <el-button type="primary" @click="change">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Watch, Prop, Emit } from "vue-property-decorator";
interface formData {
  //商品信息类型
  id: number;
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
  @Prop(Boolean) dialogFormVisible!: boolean;
  @Prop() formData!: formData;
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
  public change() {
    if (this.formData) {
      const { text, fenlei, price, details } = this.formData;
      if (!text || !fenlei || !price || !details) {
        this.$message.error("每一项都不能为空");
        return;
      }
      this.axios.post("/api/changestore", this.formData).then(
        (res: any) => {
          if (res.data.success) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.$emit("close", false);
          } else {
            this.$message.error(res.data.msg);
          }
        },
        (err: any) => {
          throw err;
        }
      );
    }
  }

}
</script>
<style lang="scss">
</style>
