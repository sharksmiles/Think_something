<template>
  <div id="app">
     <router-view></router-view>
    <TabBar v-show="$route.meta.showBottomTabBar"></TabBar>
  </div>
</template>

<script>
  import TabBar from './components/TabBar/TabBar'
export default {
  name: 'App',
  mounted(){
    this.$store.dispatch("getUserInfo");
  },
  components:{
    TabBar
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  #app
   width 100%
   height 100%
   background-color: #e0e0e0


</style>
