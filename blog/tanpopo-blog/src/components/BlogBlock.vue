<template>
  <li>
    <div class="bg_blur">
      <img :src="imgHost+item.avatar" alt="">
    </div>
    <h1>{{item.title}}</h1>
    <p v-html="item.article"></p>
    <div class="bottom_info">
      <span class="icon Front" v-if="item.sort=='前端'">&#xe60c;</span>
      <span class="icon ACG" v-if="item.sort=='ACG'">&#xe6e1;</span>
      <span class="icon Another" v-if="item.sort=='杂项'">&#xe6b1;</span>
      <span>{{filterTime(item.time)}}</span>
    </div>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props:['item'],
  computed:{
    ...mapGetters({
      imgHost:'imgHost',
    })
  },
  data(){
    return{

    }
  },
  created(){
      
  },
  methods:{
    filterTime(val){
      return val.substring(0,val.indexOf('T'));
    }
  }
}
</script>

<style lang="scss" scoped>
  li{
    position: relative;
    overflow: hidden;
    color: $bgColor;
    font-size: 40px;
    &:hover{
      .bg_blur{
        filter:blur(0);
      }
    }
  }
  .bg_blur{
    @include posTL;
    @include wh(100%);
    filter: blur(20px);
    background: -webkit-linear-gradient(transparent,rgba(255,255,255,.5));
    z-index: -1;
    img{
      width: 100%;
      min-height:100%;
      object-fit: contain;
    }
  }
  h1{
    text-align: center;
    font-size: .8em;
    color: #fff;
    padding: 6px 0 8px;
    align-items: center;
    background: -webkit-linear-gradient(transparent,rgba(0,0,0,.5));
  }
  p{
    text-indent: 2em;
    font-size: .5em;
  }
  .bottom_info{
    @include posBL;
    @include wh(2em,100%);
    padding: .5em;
    font-size: .5em;
    @include Fj(space-between);
    line-height: .5em;
    color: rgb(80, 24, 77);
    background: -webkit-linear-gradient(transparent,rgb(255,255,255));
    span:first-child{
      font-size: 2em;
    }
  }
</style>
