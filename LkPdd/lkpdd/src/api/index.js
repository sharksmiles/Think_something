import  ajax from  './ajax'

//定义基础路径
 const BASE_URL='http://127.0.0.1:3000';
// const BASE_URL = '/api';


//请求的方法
//请求首页轮播图
export  const  getHomeCasual=()=>ajax(BASE_URL+'/api/homecasual');
//请求首页导航
export  const  getHomeNav=()=>ajax(BASE_URL+'/api/homenav');
//请求首页商品列表
export  const  getHomeShopList=()=>ajax(BASE_URL+'/api/shoplist');
//请求推荐列表数据
// const PDD_BASE_URL="/api";
export  const  getReShopList=(params)=>ajax(BASE_URL+'/api/recommend',params);
//请求搜索商品列表
export  const  getSearchGoodsList=()=>ajax(BASE_URL+'/api/searchgoods');
//获取短信验证码
export  const  getPhoneCode=(phone)=>ajax(BASE_URL+'/api/send_code',{phone});
// 手机验证码登录
export const phoneCodeLogin = (phone, code) => ajax(BASE_URL + '/api/login_code', {phone, code}, 'POST');
//  用户名和密码登录
export const pwdLogin = (name, pwd, captcha) => ajax(BASE_URL + '/api/login_pwd', {name, pwd, captcha}, 'POST');
//  获取登录的用户信息
export const getUserInfo = () => ajax(BASE_URL + '/api/user_info' );
