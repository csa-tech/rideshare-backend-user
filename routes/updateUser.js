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

ChangeUserInfo = function(req, res, next){
  try{
    if(!req.body.name && !req.body.contact && !req.body.avatar_url)
      res.status(400).send("None Information Provided");
    // only provided name
    else if(req.body.name && !req.body.contact && !req.body.avatar_url){
      connection.query("UPDATE rideshare.user SET name = ? WHERE user_id = ?",
      [req.body.name, req.query.user_id],
      function(err, rows, fields){
        if(err) throw err;
        res.status(200).send("Updated name only");
      })
    }
    // only provided contact
    else if(!req.body.name && req.body.contact && !req.body.avatar_url){
      connection.query("UPDATE rideshare.user SET contact = ? WHERE user_id = ?",
      [req.body.contact, req.query.user_id],
      function(err, rows, fields){
        if(err) throw err;
        res.status(200).send("Updated contact only");
      })
    }
    // only provided avatar_url
    else if(!req.body.name && !req.body.contact && req.body.avatar_url){
      connection.query("UPDATE rideshare.user SET avatar_url = ? WHERE  user_id = ?",
      [req.body.avatar_url, req.query.user_id],
      function(err, rows, fields){
        if(err) throw err;
        res.status(200).send("Updated avatar_url only");
      })
    }
    // provided both name and contact
    else if (req.body.name && req.body.contact && !req.body.avatar_url){
      connection.query("UPDATE rideshare.user SET name = ?, contact = ? WHERE user_id = ?",
      [req.body.name, req.body.contact, req.query.user_id],
      function(err, rows, fields){
        if(err) throw err;
        res.status(200).send("Updated both name and contact");
      })
    }
    // provided both name and avatar_url
    else if (req.body.name && !req.body.contact && req.body.avatar_url){
      connection.query("UPDATE rideshare.user SET name = ?, avatar_url = ? WHERE user_id = ?",
      [req.body.name, req.body.avatar_url, req.query.user_id],
      function(err, rows, fields){
        if(err) throw err;
        res.status(200).send("Updated both name and avatar_url");
      })
    }
    // provided both contact and avatar_url
    else if (!req.body.name && req.body.contact && req.body.avatar_url){
      connection.query("UPDATE rideshare.user SET contact = ?, avatar_url = ? WHERE user_id = ?",
      [req.body.contact, req.body.avatar_url, req.query.user_id],
      function(err, rows, fields){
        if(err) throw err;
        res.status(200).send("Updated both contact and avatar_url");
      })
    }
    // provided all info
    else if (req.body.name && req.body.contact && req.body.avatar_url){
      connection.query("UPDATE rideshare.user SET name = ?, contact = ?, avatar_url = ? WHERE user_id = ?",
      [req.body.name, req.body.contact, req.body.avatar_url, req.query.user_id],
      function(err, rows, fields){
        if(err) throw err;
        res.status(200).send("Updated name, contact, and avatar_url");
      })
    }
  }catch (err){
    res.status(500).send("Server Error: " + err);
    connection.end();
  }
}

router.post('/', function(req, res, next){
  ChangeUserInfo(req, res, next);
});

module.exports = router;
