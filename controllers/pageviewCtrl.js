// if(!req.data.user_id) res.status(400);
const mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'mydatabase.c9ukuxyqda4n.us-west-1.rds.amazonaws.com',
  user     : 'CSAUser',
  password : 'Csa666!!',
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
    connection.query(`SELECT * FROM rideshare.user_info WHERE user_id = '${req.query.user_ID}';`, function(err, rows, fields) { //这里写SQL query
      if(!req.data.name) res.status(400).send("name not exists");
      else if(!req.data.contact) res.status(400).send("contact not exists");
      // else if(!req.data.carType) res.status(400).send("carType not exists");
      // else if(!req.data.carLicense) res.status(400).send("carLicense not exists");
      // else if(!req.data.carColor) res.status(400).send("carColor not exists");
      // else if(!req.data.user_ID) res.status(400).send("user_ID not exists");

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
    connection.query(`SELECT * FROM rideshare.user_info WHERE user_id = '${string}';`, function(err, rows, fields) {
      var $ = req.body;
      if(!req.data.name && !req.data.contact) res.status(400).send("both not exists");
      else if(req.data.contact) connection.query(`UPDATE rideshare.user_info SET 
                                                                              contact = '` + $.contact + `'
                                                                              WHERE user_ID = '${string}';`, function(err, rows, fields) {
                                                                                if(err){throw err;}
                                                                                  res.status(200).send('Success added contact: ' + $.contact + '\n');
                                                                                });
      else if(req.data.name) connection.query(`UPDATE rideshare.user_info SET 
                                                                        name = '` + $.name + `'
                                                                        WHERE user_ID = '${string}';`, function(err, rows, fields) {
                                                                          if(err){throw err;}
                                                                            res.status(200).send('Success added name: ' + $.name + '\n');
                                                                          });
      
      if (err) {throw err;}
      // how to get information from response
      connection.query(`UPDATE rideshare.user_info SET 
                                                    name = '` + $.name + `',
                                                    contact = '` + $.contact + `',
                                                    WHERE user_ID = '${string}';`, function(err, rows, fields) {
      if(err){throw err;}
      res.status(200).send('Success added name: ' + $.name + '\n',
                           'Success added contact: ' + $.contact + '\n');
      });
    });
  }catch(err){
    res.status(500).send("Server Error: " + err);
    connection.end();
  }
}

module.exports = { Getpersonal, InputPersonal }