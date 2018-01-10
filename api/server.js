var express = require('express');
var app = express();
var fs = require("fs");


app.get('/postal', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*'); 
   fs.readFile( __dirname + "/Data/" + "PostalCode.json", 'utf8', function (err, data) {
       var communes = JSON.parse(data);
       res.end( JSON.stringify(communes) );
   });
})

 app.get('/:id', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    // First read existing users.
    fs.readFile( __dirname + "/Data/" + "PostalCode.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       var user = [];
       for(var i = 0; i < users.length; i++){
           if (users[i]["Code Postal"] == req.params.id)
            user.push(users[i])
       }
       //var user = users["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
    });
 })

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})