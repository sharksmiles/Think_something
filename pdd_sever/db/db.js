let  mysql      = require('mysql');
let  conn = mysql.createConnection({
    host     : '127.0.0.1',//数据库的主机地址
    user     : 'root',//账号
    password : 'cw123456',//密码
    database : 'lk_pdd'//链接的数据库名
});

conn.connect();
module.exports=conn;

