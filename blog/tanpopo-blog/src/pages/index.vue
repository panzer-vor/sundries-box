<template>
  <div id="index">
    <i class="icon pos_c_center arrow">&#xe602;</i>
    <div>

    </div>
    <common-content :page="page" :type='type.indexOf($route.name)'></common-content>
    <i class="icon pos_c_center arrow">&#xe63d;</i>
  </div>
</template>

<script>
import CommonContent from "cpm/CommonContent";
export default {
  data() {
    return {
      page: 0,
      blogList: [],
      type:['web','acg','another']
    };
  },
  components: {
    CommonContent
  },
  created(){
    if(this.$route.params.pid){
      this.page = this.$route.params.pid;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
#index {
  position: relative;
  height: 100%;
  padding-bottom: 20px;
}
i {
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s;
  &:hover {
    color: $hoverColor;
    transform: scale(1.1);
  }
}
.arrow {
  @include whlt(80px,center,80px,80px);
  bottom: 20px;
  font-size: $arrowSize;
  @include tablet {
    &:first-child {
      left: -5% !important;
    }
    &:last-child {
      right: -5% !important;
    }
    font-size: $arrowSizeP;
  }
  margin: auto 0;
  &:first-child {
    left: 5%;
  }
  &:last-child {
    right: 5%;
  }
}
</style>
