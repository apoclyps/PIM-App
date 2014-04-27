//var url = 'http://192.168.0.17:8080/PIM-Server/comicvine?callback=?';
//var url = 'http://192.168.0.17:8080/PIM-Server/comicvine?callback=?';

$( document ).ready(function() {
console.log( "Document ready : Autocomplete.js");
	var url = 'http://127.0.0.1:8080/PIM-Server/comicvine?callback=?&query=x-men';
	$.ajax({
		type: 'GET',
		url: url,
		async: false,
		jsonpCallback: 'comicvine',
		contentType: "application/json",
		dataType: 'jsonp',
		success: function (data) {

			for (var i in data.COMICVINE) {
				$("#listview").append("<li><a href='/wiki/"+data.COMICVINE[i].name
				+"' title='"+data.COMICVINE[i].name+"'>"
				+data.COMICVINE[i].name+"</a></li>");			
			}
			$('#listview').listview('refresh');
			console.log("Request Complete : Comic Vine Volume");
		},
		error: function (e) {
			console.log(e.message);
		}
	});
});





