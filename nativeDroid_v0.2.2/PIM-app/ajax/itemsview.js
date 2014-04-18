/**
 * ItemsViews.js
 *
 */
function goBack() {
    history.back();
    return false;
}

$(document)
    .ready(function () {

        $.urlParam = function (name) {
            var results = new RegExp('[\\?&]' + name + '=([^&#]*)')
                .exec(window.location.href);
            if (results == null) {
                return null;
            } else {
                return results[1] || 0;
            }
        }
        var total = 0;
        var querySelected = decodeURIComponent($.urlParam('select'));
        var server;
        var setup;
        if (querySelected == "All") {
            setup = setup("Comics");
            server = getConnection(setup);
            callServer(setup);
            setup = setup("Movies");
            server = getConnection(setup("Movies"));
            callServer(setup);
            setup = setup("Music");
            server = getConnection(setup("Music"));
            callServer(setup);
            $('#resultType').html("All<div style='float:right;' id='FoundResults'></div>");
            $('#FoundResults').html("<strong>Results </strong>: " + total);
        } else {
            setup = setup(querySelected);
            server = getConnection(setup);
            callServer(setup);
        }

        //---------------------------------------------------------------------------------------------------------------
        //         Selection of Model to Update
        //---------------------------------------------------------------------------------------------------------------
        function setup(querySelected) {
            $('#message-info')
                .hide();
            $("#overlay")
                .fadeIn("slow", function () {
                    // Animation complete
                });
            $('#cancle')
                .fadeIn("fast", function () {
                    // Animation complete
                })

            var volumeID = decodeURIComponent($.urlParam('volume'));
            var localData = JSON.parse(localStorage.getItem(volumeID));
            /* $('#searchQuery')
                .html("Results for : " + localData.name);
                */

            if (volumeID == null) {
                volumeID = "X-men%20AND%20Legacy";
            }

            volumeID = encodeURIComponent(volumeID);
            //var querySelected = decodeURIComponent($.urlParam('select'));
            // Selecting the type of request to make
            var setup = {};

            setup.volumeID = volumeID;
            setup.querySelected = querySelected;
            switch (querySelected) {
            case "Comics":
                //console.log("Comics");
                setup.servlet = "comicvine";
                setup.callback = "comicvine";
                $('#resultType')
                    .html("Comics");
                break;
            case "Books":
                //console.log("Books");
                break;
            case "Music":
                //console.log("Music");
                setup.servlet = "spotify";
                setup.callback = "spotify";
                $('#resultType')
                    .html("Music<div style='float:right;' id='FoundResults'></div>");
                break;
            case "Movies":
                //console.log("Movies");
                setup.servlet = "imdb";
                setup.callback = "imdb";
                $('#resultType')
                    .html("Movies");
                break;
            case "Games":
                //console.log("Games");
                break;
            }
            return setup;
        }


        function getServer() {
            var x = 0;
            var activity = jsonstr;
            var server = activity[0].server;
            console.log(server);
            // alert(server);
            return server;
        }

        function getIP() {
            var x = 0;
            var activity = jsonstr;
            var ip = activity[0].ip;
            console.log(ip);
            // alert(server);
            return ip;
        }

        function getConnection(setup) {
            var ip = getIP();
            var externalServer = 'http://' + ip + ':8080/PIM-Server/' + setup.servlet.toString() + '?callback=?&volume=' + setup.volumeID;
            var localServer = 'http://127.0.0.1:8080/PIM-Server/' + setup.servlet.toString() + '?callback=?&volume=' + setup.volumeID;

            var server = null;
            if (getServer() == "localServer") {
                server = localServer;
            } else {
                server = externalServer;
            }
            return server;
        }

        //---------------------------------------------------------------------------------------------------------------
        //         Request to retrieve Model
        //---------------------------------------------------------------------------------------------------------------
        function callServer(setup) {
            // Making AJAX request to Server
            console.log(server);
            $.ajax({
                type: 'GET',
                url: server,
                async: false,
                jsonpCallback: setup.callback,
                contentType: "application/json",
                dataType: 'jsonp',
                success: function (data) {
                    switch (setup.querySelected) {
                    case "Comics":
                        Comicvine(data);
                        //console.log(JSON.stringify(data));
                        break;
                    case "Books":

                        break;
                    case "Music":
                        Spotify(data);
                        break;
                    case "Movies":
                        IMDB(data);
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

        }
        //---------------------------------------------------------------------------------------------------------------
        //         Spotify view Update 
        //---------------------------------------------------------------------------------------------------------------
        function Spotify(data) {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var imageURL = 'https://embed.spotify.com/oembed/?url=' + data[key].href;
                    var releaseYear = "";
                    if (data[key].releaseYear != null) {
                        releaseYear = data[key].releaseYear;
                    }
                    var appendString = '<li id="' + data[key].externalIds[0].id + '"><a href="item.html?id=' + data[key].externalIds[0].id + '" data-ajax="false">' +
                        '<img src="' + data[key].thumbnail_url + '" style="padding-top:10px">' +
                        '<h2>' + data[key].name + '</h2>' +
                        '<p style="padding-top:-20px">' + data[key].artists[0].name + '</p>' +
                        '<p class="ui-li-aside"><strong>' + releaseYear + '</strong> </p>' +
                        '</a></li>';
                    $("#listview")
                        .append(appendString);
                    //Creating a datastore for ComicvineData
                    var dataToStore = JSON.stringify(data[key]);
                    // Storing data in localstorage 
                    window.localStorage.setItem(data[key].externalIds[0].id, dataToStore);
                }
            } // End of For loop
            updateDisplay(data.length);

            var key = data[0].externalIds[0].id;
            var localData = JSON.parse(localStorage.getItem(key));
            //console.log(localData.name);

            // Displaying Data if it exists
            if (localData == null) {
                alert("Value is null");
            } else {
                //alert(localData.toString());
                //alert("Accessed from LocalStorage : " + localData.id);
            }
        }
        // End of Spotify Function
        //---------------------------------------------------------------------------------------------------------------
        //         Comicvine view Update 
        //---------------------------------------------------------------------------------------------------------------
        function Comicvine(data) {
            var currentSearchIssues = [];
            window.localStorage.setItem("currentSearchIssues", currentSearchIssues);
            for (var i in data.COMICVINE) {

                var type = decodeURIComponent($.urlParam('type'));
                var displayType;
                if (type == "issue") {
                    displayType = "&type=issue";
                } else {
                    displayType = "%type=volume";
                }

                //console.log(data.COMICVINE[i].toString);

                var appendString = '<li id="' + data.COMICVINE[i].id + '"><a href="item.html?id=' + data.COMICVINE[i].id + displayType + '" data-ajax="false">' +
                    '<img src="' + data.COMICVINE[i].image_url + '">' +
                    '<h2>' + data.COMICVINE[i].name + '</h2>' +
                    '<p style="padding-top:-20px">' + //data.COMICVINE[i].description + 
                '</p>' +
                    '<p class="ui-li-aside"><strong>Issue ' + data.COMICVINE[i].issue_number + '</strong></p>' +
                    '</a></li>';
                $("#listview")
                    .append(appendString);

                //Creating a datastore for ComicvineData
                var dataToStore = JSON.stringify(data.COMICVINE[i]);
                // Storing data in localstorage 
                window.localStorage.setItem(data.COMICVINE[i].id, dataToStore);
                currentSearchIssues.push(data.COMICVINE[i].id);
            }

            window.localStorage.setItem("currentSearchIssues", currentSearchIssues);
            updateDisplay(data.COMICVINE.length);

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
        }
        // End of Comicvine Function
        //---------------------------------------------------------------------------------------------------------------
        //          IMDB Dynamic View
        //---------------------------------------------------------------------------------------------------------------
        function IMDB(data) {
            
            for (var i in data.IMDB) {
                var director;
                var poster;
                if (data.IMDB[i].director != "N/A") {
                    director = data.IMDB[i].director;
                } else {
                    director = "";
                }
                if (data.IMDB[i].poster != "N/A") {
                    poster = data.IMDB[i].poster;
                } else {
                    poster = "images/unknown.png";
                }

                //console.log(data.IMDB[i].poster);
                var appendString = '<li id="' + data.IMDB[i].imdbID + '"><a href="item.html?id=' + data.IMDB[i].imdbID + '" data-ajax="false">' +
                    '<img src="' + poster + '">' +
                    '<h2>' + data.IMDB[i].title + '</h2>' +
                    '<p style="padding-top:-20px">' + director + '</p>' +
                    '<p class="ui-li-aside"><strong>' + data.IMDB[i].runtime + '</strong></p>' +
                    '</a></li>';
                $("#listview")
                    .append(appendString);
                //Creating a datastore for ComicvineData
                //var dataToStore = JSON.stringify(data.IMDB[i]);
                // Storing data in localstorage 
                //window.localStorage.setItem(data.IMDB[i].imdbID, dataToStore);
            }
            updateDisplay(data.IMDB.length);
        }
        // End of Comicvine Function

        //---------------------------------------------------------------------------------------------------------------
        //          Updates View
        //---------------------------------------------------------------------------------------------------------------
        function updateDisplay(length) {
            $('#listview')
                .listview('refresh');
            $('#overlay').fadeOut();

            // Animations and dynamically changing screen elements
            //$('#numberOfResults').html(length);
            total = total + length;
            $('#FoundResults').html("<strong>Results </strong>: " + total);

            $('#cancle')
                .hide();
            $('#comicview')
                .listview('refresh');
            $("#message-info")
                .fadeIn("slow", function () {
                    //console.log("Request Complete : Comic Vine Volume");
                });

            var volumeID = decodeURIComponent($.urlParam('volume'));
            var localData = JSON.parse(localStorage.getItem(volumeID));
            console.log(localData.name);
            $('#searchQuery').html("<strong>"+localData.name+" </strong> : " + length + " Results");
            //$('#searchResults').html("<strong>Volume </strong>: " + length);



        }
        //---------------------------------------------------------------------------------------------------------------
    });