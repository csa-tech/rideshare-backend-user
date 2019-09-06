// if(!req.data.user_id) res.status(400);
const mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  port     : '3306',
  database : 'rideshare'
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

Getpersonal = function (req, res, next) { 

  try {
    connection.query('SELECT * FROM rideshare.user WHERE user_id = ?', 
      [req.query.user_ID],
      function(err, rows, fields) { //这里写SQL query

      if (err) { throw err; } 
      res.status(200).send(rows);
    });
  } catch(err) {
    res.status(500).send('SERVER ERROR:' + err);
    connection.end();
  }
}

InputPersonal = function(req, res, next){
  try{

    console.log(req.body.name + " " + req.body.contact + " " + req.body.avatar_url);

    var input = req.query;
    var string = input.user_ID;
  
    // if missing contact and name and avatar_url
    if(!req.body.name && !req.body.contact && !req.body.avatar_url) {
      res.status(400).send("all do not exists");
    }
    // if have contact only, update contact
    else if(req.body.contact && !req.body.name && !req.body.avatar_url) {
      connection.query('UPDATE rideshare.user SET contact = ? WHERE user_id = ?', 
        [req.body.contact, string],
        function(err, rows, fields) {
          if(err){throw err;}
          res.status(200).send('Success added contact: ' + req.body.contact + '\n');
        });
    }
    // if have name only, update name
    else if(req.body.name && !req.body.contact && !req.body.avatar_url) {
      connection.query('UPDATE rideshare.user SET name = ? WHERE user_id = ?',
        [req.body.name, string],
        function(err, rows, fields) {
          if(err){throw err;}
          res.status(200).send('Success added name: ' + req.body.name + '\n');
        });
    }
    // if have avatar_url only
    else if(req.body.avatar_url && !req.body.name && !req.body.contact) {
      connection.query('UPDATE rideshare.user SET avatar_url = ? WHERE user_id = ?',
        [req.body.avatar_url, string],
        function(err, rows, fields) {
          if(err){throw err;}
          res.status(200).send('Success added name: ' + req.body.name + '\n');
        });
    }
    // update only name and contact 
    else if(req.body.name && req.body.contact && !req.body.avatar_url){
        connection.query('UPDATE rideshare.user SET name = ?, contact = ? WHERE user_id = ?',
        [req.body.name, req.body.contact, string],
        function(err, rows, fields){
          if(err) throw err;
          res.status(200).send('Success added name: ' + req.body.name + 
            '\n Sucess added contact: ' + req.body.contact);
        })
    }
    // update all
    else {
      connection.query('UPDATE rideshare.user SET name = ?, contact = ? WHERE user_id = ?',
        [req.body.name, req.body.contact, req.body.avatar_url, string],
        function(err, rows, fields) { if(err){throw err;}
          res.status(200).send('Success added name: ' + req.body.name + '\n' +
                            'Success added contact: ' + req.body.contact + '\n');
      });
    }
  }catch(err){
    res.status(500).send("Server Error: " + err);
    connection.end();
  }
}

module.exports = { Getpersonal, InputPersonal }