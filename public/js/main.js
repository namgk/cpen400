// cart: name -> ordered quantity
var cart = {};
// products: name -> quantity, default to 10
var products = {};
var oldProducts = {};
var inactiveTime = 0;
var alertTimer, inactiveTimer;

$(document).ready(function(){
  
  console.log('Populating products variable');

  // populating product by AJAX call
  /*
  $('.name').each(function(index, element){
    var productName = $(element).text();
    $( ".name:contains('"+ productName +"')" ).prev().prev().children().last().addClass("hideaddbutton");
    var productPrice = $(element).prev().text().replace(/[^0-9.]/g, "");
    var price = Number(productPrice);
    var itemDetails = {"price": price, "quantity": 10};
    // products filled by AJAX call
    //products[productName] = itemDetails;
  });
  */

  fetchProducts(function(success){
    if (!success){
      alert('server error, please refresh');
      //location.reload();
      return;
    }

    draw();

    $('button').on('click', function(){
     resetInactivityClock();
    });

    $('.add').on('click', function(){
      var productName = $(this).parent().next().next().text();
      addToCart(productName);
    });

    $('.remove').on('click', function(){
     var productName = $(this).parent().next().next().text();
     removeFromCart(productName);
    });
  })


  $('#checkout').on('click', function(){
    $('#loading').css('visibility', 'visible');
    fetchProducts(function(success){
      $('#loading').css('visibility', 'hidden');
      if (!success){
        alert('server error, please try again');
        return;
      }

      var alertMessage = "";
      var changed = false;

      for (item in cart){
        if (!cart.hasOwnProperty(item))
          return;

        var itemPrice = oldProducts[item].price;

        var productItem = products[item];
        var productQuantity = productItem.quantity;
        var productPrice = productItem.price;

        if (itemPrice !== productPrice){
          alertMessage += 'Price of ' + item + ' has changed from ' + itemPrice + ' to ' + productPrice + '\n';
          itemPrice = productPrice;
          changed = true;
        }

        if (cart[item] > productQuantity){
          alertMessage += 'Availability of ' + item + ' has changed, only ' + productQuantity + ' left\n';
          cart[item] = productQuantity;
          changed = true;
        }
      }

      if (changed){
        alert(alertMessage);
        updateCart();
        $('#total').css('color', 'red');
        updateCartPrice();
      }
    })
  });

  $(document.body).on('click', '.cartplus' ,function(){
    var productn = $(this).parent().prev().prev().prev().text();
    addToCart(productn);
  });

  $(document.body).on('click', '.cartminus' ,function(){
    var productn = $(this).parent().prev().prev().prev().prev().text();
    removeFromCart(productn);
  });

// Closes the cart modal on pressing the ESC key
  $(document).on('keyup',function(evt) {
      if (evt.keyCode == 27) {
         if ($(".modalDialog").css("opacity") == "1") {
            $(".close")[0].click();
         };
      }
  });
  resetInactivityClock();
});

// OLD SHOWCART FUNCTION
function showCart(){
  resetInactivityClock();
  cartitems = "ITEM IN CART\n\n";
  cartlister = [];
  if (Object.keys(cart).length == 0) {
    cartitems = "NO ITEMS IN CART.\n"
  } else {
    for (e in cart){
      cartlister.push({"name": e, "count": cart[e]})
      cartitems = cartitems + e +": "+ cart[e]+"\n";

    }
  }

  theListLoop(cartlister, cartlister.length);
  alert(cartitems);
  resetInactivityClock();
}
// OLD FUNCTION
function theListLoop (cartlister, i) {
  setTimeout(function () {
    alert("ITEM IN CART\n\n"+ cartlister[cartlister.length-i].name + ": "+ cartlister[cartlister.length - i].count);
    if (--i) {          // If i > 0, keep going
      theListLoop(cartlister, i);       // Call the loop again, and pass it the current value of i
    }
  }, 3000);
};

function resetInactivityClock(){
	inactiveTime = 0;

	if (alertTimer)
		clearTimeout(alertTimer);	

	if (inactiveTimer)
		clearInterval(inactiveTimer);

	alertTimer = setTimeout(alertInactivity, 300*1000);
	inactiveTimer = setInterval(updateInactiveTime, 1000);
}

function updateInactiveTime(){
	inactiveTime ++;
  updateFooterTime();
}

function alertInactivity(){
	alert('Hey there! Are you still planning to buy something?');
	resetInactivityClock();
}

