$('#addManualProduct').submit(function () {
	sendProduct();
	return false;
});

function sendProduct() {
 
	// get inputs
	var product = new Object();
	product.name = $('#productName').val();
	product.barcode = $('#productBarcode').val();
	product.quantity = $('#productQuantity').val();
	
	var externalServer = "http://137.117.146.199:8080/PIM-Server/register";
	var localServer = "http://127.0.0.1:8080/PIM-Server/product/add/comic";

	jQuery.support.cors = true;
	$.ajax({
		url: localServer,
		type: 'POST',
		dataType: 'jsonp',
		data: JSON.stringify(product),
		jsonpCallback: 'callback',
		contentType: 'application/json',
		mimeType: 'application/json',
		
		success: function (data) {
		alert(data.success);
		
		console.log(data.success);
		if(data.success){
			//window.location.href = "success.html";
		}
        },
		error:function(data,status,er) {
			console.log("error: "+data+" status: "+status+" er:"+er);
			alert("Login Unsuccessful");
		}
	});
}