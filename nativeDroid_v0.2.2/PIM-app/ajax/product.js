$('#addManualProduct').submit(function () {
	if(validateForm()){
		sendProduct();
	}
	return false;
});

function validateForm()
{
var productName=document.forms["addManualProduct"]["productName"].value;
var productBarcode=document.forms["addManualProduct"]["productBarcode"].value;
var productQuantity=document.forms["addManualProduct"]["productQuantity"].value;
if (productName==null || productName=="")
  {
  alert("Product name must be filled out");
  return false;
  }else if (productBarcode==null || productBarcode=="")
  {
  alert("Product Barcode must be filled out");
  return false;
  }else if (productQuantity==null || productQuantity=="")
  {
  alert("Product Quantity must be filled out");
  return false;
  }
  return true;
}

function sendProduct() {
 
	// get inputs
	var product = new Object();
	product.name = $('#productName').val();
	product.barcode = $('#productBarcode').val();
	product.quantity = $('#productQuantity').val();
	product.mediatype = $('input[name=radio-choice-a]:checked', '#addManualProduct').val();
		
	var externalServer = "http://137.117.146.199:8080/PIM-Server/product/add/comic";
	var localServer = "http://127.0.0.1:8080/PIM-Server/product/add/comic";

	var sendData = "data="+JSON.stringify(product);
	
	jQuery.support.cors = true;
	$.ajax({
		url: localServer,
		type: 'POST',
		dataType: 'jsonp',
		data: sendData,
		jsonpCallback: 'callbackme',
		contentType: 'application/json',
		mimeType: 'application/json',
		
		success: function (data) {
		alert(data.success);
		
		console.log(data.success);
		if(data.success){
			window.location.href = "result.html?name="+product.name+"&barcode="+product.barcode+"&quantity="+product.quantity+"&mediatype="+product.mediatype;
		}
        },
		error:function(data,status,er) {
			console.log("error: "+data+" status: "+status+" er:"+er);
			alert("Login Unsuccessful");
		}
	});
}