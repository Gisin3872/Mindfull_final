var express = require('express');
var app = express();
app.use(express.json());

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "bvm25.cci.drexel.edu",
  user: "wk77",
  password: "dee4JaeL-oSau5Kai-eeG0AuF6",
  database: "wk77_INFO153_202103"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the database!");
});

app.get('/api/messages', (req, res) => {
    console.log('get request to API/messages');
    con.query("SELECT * FROM Messages", function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/api/messages', (req, res) => {
    console.log('post request to API/messages');
    var sql = "INSERT INTO Messages SET ?";
    console.log(req.body, [req.body.Content, req.body.UserId]);
    con.query(sql, req.body, function (err, result) {
        if (err) throw err;
        console.log("Message inserted");
        res.json({ message: 'Message inserted' });
    });
});

app.get('/api/journals', (req, res) => {
    console.log('get request to API/journals');
    con.query("SELECT * FROM JournalEntry", function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/api/journals', (req, res) => {
    console.log('post request to API/journals');
    console.log(req.body);
    var sql = "INSERT INTO JournalEntry SET ?";
    con.query(sql, req.body, function (err, result) {
        if (err) throw err;
        console.log("Journal entry inserted");
        res.json({ message: 'Journal entry inserted' });
    });
});

const port = 9378;
app.listen(port, () => console.log(`Server is running on port ${port}`));

