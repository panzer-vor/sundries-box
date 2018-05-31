<template>
  <main>
    <el-form :label-position="labelPosition" label-width="300px" :model="formLabelAlign">
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.name" :disabled="!loginBean.role?'disabled':false"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.region" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>
<script>
  import {httpPost} from "../common/http";
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data() {
      return {
        labelPosition: 'top',
        formLabelAlign: {
          name: '',
          region: '',
        }
      };
    },
    computed:{
      ...mapGetters({
        loginBean:'loginBean',
      })
    },
    created(){
      this.formLabelAlign.name = this.loginBean.username
    },
    methods:{
      onSubmit(){
        if(this.formLabelAlign.region<5){
          this.$alert('必须大于等于6位', '修改失败', {
            confirmButtonText: '确定',
          });
          return
        }
        let ajaxData = {
          id:this.loginBean.id,
          username:this.formLabelAlign.name,
          password:this.formLabelAlign.region
        }

        httpPost('/user/edit',ajaxData,res=>{
          if(res.Code === 1){
            this.$store.commit('LOGIN',{name:'loginBean',data:res.BackData})
            this.$alert('跳转至列表页面', '修改成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push('/AdminEdit')
              }
            });
          }else {
            this.$alert(res.BackData, '修改失败', {
              confirmButtonText: '确定',
            });
          }
        })
      },
      resetForm() {
        for (let i in this.formLabelAlign){
          this.formLabelAlign[i] = ""
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  main{
    width: 100%;
    padding: 20px;
  }
</style>
