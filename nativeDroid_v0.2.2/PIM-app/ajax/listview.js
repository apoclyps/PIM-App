//var url = 'http://192.168.0.17:8080/PIM-Server/comicvine?callback=?';
$(document).ready(function () {
        //console.log( "Document ready : listview.js");
        //$.mobile.loading('show');
        $('#message-info').hide();

        $("#overlay")
            .fadeIn("slow", function () {
                // Animation complete
            });

        $.urlParam = function (name) {
            var results = new RegExp('[\\?&]' + name + '=([^&#]*)')
                .exec(window.location.href);
            if (results == null) {
                return null;
            } else {
                return results[1] || 0;
            }
        }

        // Getting Query Parameters
        var queryTitle = decodeURIComponent($.urlParam('query'));
        console.log(queryTitle);
        $('#searchQuery')
            .html("Results for : " + queryTitle);

        if (queryTitle == null) {
            queryTitle = "X-men%20AND%20Legacy";
        }

        queryTitle = encodeURIComponent(queryTitle);
        console.log(queryTitle);
        var querySelected = decodeURIComponent($.urlParam('select'));

        // Selecting the type of request to make
        var callback;
        var servlet;
        switch (querySelected) {
        case "Comics":
            console.log("Comics");
            servlet = "comicvine";
            callback = "comicvine";
            break;
        case "Books":
            console.log("Books");
            break;
        case "Music":
            console.log("Music");
            servlet = "spotify";
            callback = "spotify";
            break;
        case "Movies":
            console.log("Movies");
            break;
        case "Games":
            console.log("Games");
            break;
        }

        // Making AJAX request to Server
        var url = 'http://137.117.146.199:8080/PIM-Server/' + servlet.toString() + '?callback=?&query=' + queryTitle;
        console.log(url);
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            jsonpCallback: "callback",
            contentType: "application/json",
            dataType: 'jsonp',
            success: function (data) {
                switch (querySelected) {
                case "Comics":
                    Comicvine(data);
                    break;
                case "Books":

                    break;
                case "Music":
                    Spotify(data);
                    break;
                case "Movies":

                    break;
                case "Games":

                    break;
                }
            },
            error: function (e) {
                console.log(e.message);
                $('#overlay')
                    .fadeOut();
                alert("Server could not be reached");
                $('#cancle')
                    .hide();
            }
        });

        function Spotify(data) {
            //console.log(data.toString());
            for (var key in data) {
                //console.log(i.toString);
                //var obj = JSON.parse(key);
                //console.log(obj.toString());
                //console.log(obj[i].toString());
                if (data.hasOwnProperty(key)) {
                    console.log(data[key].name);
                    console.log(data[key].href);
                    console.log(data[key].artists[0].name);
                    console.log(data[key].releaseYear);

                    var imageURL = 'https://embed.spotify.com/oembed/?url=' + data[key].href;

                    var releaseYear = "";
                    if (data[key].releaseYear != null) {
                        releaseYear = data[key].releaseYear;
                    }

                    var appendString = '<li id="' + 1 + '"><a href="item.html?id=' + 1 + '" data-ajax="false">' +
                        '<img src="' + 'https://embed.spotify.com/oembed/?url=' + data[key].href + '">' +
                        '<h2>' + data[key].name + '</h2>' +
                        '<p style="padding-top:-20px">' + data[key].artists[0].name + '</p>' +
                        '<p class="ui-li-aside"><strong>' + releaseYear + '</strong> </p>' +
                        '</a></li>';
                    $("#listview").append(appendString);
                }
            }
            console.log("Size : " + data.length);

            // Animations and dynamically changing screen elements
            $('#overlay')
                .fadeOut();
            $('#numberOfResults')
                .html(data.length + " Results");
            $('#cancle')
                .hide();
            $('#listview')
                .listview('refresh');
            $("#message-info")
                .fadeIn("slow", function () {
                    //console.log("Request Complete : Comic Vine Volume");
                });
        };

        function Comicvine(data) {
            for (var i in data.COMICVINE) {
                var last_issue = null;

                if (data.COMICVINE[i].last_issue.name == null) {
                    last_issue = "";
                } else {
                    last_issue = data.COMICVINE[i].last_issue.name;
                }

                var appendString = '<li id="' + data.COMICVINE[i].id + '"><a href="item.html?id=' + data.COMICVINE[i].id + '" data-ajax="false">' +
                    '<img src="' + data.COMICVINE[i].image.thumb_url + '">' +
                    '<h2>' + data.COMICVINE[i].name + '</h2>' +
                    '<p style="padding-top:-20px">' + last_issue + '</p>' +
                    '<p class="ui-li-aside"><strong>' + data.COMICVINE[i].count_of_issues + '</strong> Issues</p>' +
                    '</a></li>';
                $("#listview")
                    .append(appendString);

                //Creating a datastore for ComicvineData
                var dataToStore = JSON.stringify(data.COMICVINE[i]);
                // Storing data in localstorage 
                window.localStorage.setItem(data.COMICVINE[i].id, dataToStore);
            }
            $('#listview')
                .listview('refresh');
            $('#overlay')
                .fadeOut();

            //Creating a datastore for ComicvineData
            var dataToStore = JSON.stringify(data.COMICVINE[0]);
            // Storing data in localstorage 
            window.localStorage.setItem(data.COMICVINE[0].id, dataToStore);

            var key = data.COMICVINE[0].id;
            var localData = JSON.parse(localStorage.getItem(key));

            // Displaying Data if it exists
            if (localData == null) {
                alert("Value is null");
            } else {
                //alert(localData.toString());
                //alert("Accessed from LocalStorage : " + localData.id);
            }
            // localStorage is now empty
            //window.localStorage.clear();

            // Animations and dynamically changing screen elements
            $('#numberOfResults')
                .html(data.COMICVINE.length + " Results");
            $('#cancle')
                .hide();
            $('#comicview')
                .listview('refresh');
            $("#message-info")
                .fadeIn("slow", function () {
                    //console.log("Request Complete : Comic Vine Volume");
                });

        };


    });