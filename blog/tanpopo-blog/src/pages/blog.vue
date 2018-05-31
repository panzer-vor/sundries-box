<template>
  <div id="blog">
    <main id="paper">
      <h1 class="tit">gggggggggggg</h1>
      <span class="info">2018/12/1/2</span>
      <article class="content"></article>  
    </main>
  </div>
</template>

<script>
import CommonContent from "cpm/CommonContent";
export default {
  data() {
    return {
      page: 0,
      blogList: [],
      type: ["web", "acg", "another"]
    };
  },
  components: {
    CommonContent
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
#blog {
  @include wh(100%);
}
main {
  display: block;
  @include wh(calc(99vh - 80px - 60px),90%);
  margin: 0 auto;
  padding: 20px;
  overflow-y: scroll;
  background: rgba(255,255,255,.7);
  &::-webkit-scrollbar-track {
    background-color: #b46868;
  } /* 滚动条的滑轨背景颜色 */

  &::-webkit-scrollbar {
    background-color: rgba(0, 0, 0, 0.2);
  } /* 滑块颜色 */

  &::-webkit-scrollbar-button {
    background-color: #7c2929;
  } /* 滑轨两头的监听按钮颜色 */

  &::-webkit-scrollbar-corner {
    background-color: black;
  } /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
}

.tit {
  margin-bottom: 10px;
}
.info {
}
.content {
  white-space: pre-wrap;
}
</style>
