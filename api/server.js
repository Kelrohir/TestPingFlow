var express = require('express');
var app = express();
var fs = require("fs");


app.get('/listCommunes', function (req, res) {
   fs.readFile( __dirname + "/Data/" + "Gps.json", 'utf8', function (err, data) {
       var communes = JSON.parse(data);
       res.end( JSON.stringify(communes) );
   });
})

 app.get('/:id', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/Data/" + "Gps.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       var user = [];
       for(var i = 0; i < users.length; i++){
           if (users[i]["Code_postal"] == req.params.id)
            user.push(users[i])
       }
       //var user = users["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
    });
 })

 app.delete('/deleteUser', function (req, res) {

    // First read existing users.
    fs.readFile( __dirname + "/Data/" + "Communes.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        delete data["user" + 2];
        
        console.log( data );
        res.end( JSON.stringify(data));
    });
 })

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})