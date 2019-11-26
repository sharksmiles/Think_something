<template>
  <div class="recommend-container">
    <ul class="recommend">
      <shop-list
        tag="li"
        v-for="(item, index) in recshoplist"
        :item=item
        :key="index"
        :clickCellBtn="dealWithCellBtnClick"
      />
    </ul>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import ShopList from './../../components/ShopList/ShopList';
  import  BScroll from "better-scroll";
  import {Indicator} from 'mint-ui';
    export default {
        name: "Recommend",
      components:{
        ShopList
      },
      data(){
          return{
            count:20,
            page:1
          }
      },
      computed: {
        ...mapState(['recshoplist'])
      },
        mounted(){

          Indicator.open("正在加载数据...");
          this.$store.dispatch("reqRecShopList",{page:this.page,count:this.count,callback:()=>{
             Indicator.close();
            }});
        },
      watch:{
        recshoplist(){
          this.$nextTick(()=>{
            this.page+=1;
             this._initBScrolls();
          })
        }
      },
      methods: {
        dealWithCellBtnClick(goods_id) {
          console.log(goods_id);

        },
        //滚动初始化
        _initBScrolls(){
          this.listScroll=new BScroll(".recommend-container",{
            scrollY:true,
            probeType:3,
          });
          //监听列表滚动
          this.listScroll.on("touchEnd",(pos)=>{
            //监听下拉
            if(pos.y>50){
              console.log("下拉刷新");
            }
            //监听上拉
            if(this.listScroll.maxScrollY>pos.y+50){
              Indicator.open("正在加载数据...");
              this.$store.dispatch("reqRecShopList",{page:this.page,count:this.count,callback:()=>{
                  Indicator.close();
                }});
            }
          });

          this.listScroll.on("scrollEnd",()=>{
            this.listScroll.refresh();
          })
        },

      },
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .recommend-container
    width 100%
    height 100%
    background #f5f5f5
    overflow  hidden
    .recommend
      display flex
      flex-direction row
      flex-wrap wrap
      background-color: #f5f5f5;
      padding-bottom 5rem
</style>

