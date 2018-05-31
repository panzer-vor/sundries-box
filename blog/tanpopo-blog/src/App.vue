<template>
  <div id="app">
    <common-head></common-head>
    <main>
      <router-view/>
    </main>
    <common-foot></common-foot>
  </div>
</template>

<script>
import CommonHead from "cpm/CommonHead";
import CommonFoot from "cpm/CommonFoot";
import { mapGetters } from 'vuex'
export default {
  components: {
    CommonFoot,
    CommonHead,
  },
  computed:{
    ...mapGetters({
      imgHost:'imgHost',
    })
  },
  created(){
    console.log(this.imgHost)
  }
};
</script>

<style lang="scss">
#app {
  height: 100vh;
  @include Gc(1,1fr,$headHeight 1fr $footHeight);
}
</style>
