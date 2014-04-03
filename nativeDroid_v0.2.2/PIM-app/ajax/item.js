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

    console.log("name :" + localData.name);
    var deck = localData.deck;
    var description = localData.description;

    if (description != null) {
        var description = description.substring(0, 1000);
    } else {
        description = "No description available";
    }

    if (deck != null) {
        var deck = deck.substring(0, 250);
    } else {
        deck = "No Synopsis available";
    }

    var dynamicView = '<img style="float:right" src="' + localData.image.thumb_url + '"></img>' +
        '<h1 id="name">' + localData.name + '</h1> <br>' + '<h2>' + localData.last_issue.name + '</h2>' + '<h2>' + localData.count_of_issues + ' Issues</h2><br>' + '<div style="text-align:justify" id="description">' + '<h3><strong>Description</strong></h3>' + '<p>' + deck + '</p><br>' +
        '<h3><strong>Synopsis</strong></h3>' + '<p>' + description + '....<a href="#">Read More </a></p> ' + '</div>';

    $("#comicview").append(dynamicView);
    $("#comicview").load(dynamicView);
});