function sendAjax() {
 
	// get inputs
	var login = new Object();
	login.username = $('#username').val();
	login.password = $('#password').val();

	jQuery.support.cors = true;
	$.ajax({
		url: "http://localhost:8080/PIM-Server/register",
		type: 'POST',
		dataType: 'jsonp',
		data: JSON.stringify(login),
		jsonpCallback: 'callback',
		contentType: 'application/json',
		mimeType: 'application/json',
		success: function (data) {
		alert(data.username);
		console.log(data.username);

        },
		error:function(data,status,er) {
			alert("error: "+data+" status: "+status+" er:"+er);
		}
	});
}