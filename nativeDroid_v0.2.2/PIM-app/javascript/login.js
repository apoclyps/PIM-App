//var url = 'http://192.168.0.17:8080/PIM-Server/comicvine?callback=?';

$( document ).ready(function() {
console.log( "Document ready : listview.js");
$.mobile.loading('show')

	var url = 'http://127.0.0.1:8080/PIM-Server/login?username=kyle&password=harrison';
	//var url = 'http://137.117.146.199:8080/PIM-Server/comicvine?callback=?&query=batman';
	$.ajax({
		type: 'POST',
		url: url,
		async: false,
		jsonpCallback: 'login',
		contentType: "application/json",
		dataType: 'jsonp',
		success: function (data) {

			console.log("Request Complete : Login");

		},
		error: function (e) {
			console.log(e.message);
		}
	});
});