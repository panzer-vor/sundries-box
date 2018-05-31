<template>
  <main>
    <ol>
      <li>文章详情</li>
      <li>文章标题</li>
      <li>文章简介</li>
      <li>编辑/删除</li>
    </ol>
    <ul v-for="(i,index) in blogList" :key='index'>
      <li class="info date sort id">
        <span><b>编号:</b> {{i.id}}</span>
        <span><b>时间:</b> {{timeFormat(i.time)||i.time}}</span>
        <span><b>分类:</b> {{i.sort}}</span>
      </li>
      <li class="title avatar">
        <h3>{{i.title}}</h3>
        <img :src="imgHost+i.avatar" alt="">
      </li>
      <li class="info">{{i.info}}</li>
      <li class="edit delete">
        <button type="button" class="el-button el-button--default el-button--mini" @click="Go(i.id)">
          <span>编辑</span>
        </button>
        <button type="button" class="el-button el-button--danger el-button--mini" @click="Delete(i.id)">
          <span>删除</span>
        </button>
      </li>
    </ul>

    <el-pagination
      style="margin: 30px"
      background
      :page-size='pageSize'
      layout="prev, pager, next"
      @current-change="pagesChange"
      :total="total">
    </el-pagination>

  </main>
</template>
<script>
  import { mapGetters } from 'vuex'
export default {
  computed:{
    ...mapGetters({
      imgHost:'imgHost',
    })
  },
  data(){
    return{
      blogList:[],
      page:0,
      total:0,
      pageSize:4,
    }
  },
  created(){
    this.getBlogs()
  },
  methods:{
    Go(id){
      console.log(id)
      this.$router.push('/BlogEdit/'+id)
    },
    pagesChange(val){
      this.page = --val
      this.getBlogs()
    },
    getBlogs(){
      let ajaxData={
        page:this.page,
      }
      httpPost('/blog/allBlog',ajaxData,(res)=>{
        if(res.Code===1){
          this.total = res.BackData.count
          this.blogList = res.BackData.rows
        }
      })
    },
    timeFormat(val){
      const i = val.indexOf('T')
      return val.substring(0,i)
    },
    Delete(id) {
      const ajaxData={
        id:id,
      }
      this.$confirm('删除该文章？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        httpPost('/blog/delete',ajaxData,res=>{
          if(res.Code===1){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getBlogs()
          }else{
            this.$message({
              type: 'warning',
              message: '删除失败!'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style scoped lang="scss">
  main{
    width: 100%;
    font-size: 14px;
  }
  ol,ul{
    display: grid;
    grid: auto/1fr .8fr 1fr .3fr;
  }
  ol{
    li{
      text-align: center;
      color: #878d99;
      height: 47px;
      line-height: 47px;
      overflow: hidden;
    }
  }
  ul{
    li{
      padding: 10px;
      height: 180px;
      display: flex;
      flex-direction: column;
      color: #5a5e66;
      border: 1px solid #eaeefb;
      &:first-child{
        justify-content: space-around;
      }
      &:nth-child(2){
        text-align: center;
        justify-content: space-between;
        img{
          height: 150px;
        }
      }
      &:nth-child(3){
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &:last-child{
        align-items: center;
        justify-content: center;
        button{
          width: 70%;
          margin: 20px 0 0;
        }
      }
    }
  }


</style>
