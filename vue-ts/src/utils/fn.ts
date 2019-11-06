import { MessageBox,Message } from 'element-ui';
export class fn{
    public static openmodal<T>(row:T,fn:any){
        MessageBox.confirm('是否永久删除该条数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            Message({
              type: 'success',
              message: `删除成功!`
            });
          }).catch(() => {
            Message({
              type: 'info',
              message: '已取消删除'
            });
          });
    }
}