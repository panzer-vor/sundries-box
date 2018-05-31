<template>
  <el-header style="text-align: center; font-size: 18px;line-height: 60px">
    <span>{{t}}</span>
    <div class="logout">
      <el-button type="danger" plain @click="logout" v-if="$route.path!='/login'">登出</el-button>
    </div>

  </el-header>
</template>

<script>
export default {
  props:['t'],
  methods:{
    logout(){
      localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .logout{
    position: absolute;
    top:0;
    right: 50px;
    cursor: pointer;
  }
</style>
