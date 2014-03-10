//var url = 'http://192.168.0.17:8080/PIM-Server/comicvine?callback=?';

$( document ).ready(function() {
console.log( "Document ready : listview.js");

	var url = 'http://127.0.0.1:8080/PIM-Server/comicvine?callback=?';
	$.ajax({
		type: 'GET',
		url: url,
		async: false,
		jsonpCallback: 'comicvine',
		contentType: "application/json",
		dataType: 'jsonp',
		success: function (data) {

			for (var i in data.COMICVINE) {
				var appendString = '<li><a href="item.html">'+
					'<img src="'+data.COMICVINE[i].image.thumb_url+'">'+
					'<h2>'+data.COMICVINE[i].name+'</h2>'+
					'<p style="padding-top:-20px">'+data.COMICVINE[i].last_issue.name+'</p>'+
					'<p class="ui-li-aside"><strong>'+data.COMICVINE[i].count_of_issues+'</strong> Issues</p>'+
				'</a></li>';
				$("#comicview").append(appendString);
			}
			
			$('#comicview').listview('refresh');
			console.log("Request Complete : Comic Vine Volume");
		},
		error: function (e) {
			console.log(e.message);
		}
	});
});