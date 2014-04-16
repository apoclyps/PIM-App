/**
 * Autocomplete.js
 * Preforms a search and updates listview
 */
$(document).ready(function () {
    console.log("Document ready : Autocomplete.js");
    var server = getConnection();
    sendAjax();

    //=====================================================================

    function getServer() {
        var x = 0;
        var activity = jsonstr;
        var server = activity[0].server;
        //console.log(server);
        return server;
    }

    function getIP() {
        var x = 0;
        var activity = jsonstr;
        var ip = activity[0].ip;
        //console.log(ip);
        return ip;
    }

    function getConnection() {
        var ip = getIP();
        var externalServer = 'http://' + ip + ':8080/PIM-Server/comicvine?callback=?&query=x-men';
        var localServer = "http://127.0.0.1:8080/PIM-Server/comicvine?callback=?&query=x-men";

        var server = null;
        if (getServer() == "localServer") {
            server = localServer;
        } else {
            server = externalServer;
        }
        return server;
    }

    function sendAjax() {
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
    }

});