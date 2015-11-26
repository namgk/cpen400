var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

function makeProductsArray(){
  var products = {
    "Box1": {
        "price": 7,
        "quantity": 5,
        "url": "https://cpen400a.herokuapp.com/images/Box1.png"
    },
    "Box2": {
        "price": 6,
        "quantity": 4,
        "url": "https://cpen400a.herokuapp.com/images/Box2.png"
    },
    "Clothes1": {
        "price": 27,
        "quantity": 2,
        "url": "https://cpen400a.herokuapp.com/images/Clothes1.png"
    },
    "Clothes2": {
        "price": 24,
        "quantity": 6,
        "url": "https://cpen400a.herokuapp.com/images/Clothes2.png"
    },
    "Jeans": {
        "price": 32,
        "quantity": 3,
        "url": "https://cpen400a.herokuapp.com/images/Jeans.png"
    },
    "Keyboard": {
        "price": 23,
        "quantity": 8,
        "url": "https://cpen400a.herokuapp.com/images/Keyboard.png"
    },
    "KeyboardCombo": {
        "price": 29,
        "quantity": 4,
        "url": "https://cpen400a.herokuapp.com/images/KeyboardCombo.png"
    },
    "Mice": {
        "price": 5,
        "quantity": 8,
        "url": "https://cpen400a.herokuapp.com/images/Mice.png"
    },
    "PC1": {
        "price": 338,
        "quantity": 3,
        "url": "https://cpen400a.herokuapp.com/images/PC1.png"
    },
    "PC2": {
        "price": 365,
        "quantity": 5,
        "url": "https://cpen400a.herokuapp.com/images/PC2.png"
    },
    "PC3": {
        "price": 335,
        "quantity": 8,
        "url": "https://cpen400a.herokuapp.com/images/PC3.png"
    },
    "Tent": {
        "price": 30,
        "quantity": 7,
        "url": "https://cpen400a.herokuapp.com/images/Tent.png"
    }
  };

  var productsArray = [];

  for (product in products){
    if (products.hasOwnProperty(product)){
      var aProd = products[product];
      aProd.name = product;
      aProd.image = aProd.url;
      delete aProd.url;
      productsArray.push(aProd);
    }
  }

  return productsArray;
}

function makeUsersArray(){
  return [
    {name: 'abc', token: 'abcd'},
    {name: 'woiaf', token: 'Xoe2inasd'},
    {name: 'ioe', token: 'waefawe'},
    {name: 'ds', token: '22f'}
  ];

}

var mongoRead = function(url){
  this.url = url;

  this.PRODUCTS = 'products';
  this.ORDERS = 'orders';
  this.USERS = 'users';
};


mongoRead.prototype.initDb = function(){
  MongoClient.connect(this.url, function(err, db) {
    db.collection('products').insertMany(makeProductsArray(), function(err, result) {
      // if (err != null)
      //   throw err;

      db.collection('users').insertMany(makeUsersArray(), function(err, result) {
        if (err != null)
          throw err;
        db.close();
      });
    });
    
  });

}

mongoRead.prototype.validate = function(token, callback){
  MongoClient.connect(this.url, function(err, db) {
    if (err != null){
      console.log(err);
      callback(false);
      return;
    }

    var cursor = db.collection('users').find( { "token": token} );

    cursor.toArray(function(err, docs){
      db.close();
      callback(docs[0]);
    });
  });
}

mongoRead.prototype.getAll = function(collection, callback){
  MongoClient.connect(this.url, function(err, db) {
    if (err != null){
      console.log(err);
      callback(null);
      return;
    }

    var cursor = db.collection(collection).find();

    cursor.toArray(function(err, docs) {
      db.close();

      if (err != null)
        callback(null);
      else {
        var results = {};
        
        docs.forEach(function(doc){
          doc['url'] = doc.image;
          delete doc._id;
          delete doc.image;
          results[doc.name] = doc;
        });

        callback(results);
      }
    });
  });
}

module.exports = function(url){
  return new mongoRead(url);
};


