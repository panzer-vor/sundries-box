<template>
  <footer>
    <ul>
      <li><i class="icon">&#xe60c;</i>前端</li>
      <li><i class="icon">&#xe6e1;</i>ACG</li>
      <li><i class="icon">&#xe6b1;</i> 杂项</li>
    </ul>
  </footer>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
  ul{
    @include Fj;
    height: 100%;
    li{
      flex: 1;
      transition: all .3s;
      text-align: center;
      padding: 20px 0;
      @include Fja;
      font-size: $footFontSize;
      @include tablet{
        font-size: $footFontSize;
      }
      cursor: pointer;
      &:nth-child(1){
          i{
            margin-top: 5px;
          }
      }
      &:nth-child(2){
          i{
            margin-top: -1px;
            font-size: $footFontSize + 6px;
          }
      }
      &:nth-child(3){
          i{
            margin-top: 5px;
          }
      }
      &:hover{
        box-shadow: 2px 2px 2rem $footColor;
      }
      i{
        margin-right: 10px;
        font-size: $footFontSize;
      }
    }
  }
</style>
