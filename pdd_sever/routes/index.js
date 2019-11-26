const express = require('express');
const router = express.Router();
const conn =require("./../db/db.js");
const svgCaptcha = require('svg-captcha');
const sms_util=require("./../util/sms_util");
const md5 = require('blueimp-md5');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 获取首页轮播图
router.get('/api/homecasual',(req,res)=>{
  // const data=require("./../data/homecasual")
  // res.json(data);

    let sqlStr ="SELECT * FROM pdd_homecasual"
    //执行语句
    conn.query(sqlStr,function (error, results, fields) {
        if (error){
            res.json({err_code:0,message:"数据请求失败"})
        }else{
            res.json({success_code:200,message:results})
        }
    });
});

//获取首页导航
router.get("/api/homenav",(req,res)=>{
  const homenavJson=require("./../data/homenav");
  res.json({success_code:200,data:homenavJson.data});

});
//获取首页商品列表
router.get("/api/shoplist",(req,res)=>{
  const data=require("./../data/shoplist")
  res.json({success_code:200,data:data});
});

//推荐列表数据
router.get('/api/recommend',(req,res)=>{
    // const data=require("./../data/recommend").data;
    // //临时数组
    // let temp_arr_all=[];
    // //遍历
    // for (let i=0;i<data.length;i++) {
    //     //取出单个数据对象
    //     let old_temp=data[i];
    //     //取出数据表中对应字段
    //     let temp_arr=[];
    //     temp_arr.push(old_temp.goods_id);
    //     temp_arr.push(old_temp.goods_name);
    //     temp_arr.push(old_temp.short_name);
    //     temp_arr.push(old_temp.thumb_url);
    //     temp_arr.push(old_temp.hd_thumb_url);
    //     temp_arr.push(old_temp.image_url);
    //     temp_arr.push(old_temp.price);
    //     temp_arr.push(old_temp.normal_price);
    //     temp_arr.push(old_temp.market_price);
    //     temp_arr.push(old_temp.sales_tip);
    //     temp_arr.push(old_temp.hd_url);
    //     //合并到大数组
    //     temp_arr_all.push(temp_arr);
    // }
    // //批量插入数据库
    // let sqlStr = "INSERT INTO pdd_recommend(`goods_id`,`goods_name`,`short_name`, `thumb_url`, `hd_thumb_url`, `image_url`, `price`, `normal_price`, `market_price`, `sales_tip`, `hd_url`) VALUES ?";
    // // 3.2 执行语句
    // conn.query(sqlStr, [temp_arr_all], (error, results, fields) => {
    //     if (error) {
    //         console.log(error);
    //         console.log('插入失败');
    //     } else {
    //         console.log('插入成功');
    //     }
    // });

    //获取参数
    let pageNo=req.query.page||1;
    let pageSize=req.query.count||20;
    console.log(req.query.page);
    let sqlStr ="SELECT * FROM pdd_recommend LIMIT " +(pageNo-1)*pageSize+","+pageSize;
    //执行语句
    conn.query(sqlStr,function (error, results, fields) {
        if (error){
            res.json({err_code:0,message:"数据请求失败"})
        }else{
            setTimeout(()=>{
                res.json({success_code:200,data:results})
            },2000);

        }
    });

});


//搜索分类列表
router.get("/api/searchgoods",(req,res)=>{
  const searchJson=require("./../data/search")
  res.json({success_code:200,data:searchJson.data});
});


//一次性图形验证码
router.get("/api/captcha",(req,res)=>{
    //生成随机验证码
    let captcha = svgCaptcha.create({
        color:true,
        size: 4,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        height: 44
    });
    //保存
    req.session.captcha=captcha.text.toLocaleLowerCase();
    //返回客户端
    res.type("svg");
    res.send(captcha.data)
});

let users={};
//发送验证码短信
router.get("/api/send_code",(req,res)=>{
    //获取手机号码
    let phone =req.query.phone;

    //随机产生验证码
    let code=sms_util.randomCode(6);

    // sms_util.sendCode(phone, code, function (success) {
    //     if(success){
    //         users[phone]=code;
    //         res.json({success_code:200,message:"验证码获取成功"})
    //     }else{
    //         res.json({err_code:0,message:"验证码获取失败！"})
    //     }

            users[phone]=code;
            res.json({success_code:200,message:code})

});
//验证码登录
router.post("/api/login_code",(req,res)=>{
    //获取数据
    const phone = req.body.phone;
    const code = req.body.code;

    //验证验证码是否正确
    if(users[phone]!==code){
        res.json({err_code:0,message:"验证码不正确！"});
        return;
    }
    //查询数据
    delete  users[phone];
    let sqlStr = "SELECT * FROM pdd_user_info WHERE user_phone ="+phone+" LIMIT 1";
    conn.query(sqlStr,function (error, results, fields) {
        if (error){
            res.json({err_code:0,message:"数据请求失败"})
        }else{
            results=JSON.parse(JSON.stringify(results));
           if(results[0]){//用户已经存在
               req.session.userid=results[0].id;

               console.log(req.session);
               //返回客户端
               res.json({success_code:200,data:{id:results[0].id,user_name:results[0].user_name,user_phone:results[0].user_phone}})
           }else{//新建用户
                let addsql = "INSERT INTO pdd_user_info(`user_name`,`user_phone`) VALUES (?,?)";
                const addSqlParams=[phone,phone];
               // 3.2 执行语句
               results=JSON.parse(JSON.stringify(results));
               conn.query(addsql, addSqlParams, (error, results, fields) => {
                   if (!error) {
                       req.session.userid=results.insertId;

                       let sqlStr = "SELECT * FROM pdd_user_info WHERE id ="+results.insertId+" LIMIT 1";
                       conn.query(sqlStr, (error, results, fields) => {
                           if (error) {
                               res.json({err_code:0,message:"数据请求失败"});
                           } else {
                               results=JSON.parse(JSON.stringify(results));
                               res.json({success_code:200,data:{id:results[0].id,user_name:results[0].user_name,user_phone:results[0].user_phone}})
                           }
                       });

                   }
               });

           }

        }
        // console.log(req.session);
    });
});

//手机密码登录
/**
 * 用户名和密码登录
 */
router.post('/api/login_pwd', (req, res) => {
    // 1. 获取数据
    const user_name = req.body.name;
    const user_pwd = md5(req.body.pwd);
    const captcha = req.body.captcha.toLowerCase();

    console.log(captcha, req.session.captcha, req.session);

    //2. 验证图形验证码是否正确
    // if (captcha !== req.session.captcha) {
    //     res.json({err_code: 0, message: '图形验证码不正确!'});
    //     return;
    // }
    // delete req.session.captcha;

    // 3. 查询数据
    let sqlStr = "SELECT * FROM pdd_user_info WHERE user_name = '" + user_name + "' LIMIT 1";
    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '用户名不正确!'});
        } else {
            results = JSON.parse(JSON.stringify(results));
            if (results[0]) {  // 用户已经存在
                // 验证密码是否正确
                if (results[0].user_pwd !== user_pwd) {
                    res.json({err_code: 0, message: '密码不正确!'});
                } else {
                    req.session.userId = results[0].id;
                    // 返回数据给客户端
                    res.json({
                        success_code: 200,
                        message: {
                            id: results[0].id,
                            user_name: results[0].user_name,
                            user_phone: results[0].user_phone
                        },
                        info: '登录成功!'
                    });
                }
            } else { // 新用户
                const addSql = "INSERT INTO pdd_user_info(user_name, user_pwd) VALUES (?, ?)";
                const addSqlParams = [user_name, user_pwd];
                conn.query(addSql, addSqlParams, (error, results, fields) => {
                    results = JSON.parse(JSON.stringify(results));
                    // console.log(results);
                    if (!error) {
                        req.session.userId = results.insertId;
                        let sqlStr = "SELECT * FROM pdd_user_info WHERE id = '" + results.insertId + "' LIMIT 1";
                        conn.query(sqlStr, (error, results, fields) => {
                            if (error) {
                                res.json({err_code: 0, message: '请求数据失败'});
                            } else {
                                results = JSON.parse(JSON.stringify(results));
                                // 返回数据给客户端
                                res.json({
                                    success_code: 200,
                                    message: {
                                        id: results[0].id,
                                        user_name: results[0].user_name,
                                        user_phone: results[0].user_phone
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    });
});
/**
 * 根据session中的用户ID获取用户信息
 *
 */
router.get('/api/user_info',(req,res)=>{
    //获取参数
    let userId=req.session.userid;
    let sqlStr = "SELECT * FROM pdd_user_info WHERE id ="+userId+" LIMIT 1";
    console.log(userId,req.session.userid,req.session);
    conn.query(sqlStr, (error, results, fields) => {

        if (error) {
            res.json({error_code:1,
                data:"请先登录"})
        } else {

            results=JSON.parse(JSON.stringify(results));
            if(!results[0]){
                delete  req.session.userId;
                res.json({error_code:1,
                    data:"请先登录"})
            }else {
                res.json({success_code:200,
                    data:{id:results[0].id,user_name:results[0].user_name,user_phone:results[0].user_phone}})

            }
            }
    });

});
module.exports = router;
