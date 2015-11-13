function addToCart(productName){
  if (products[productName].quantity == 0)
    // updateButton(productName);
    return;
  products[productName].quantity -= 1;
  if (cart.hasOwnProperty(productName)){
    cart[productName] += 1;
  } else {
    cart[productName] = 1;
  }
  updateCartPrice();
  updateButton(productName);
  updateCart();
}

function removeFromCart(productName){
  if (cart.hasOwnProperty(productName)){
    cart[productName] -= 1;
    products[productName].quantity += 1;
    if (cart[productName] === 0)
      delete cart[productName];
  }
  updateCartPrice();
  updateButton(productName);
  updateCart();
}

function updateCart(){
  var showcart = "";
  var total = 0;
  for (e in cart){
    total += (cart[e] * products[e].price)
    showcart += "<tr>";
    showcart += "<td>"+e+"</td>";
    showcart += "<td>"+products[e].price+"</td>";
    showcart += "<td>"+cart[e]+"</td>";
    showcart += "<td><button class='add cartplus'>+</button></td>";
    showcart += "<td><button class='remove cartminus'>-</button></td>";
    showcart += "</tr>";
  }
  showcart += "<tr><td></td><td></td><td></td><td>TOTAL</td><td id='total'>$"+total+"</td></tr>";
  $("#tablebody").empty().append(showcart);
  
}

function updateCartPrice(){
  var total = 0;
  for (e in cart) {
    total += (cart[e] * products[e].price)
  }
  $('#cartbutton').text("Cart ($"+ total +")");
}


function updateButton(productName){
  if (products[productName].quantity === 0) {
    $( ".name" ).filter(function(){
      return $(this).text() === productName;
    }).prev().prev().children().first().addClass("hideaddbutton");
    console.log('removing add button');
  } else {
    $( ".name" ).filter(function(){
      return $(this).text() === productName;
    }).prev().prev().children().first().removeClass("hideaddbutton");  
    console.log('adding add button');
  }
  if (!cart.hasOwnProperty(productName)) {
    $( ".name" ).filter(function(){
      return $(this).text() === productName;
    }).prev().prev().children().last().addClass("hideaddbutton");
    console.log($(".name:contains('"+ productName +"')" ).prev().prev().children().last());
    console.log('removing remove button');
  } else {
    $( ".name" ).filter(function(){
      return $(this).text() === productName;
    }).prev().prev().children().last().removeClass("hideaddbutton");
    console.log('adding remove button');
  }
}

function updateFooterTime(){
  $('#footer').text("Inactive Time :"+inactiveTime); 
}