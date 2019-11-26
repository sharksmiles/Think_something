import  {
  getHomeCasual,
  getHomeNav,
  getHomeShopList,
  getReShopList,
  getSearchGoodsList,
  getUserInfo
} from './../api'

import {
  HOME_CASUAL,
  HOME_NAV,
  HOME_SHOPLIST,
  REC_SHOPLIST,
  SEARCH_GOODLIST,
  USER_INFO,
} from './mutation_types'

export default {
  //获取首页的轮播图
  async reqHomeCasual({commit}, callBack){
     const result= await getHomeCasual();
     // console.log(result);
    if(200===result.success_code){
      commit(HOME_CASUAL, {home_casual: result.message});
      callBack && callBack();

    }
  },
  //获取首页导航
  async reqHomeNav({commit}){
    const result= await getHomeNav();
     // console.log(result);
    if(200===result.success_code){
      commit(HOME_NAV, {home_nav: result.data});
    }
  },
  //获取首页商品列表
  async reqHomeShopList({commit}){
    const result= await getHomeShopList();
     // console.log(result);
    if(200===result.success_code){
      commit(HOME_SHOPLIST, {home_shoplist: result.data});
    }
  },
  //请求推荐列表
  async reqRecShopList({commit},params){

    const result= await getReShopList(params);

    if(200===result.success_code){
      commit( REC_SHOPLIST, {rec_shop_list: result.data});
      //执行回调
      params.callback && params.callback();
    }
  },
  //请求搜索列表
  async reqSearchGoodsList({commit}){
    const result= await getSearchGoodsList();
    if(200===result.success_code){
      commit( SEARCH_GOODLIST, {search_goods_list: result.data});
      //执行回调
    }
  },
     //同步用户信息
  syncUserInfo({commit}, userInfo){
    commit(USER_INFO, {userInfo});
  },
    //异步获取用户信息
  async getUserInfo({commit}){
    const result= await getUserInfo();
    console.log(result);
    // commit(USER_INFO, {userInfo});
  }
}
