/**
 * Autocomplete.js
 * Preforms a search and updates listview
 */
$(document).ready(function () {
    console.log("Document ready : Autocomplete.js");
    var server = getConnection();
    //sendAjax();

    updateSearchView();

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
                //console.log("Request Complete : Comic Vine Volume");
            },
            error: function (e) {
                console.log(e.message);
            }
        });
    }

     function allStorage() {
        var archive = [],
        keys = Object.keys(localStorage);
        console.log(keys.toString());
        i = 0;

        for (var i; i < keys.length; i++) {
            archive.push(localStorage.getItem(keys[i]));
        }
        return archive;
    }

    function updateSearchView(){
        var archive = allStorage();
    for (var j = 0; j < archive.length - 1; j++) {
            var rank = j.valueOf();
            rank++;

            var currentID;
            try {
                var object = JSON.parse(archive[j]);
                currentID = parseInt(object.id, 10);
            } catch (error) {
                currentID = 0;
            }

            if (object.id > 0) {

                if (object.first_issue == null) {
                    object.type = "issue";
                } else {
                    object.type = "volume";
                }

                var outputString = "";
                if(object.type=="issue"){
                    outputString =  "<strong>"+object.name.substring(0,25) + "</strong> Issue  #"+object.issue_number;
                }else if (object.type=="volume"){
                    outputString = "<strong>"+object.name.substring(0,25) + "</strong> Volume #"+object.count_of_issues;
                }

                $("#listview").append("<li><a href='item.html?id=" + object.id + "&type=" + object.type 
                    + "' class='ui-link' data-rel='external' data-ajax='false' title='" 
                    + object.id + "'>" + outputString+ "</a></li>");
            }
        }
        $('#listview').listview('refresh');
    }

});