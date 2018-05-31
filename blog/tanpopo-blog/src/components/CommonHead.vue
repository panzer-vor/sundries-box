<template>
  <header>
    <div class="music_wra">
      <vue-x-player :url="'/static/01.仲村芽衣子 - Emotional Rule.mp3'"
               :small='true'
            
      ></vue-x-player>
    </div>
    <img src="../assets/logo.png" alt="" @click="go">
  </header>
</template>

<script>
export default {
  methods:{
    go(){
      this.router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
  header{
    @include Fja(space-between);
    padding: 10px 5%;
  }
  img{
    @include wh(auto,$headHeight - 10px*2);
    border-radius: 50%;

  }
  .music_wra{
    width: 40%;
  }
</style>
