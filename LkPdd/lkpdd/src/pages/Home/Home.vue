<template>
    <div id="home">
      <ly-tab
        class="fix"
        :items="items"
        @change="handleChange"
      />
      <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "Home",
         data(){
          return{
            items:[
              {label: '热门'},
              {label: '服饰'},
              {label: '鞋包'},
              {label: '母婴'},
              {label: '百货'},
              {label: '食品'},
              {label: '内衣'},
              {label: '男装'},
              {label: '电器'}
            ],
            //二级路由路径
            subRouteUrl:["/home/hot","/home/dress","/home/box","/home/mbaby","/home/general","/home/food","/home/shirt","/home/man","/home/ele"]
          }
          },
          methods:{
          handleChange(item,index){
            this.$router.replace(this.subRouteUrl[index])

          }
          }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  #home
   width 100%
   height 100%
   background-color: red
   display flex
   .fix
    position fixed
    left 0
    top 0
    z-index 999
    width 100%


</style>
