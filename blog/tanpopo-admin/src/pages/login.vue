<template>
  <main>
    <el-row :gutter="20" style="margin-top:100px">
      <el-col  style="text-align: center">
        <div class="grid-content bg-purple" style="font-size: 20px">欢迎管理员，请登录</div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="display:flex;justify-content: center;margin-top: 50px">
      <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="6">
        <el-input  v-model="username" placeholder="请输入用户名"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="display:flex;justify-content: center;margin-top: 50px">
      <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="6">
        <el-input  v-model="password" placeholder="请输入密码" type="password"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="display:flex;justify-content: center;margin-top: 50px">
      <el-col :span="6" style="text-align: center" >
        <el-button type="primary" @click="login">登录</el-button>
      </el-col>
    </el-row>
  </main>
</template>

<script>
export default {
  data(){
    return{
      username:'',
      password:''
    }
  },
  methods:{
    login(){
      let loginData = {
        username:this.username,
        password:this.password,
      }
      const vm = this
      httpPost('/user/login',loginData,res=>{
        console.log(res)
        if(res.Code==1){
          vm.$store.commit('LOGIN',{name:'loginBean',data:res.BackData})

          vm.$router.push('/')
        }else {
          vm.$alert('账号或密码错误', '登录失败', {
             confirmButtonText: '确定',
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
