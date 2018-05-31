<template>
  <div class="pos_r_center view_wra">
    <div class="view_four">
      <i></i><i></i><i></i><i></i>
    </div>
    <div class="view_nine" style="display:none">
      <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  .view_wra{
    z-index: 10;
    @include wh(50px,200px);
    border: 1px solid rgba(#fff,.5);
    bottom: 50px;
    @include Fj(center);
    @include window{
      &:hover{
        i{
          transform: scale(.8)
        }
      }
    }
    @include tablet{
        top: -$headHeight + 20px;
        border: none;
      }
    div{
      @include wh(100%,40%);
      align-items: center;
      justify-items: center;
      padding: 5px;
      i{
        display: block;
        width: 100%;
        height: 100%;
        background-color: #fff;
        transition: all .3s;
      }
    }
    .view_four{
      @include Gcg(5px,2,1fr,repeat(2,1fr));
    }
    .view_nine{
      @include Gcg(5px,3,1fr,repeat(3,1fr));
    }
  }
</style>
