function fetchProducts(callback){
  var ATTEMPT = 0;
  var MAX_ATTEMPT = 10;
  var TIMEOUT = 1500;

  sendRequest();

  function sendRequest(){
    var ajax = new XMLHttpRequest();
    ajax.timeout = TIMEOUT;

    ajax.open("GET", "/products");

    ajax.onload = function(){
      if (ajax.status != 200) {
        retry(ajax)
        return;
      }

      var result = JSON.parse(ajax.responseText);
      // Update Product, resolve
      for (product in result){
        if (result.hasOwnProperty(product))
          if (!result[product].hasOwnProperty('price') || !result[product].hasOwnProperty('quantity')){
            // corrupted data, reject
            return;
          }
      }

      oldProducts = products;
      products = result;
      console.log('fetched products: ' + JSON.stringify(result));
      callback(true);
    }

    ajax.onerror = function(){
      retry(ajax);
    }

    ajax.ontimeout = function(){
      retry(ajax);
    }

    ajax.onabort = function(){
      console.log('aborted');
      callback(false);
    }

    ajax.send();
  }

  function retry(req){
    if (ATTEMPT >= MAX_ATTEMPT){
      //give up
      req.abort();
      return;
    }

    sendRequest();
    //ajax.send();
    ATTEMPT++;
  }
} 