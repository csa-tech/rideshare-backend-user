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
  // Check entries in query
  // if(!req.query.name) {
  //   res.status(400).send("name not exists");
  //   return;
  // }
  // if(!req.query.contact) {
  //   res.status(400).send("contact not exists");
  //   return;
  // }

  try {
    connection.query('SELECT * FROM rideshare.user_info WHERE user_id = ?', 
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
    var input = req.query;
    var string = input.user_ID;
  
    // if missing contact and name
    if(!req.body.name && !req.body.contact) {
      res.status(400).send("both not exists");
    }
    // if have contact only, update contact
    else if(req.body.contact && !req.body.name) {
      connection.query('UPDATE rideshare.user_info SET contact = ? WHERE user_id = ?', 
        [req.body.contact, string],
        function(err, rows, fields) {
          if(err){throw err;}
          res.status(200).send('Success added contact: ' + req.body.contact + '\n');
        });
    }
    // if have name only, update name
    else if(req.body.name && !req.body.contact) {
      connection.query('UPDATE rideshare.user_info SET name = ? WHERE user_id = ?',
        [req.body.name, string],
        function(err, rows, fields) {
          if(err){throw err;}
          res.status(200).send('Success added name: ' + req.body.name + '\n');
        });
    }
    // update both
    else {
      connection.query('UPDATE rideshare.user_info SET name = ?, contact = ? WHERE user_id = ?',
        [req.body.name, req.body.contact, string],
        function(err, rows, fields) {
        if(err){throw err;}
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