<template>
  <div id="hot">
    <!--轮播图-->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(casual, index) in homecausal" :key="index">
          <img :src="casual.imgurl" alt="" width="100%">
        </div>
      </div>
      <!--分页-->
      <div class="swiper-pagination"></div>
    </div>
    <!--导航-->
    <HotNav></HotNav>
    <HotShopList></HotShopList>
  </div>
</template>

<script>
  //引入swiper相关
  import  Swiper from 'swiper'
  import  'swiper/dist/css/swiper.css'
  import  {mapState} from 'vuex'
  import HotNav from './HotNav'
  import HotShopList from './HotShopList'
  export default {
    name: "hot",
    components:{
      HotNav,
      HotShopList
    },
    mounted(){
      //请求轮播图数据
      this.$store.dispatch('reqHomeCasual');
      //初始化导航数据
      this.$store.dispatch('reqHomeNav');
      //初始化上商品列表数据
      this.$store.dispatch('reqHomeShopList');
    },
    computed:{
      ...mapState(["homecausal"])
    },
    watch:{
      homecausal(){
        this.$nextTick(()=>{
          new Swiper('.swiper-container', {
            autoplay: true,//可选选项，自动滑动
            loop: true,
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../../../common/stylus/mixins.styl"
  #hot
    overflow-x hidden !important
    width 100%
    height 100%
    padding-top 4.4rem
    background $bg
</style>
