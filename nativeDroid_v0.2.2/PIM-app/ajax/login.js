$('#login').submit(function () {
	sendAjax();
	return false;
});

function getServer(){
    var x = 0;
    var activity=jsonstr;
	var server = activity[0].server;
	console.log(server);
   // alert(server);
	return server;
  }

function sendAjax() {
 
	// get inputs
	var login = new Object();
	login.username = $('#username').val();
	login.password = $('#password').val();
	
	var externalServer = "http://137.117.146.199:8080/PIM-Server/login";
	var localServer = "http://127.0.0.1:8080/PIM-Server/login";

	// Building the JSON data to be sent
	var sendData = "data="+JSON.stringify(login);
	
	
	var server = null;
	if(getServer()=="localServer"){
		server = localServer;
	}else{
		server = externalServer;
	}
	alert(server);
	
	jQuery.support.cors = true;
	$.ajax({
		url: server,
		type: 'POST',
		dataType: 'jsonp',
		data: sendData,
		jsonpCallback: 'callback',
		contentType: 'application/json',
		mimeType: 'application/json',
		
		success: function (data) {
		alert(data.success);
		console.log(data.username);
		if(data.success){
			window.location.href = "index.html";
		}
        },
		error:function(data,status,er) {
			console.log("error: "+data+" status: "+status+" er:"+er);
			alert("Login Unsuccessful");
		}
	});
}