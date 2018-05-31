<template>
  <ul class="content large_view">
    <blog-block v-for="(i,index) in blogList" :key="index" :item="i"></blog-block>
  </ul>
</template>

<script>
import BlogBlock from 'cpm/BlogBlock';
import {httpPost} from '../api/index.js';
export default {
  props:['page','type'],
  data(){
    return{
      total:0,
      blogList:[],
    }
  },
  components:{
    BlogBlock,
  },
  created(){
    this.getBlogs()
  },
  methods:{
    getBlogs(){
      let ajaxData={
        page:this.page,
        type:this.type,
      }
      httpPost('/blog/allBlog',ajaxData,(res)=>{
        if(res.Code===1){
          this.total = res.BackData.count
          this.blogList = res.BackData.rows
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .content{
    @include wh(100%,80%);
    margin: auto;
    position: relative
  }
  .large_view{
    @include Gcg(40px,2,1fr,repeat(2,1fr));
  }


</style>
