//var url = 'http://192.168.0.17:8080/PIM-Server/comicvine?callback=?';
$(document).ready(function () {
    console.log("Document ready : item.js");
    //$.mobile.loading('show')

    $.urlParam = function (name) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        } else {
            return results[1] || 0;
        }
    }

    var id = decodeURIComponent($.urlParam('id'));
    console.log(id);

    var localData = JSON.parse(localStorage.getItem(id));
    // Displaying Data if it exists
    if (localData == null) {
        alert("Value is null");
    } else {
        //alert(localData.toString());
        alert("Accessed from LocalStorage : " + localData.id);
    }
    console.log("name :"+localData.name);

        var dynamicView = '<img style="float:right" src="'+localData.image.thumb_url+'"></img>'+
        '<h1 id="name">'+localData.name+'</h1> <br>'+'<h2>'+localData.last_issue.name+'</h2>'+'<h2>'+localData.count_of_issues+' Issues</h2><br>'+'<div style="text-align:justify" id="description">'
        +'<h3><strong>Description</strong></h3>'
        +'<p>The one that started it all. Batman focuses on the rise of the famous Batman and his influence on Gotham City as he fights the most devilish of villains and stops the most dastardly plans. It spanned from 1940-2011.</p><br>'+
        '<h3><strong>Synopsis</strong></h3>'
        +'<p>The entire run of Batman still stands upon large controversies over who actually came up with some of the characters. Bob Kane supposedly came up with the idea for the hero, but it has been suggested that he only came up with a "Bird-man" and Bill Finger suggested he be a "Bat-man". Both creators however, share credit for this character. As for the Joker, the first concept sketch was drawn by Jerry Robinson, but Kane disputed that his input was "minimal" suggesting he and Bill came up with the idea. Kane also finagled many legal aspects of Batman related print and media. Every movie and comic reads "Batman created by Bob Kane" when it should read "Batman created by Bob Kane and Bill Finger"....<a href="#">Read More </a></p> '
        +'</div>';

		$("#comicview").append(dynamicView);
		$( "#comicview" ).load( dynamicView );


});