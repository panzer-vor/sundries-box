<template>
  <main>
    <el-table
      v-if="tableData.length"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="用户ID"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户权限"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.role==1?'博主':'管理员' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户名"
        width="180">
        <template slot-scope="scope">
          <el-popover placement="top">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.id==loginBean.id"
            size="mini"
            @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button
            v-show="!scope.row.role&&loginBean.role"
            v-else=""
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id,scope.row.role)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin: 30px"
      background
      layout="prev, pager, next"
      @current-change="pagesChange"
      page-size='8'
      :total="total">
    </el-pagination>
  </main>

</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
export default {
  data(){
    return{
      tableData:[],
      loading:true,
      page:0,
      total:0
    }
  },
  computed:{
    ...mapGetters({
      loginBean:'loginBean',
    })
  },
  created(){
    this.getAdmin()
  },
  methods:{
    pagesChange(val){
      this.page = --val
      this.getAdmin()
    },
    getAdmin(){
      let ajaxData={
        page:this.page,
        id:this.loginBean.id
      }
      httpPost('/user/allAdmin',ajaxData,(res)=>{
        if(res.Code===1){
          this.total = res.BackData.count
          this.tableData = res.BackData.rows,
          this.tableData.unshift(this.loginBean)
        }
      })
    },
    handleEdit(id) {
      this.$router.push('/edit')
    },
    handleDelete(id,role) {
      const ajaxData={
        id:id,
        role:role
      }
      httpPost('/user/delete',ajaxData,res=>{
        console.log(res)
        if(res.Code===1){
          this.$alert('删除成功', '删除', {
            confirmButtonText: '确定',
            callback: action => {
              this.getAdmin()
            }
          });
        }else if(res.Code===-2){
          this.$alert(res.BackData, '删除', {
            confirmButtonText: '确定',
            callback: action => {
              this.getAdmin()
            }
          });
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  main{
    width: 100%;
  }
</style>
