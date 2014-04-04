//var url = 'http://192.168.0.17:8080/PIM-Server/comicvine?callback=?';
$(document).ready(function () {
    //console.log( "Document ready : listview.js");
    //$.mobile.loading('show');
     $('#message-info').hide();

     $( "#overlay" ).fadeIn( "slow", function() {
    // Animation complete
    });


    //var url = 'http://127.0.0.1:8080/PIM-Server/comicvine?callback=?';
    var url = 'http://137.117.146.199:8080/PIM-Server/comicvine?callback=?&query=batman';
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        jsonpCallback: 'comicvine',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function (data) {

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
                $("#comicview").append(appendString);
                
                //Creating a datastore for ComicvineData
                var dataToStore = JSON.stringify(data.COMICVINE[i]);
                // Storing data in localstorage 
                window.localStorage.setItem(data.COMICVINE[i].id, dataToStore);
            }
             $('#comicview').listview('refresh');
             $('#overlay').fadeOut();

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

            $('#comicview').listview('refresh');
            //console.log("Request Complete : Comic Vine Volume");
            //$.mobile.loading('hide');

            $( "#message-info" ).fadeIn( "slow", function() {
            // Animation complete
            });
        },
        error: function (e) {
            console.log(e.message);
            $('#overlay').fadeOut();
            alert("Server could not be reached");
        }
    });


});