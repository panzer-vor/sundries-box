<template>
  <main>
    <el-form :label-position="labelPosition" label-width="300px" :model="formLabelAlign">
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.name" ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.region" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="formLabelAlign.regionAgain" type="password"></el-input>
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

  export default {
    data() {
      return {
        labelPosition: 'top',
        formLabelAlign: {
          name: '',
          region: '',
          regionAgain: ''
        }
      };
    },
    methods:{
      onSubmit(){
        for (let i in this.formLabelAlign){
          if(this.formLabelAlign[i]==""){
            this.$alert('信息必须填写完整', '添加失败', {
              confirmButtonText: '确定',
            });
            return
          }
        }
        if(this.formLabelAlign.region!=this.formLabelAlign.regionAgain){
          this.$alert('密码不一致', '添加失败', {
            confirmButtonText: '确定',
          });
          return
        }
        if(this.formLabelAlign.region<5){
          this.$alert('必须大于等于6位', '添加失败', {
            confirmButtonText: '确定',
          });
          return
        }
        let ajaxData = {
          username:this.formLabelAlign.name,
          password:this.formLabelAlign.region
        }
        httpPost('/user/add',ajaxData,res=>{
          if(res.Code === 1){
            this.$alert('跳转至列表页面', '添加成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push('/AdminEdit')
              }
            });
          }else {
            this.$alert(res.BackData, '添加失败', {
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
