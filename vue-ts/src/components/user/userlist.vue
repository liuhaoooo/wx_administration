<template>
  <div class="storeadmin">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      height="500"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="openid" label="openid" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <!-- <el-table-column prop="password" label="密码" show-overflow-tooltip></el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改窗 -->
    <userdialog :dialogFormVisible="dialogFormVisible" @close="close"></userdialog>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { fn } from "@/utils/fn";
import interfaces from "@/utils/interfaces.ts";
import userdialog from "@/components/user/userdialog.vue";
//定义数据接口
interface tableData {
  openid: string;
  phone: number | null;
}
@Component({
  components: {
    userdialog
  }
})
export default class Home extends Vue {
  public tableData: tableData[] = [];
  public dialogFormVisible: boolean = false;

  public created(): void {
    this.getuser();
  }
  public close(val: boolean) {
    this.dialogFormVisible = val;
  }

  public getuser() {
    //请求数据
    this.axios.get("/api/getuser").then((res: any) => {
      this.tableData = res.data;
    });
  }
  public handleEdit(row: tableData) {
    this.dialogFormVisible = true;
  }
  public handleDelete(row: tableData) {
    fn.openmodal<tableData>(row, "");
  }
}
</script>
