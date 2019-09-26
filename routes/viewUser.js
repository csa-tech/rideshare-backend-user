var express = require('express');
var router = express.Router();
const mysql = require('mysql');

// 定义connection 连到这个特定的一个后端
var connection = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  port     : '3306',
  database : 'rideshare'
});

// 接着需要测试一下是成功连接到后端
connection.connect( function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// 用于读取数据库里面的数据
// @param: user_id
// @return: {
//   "name": ,
//   "contact": ,
//   "url": 
// }
GetUserInfo = function(req, res, next){
  try{
    connection.query('SELECT * FROM rideshare.user WHERE user_id = ?',
    [req.query.user_id], 
    function(err, rows, fields){  // function 里面写操作 这里用来写SQL query 
      if(err) throw err;
      console.log(rows);
      // added information from database into a variable called "data"
      data = { "name": rows[0].name,
               "contact": rows[0].contact,
               "avatar_url": rows[0].avatar_url};
      // send "data" out
      res.status(200).send(data);
    })
  } catch (err){
    res.status(500).send('SERVER ERROR: ' + err);
    connection.end();
  }
};

// 用get method 是因为要get data from database
router.get('/', function(req, res, next){ 
  GetUserInfo(req, res, next); 
});

module.exports = router;