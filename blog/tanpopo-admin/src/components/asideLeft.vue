<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '2']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-view"></i>用户管理</template>
        <el-menu-item-group title="博主" v-if="loginBean.role">
          <el-menu-item index="1-11" @click="go('/AdminEdit')">成员列表</el-menu-item>
          <el-menu-item index="1-12" @click="go('/AddAdmin')">添加管理员</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="管理员" v-else>
          <el-menu-item index="1-21" @click="go('/AdminEdit')">成员列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-document"></i>博文管理</template>
        <el-menu-item index="2-32" @click="go('/BlogsEdit')">文章管理</el-menu-item>
        <el-menu-item index="2-31" @click="go('/BlogPublish')">发布文章</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
export default {
  computed:{
    ...mapGetters({
      loginBean:'loginBean',
    })
  },
  methods:{
    go(url){
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>

</style>
