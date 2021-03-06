const express = require('express')
var bodyParser = require('body-parser')
var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
const mysql = require('mysql')
var cors = require('cors')
app.use(cors())

const port = 8080

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Steven1spielberg",
  port: "3306",
  database: "forum"
})

app.post('/signUp', function (req, res) {
    const queryString = "INSERT INTO accounts (Username, Password) VALUES (?, ?)"
    console.log (req.body)
    con.query(queryString, [req.body.username, req.body.password], function (err, result){
    if (err) {
      throw err
    }
    if (result.length != 1) {
    return res.send('Failed to Add');
  } else {
    res.send("Account Created");
  }
    })
  })

app.get('/signIn', function (req, res){
  const queryString = 'SELECT * FROM accounts WHERE Username = ? AND Password  = ?'
    con.query(queryString, [req.body.username, req.body.password], function (err, result){
      

    if (err) {
     throw err;
    }
    if (result.length != 1) {
      return  res.send('Error')
    }
   else {
     res.send('Logged In')
    }
    });  
});

app.post('/forum', function (req, res){
  const queryString = "INSERT INTO comments (Comments) VALUES (?)"
  console.log (req.body)
  con.query(queryString, [req.body.comment], function (err, result){
    if (err) {
      throw err;
    }
    if (result.length != 1) {
      return res.send('Comment failed to post')
    }
   else {
     res.send("Posted Comment")
    };
    })
})
app.get('/forum', function (req, res){
  const queryString = 'SELECT * FROM comments WHERE Comments = ?'
  console.log (req.body)
  con.query(queryString, [req.body.insert], function (err, result){
    if (err) {throw err;}
    var commenting = JSON.stringify(result)
    res.send(commenting);
    console.log (commenting)
  }) 
})
app.listen(port, (  ) => {
  console.log(`Example app listening at http://localhost:${port}`)
})