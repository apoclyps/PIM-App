$('#login').submit(function () {
	sendAjax();
	return false;
});


function sendAjax() {
 
	// get inputs
	var login = new Object();
	login.username = $('#username').val();
	login.password = $('#password').val();

	jQuery.support.cors = true;
	$.ajax({
		url: "http://137.117.146.199:8080/PIM-Server/register",
		type: 'POST',
		dataType: 'jsonp',
		data: JSON.stringify(login),
		jsonpCallback: 'callback',
		contentType: 'application/json',
		mimeType: 'application/json',
		
		success: function (data) {
		alert(data.username);
		console.log(data.username);
		window.location.href = "index.html";
        },
		error:function(data,status,er) {
			console.log("error: "+data+" status: "+status+" er:"+er);
			alert("Login Unsuccessful");
		}
	});
}