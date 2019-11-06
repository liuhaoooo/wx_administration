<template>
  <div class="dongtailist">
    <el-table :data="tableData" style="width: 100%" height="500" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="60"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="图片">
              <span>{{ props.row.openid }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="openid" prop="openid"></el-table-column>
      <el-table-column label="动态ID" prop="dongtai_id"></el-table-column>
      <el-table-column label="手机号" prop="phone"></el-table-column>
      <el-table-column label="文字" prop="text"></el-table-column>
      <el-table-column label="时间" prop="time"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button  type="danger" @click="deletestore" v-if="ischeck">删除</el-button>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue , Watch} from "vue-property-decorator";
import interfaces from '@/utils/interfaces.ts'
import {fn} from '@/utils/fn'
//定义数据接口
interface tableData {
  dongtai_id: number;
  openid: string;
  phone: number;
  text: string;
  time:number;
}
@Component({
  components: {}
})
export default class storeadmin extends Vue {
  public tableData: tableData[] = [];
  public ischeck:boolean = false;
  public idArr:tableData[] = [];
  public created():void{
    this.getstore()
  }
  public getstore() {//请求数据
    this.axios.get('/api/getdongtai').then((res:any)=>{
      this.tableData = res.data
    })
  }
  //编辑
  public handleEdit(row: tableData): void {
    alert("编辑" + row.dongtai_id);
  }
  //删除
  public handleDelete(row: tableData): void {
    fn.openmodal<tableData>(row,"")
  }
  //多选触发的函数
  public handleSelectionChange(val: tableData[]) {
    this.idArr = val
  }
  public deletestore():void{
      console.log('删除'+this.idArr)
      this.idArr = []
  }
  @Watch('idArr')
  idarrychange(){
    this.ischeck = this.idArr.length>0?true:false
  }
}
</script>
<style lang="scss">