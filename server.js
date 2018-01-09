var express = require('express');
var app = express();
var fs = require("fs");


app.get('/listCommunes', function (req, res) {
   fs.readFile( __dirname + "/Data/" + "Communes.json", 'utf8', function (err, data) {
       var users = JSON.parse(data);

       for(var i = 0; i < users.length; i++){
            var dep = users[i]['Code département'];
            var com = users[i]['Code commune'].toString();
            
            if(com.length == 1)
                com="".concat('00'+com);
            if(com.length == 2)
                com="".concat('0' + com);
            var codeInsee = dep + com;
            fs.readFile(__dirname + "/Data/" + "Gps.json", 'utf8', function (err, data){
                /*var postals = JSON.parse(data);

                for(var i = 0; i < postals.length; i++){
                    if(postals[i]['Code Postal'] == codeInsee)
                        console.log(hello);
                }*/
            })    
        //console.log(dep + com);
       }
       res.end( JSON.stringify(users) );
   });
})

app.post('/addUser', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/Data/" + "Communes.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        data["user4"] = user["user4"];
        console.log( data );
        res.end( JSON.stringify(data));
    });
 })

 app.get('/:id', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/Data/" + "Communes.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       var user = users["user" + req.params.id] 
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