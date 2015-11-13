function draw(){

	$("#theList").empty();
	
	for (product in products){
		var liHtmlContent = "";
		liHtmlContent += '<li>';
		liHtmlContent += '<image class="product" src="' + products[product].url + '" />';
		liHtmlContent += '<image class="product cart addtocart" src="images/cart.png"/>';
		liHtmlContent += '<div class="buttons">';
		liHtmlContent += '    <button class="add">Add</button>';
		liHtmlContent += '    <button class="remove hideaddbutton">Remove</button>';
		liHtmlContent += '</div>';
		liHtmlContent += '<div class="price">';
		liHtmlContent += '$' + products[product].price;
		liHtmlContent += '</div>';
		liHtmlContent += '<div class="name">' + product + '</div>';
		liHtmlContent += '</li>';

		$("#theList").append(liHtmlContent);
	}
}