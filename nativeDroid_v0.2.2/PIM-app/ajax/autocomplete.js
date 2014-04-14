$(document).ready(function () {
    console.log("Document ready : Autocomplete.js");

    function getServer() {
        var x = 0;
        var activity = jsonstr;
        var server = activity[0].server;
        console.log(server);
        // alert(server);
        return server;
    }

    var externalServer = 'http://137.117.146.199:8080/PIM-Server/comicvine?callback=?&query=x-men';
    var localServer = "http://127.0.0.1:8080/PIM-Server/comicvine?callback=?&query=x-men";

    var server = null;
    if (getServer() == "localServer") {
        server = localServer;
    } else {
        server = externalServer;
    }

    $.ajax({
        type: 'GET',
        url: server,
        async: false,
        jsonpCallback: 'comicvine',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function (data) {

            for (var i in data.COMICVINE) {
                $("#listview").append("<li><a href='/wiki/" + data.COMICVINE[i].name + "' title='" + data.COMICVINE[i].name + "'>" + data.COMICVINE[i].name + "</a></li>");
            }
            $('#listview').listview('refresh');
            console.log("Request Complete : Comic Vine Volume");
        },
        error: function (e) {
            console.log(e.message);
        }
    });
});