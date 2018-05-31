<template>
  <main>
    <h1>欢迎 {{loginBean.username}}</h1>
    <h2>来到tanpopo后台操作界面</h2>
  </main>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
export default {
  data(){
    return{

    }
  },
  computed: {
    ...mapGetters({
      loginBean:'loginBean',
    })
  },
  mounted(){

  },
  methods:{

  }
}
</script>

<style lang="scss"  scoped>
  main{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1{
      margin: 20% 0 5%;
      font-size: 30px;
    }
  }
</style>
