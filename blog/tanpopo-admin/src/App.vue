<template>
  <div id="app">
    <tit :t="$route.name"></tit>
    <el-container style="height: calc(100vh - 60px); border: 1px solid #eee">
      <el-container>
        <aside-left v-if="!$route.meta.aside"></aside-left>
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import asideLeft from 'com/asideLeft'
  import tit from 'com/tit'
export default {
  components:{
    asideLeft,
    tit,
  },
  mounted(){

  }
}
</script>
<style></style>
<style scoped lang="scss">
  @import "assets/css/pubilc.scss","assets/css/_var.scss";

</style>
