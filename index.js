var mongoRead = require('./mongoout')('mongodb://localhost:27017/cpen400')
var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
// mongoRead.initDb();

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get('/products', function(request, response) {
  var token = request.query.token;

  mongoRead.validate(token, function(success){
    if (!success)
      response.status(401).send();
    else {
      response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      
      mongoRead.getAll(mongoRead.PRODUCTS, function(products){
        if (!products)
          response.status(502).send();
        else
          response.json(products);
      })
    }
  })
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
