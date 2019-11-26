import {
  HOME_CASUAL,
  HOME_NAV,
  HOME_SHOPLIST,
  REC_SHOPLIST,
  SEARCH_GOODLIST,
  USER_INFO,

} from './mutation_types'

export default {
   [HOME_CASUAL](state,{home_casual}){
     state.homecausal= home_casual;
   },
  [HOME_NAV](state,{home_nav}){
    state.homenav= home_nav

  },
  [HOME_SHOPLIST](state,{home_shoplist}){
    state.homeshoplist= home_shoplist
  },
  [REC_SHOPLIST](state,{rec_shop_list}){
    state.recshoplist= state.recshoplist.concat(rec_shop_list);
  },
  [SEARCH_GOODLIST](state,{search_goods_list}){
   state.searchgoodslist=search_goods_list;
  },
  [USER_INFO](state, {userInfo}) {
    state.userInfo = userInfo;
  },
}
