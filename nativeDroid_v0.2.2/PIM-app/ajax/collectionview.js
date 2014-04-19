/**
 * CollectionView.js
 * 
 */
$(document).ready(function () {

    var selected_index = -1; //Index of the selected list item
    var tbProducts = localStorage.getItem("tbProducts"); //Retrieve the stored data
    tbProducts = JSON.parse(tbProducts); //Converts string to object
    if (tbProducts == null) //If there is no data, initialize an empty array
        tbProducts = [];

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
    var display = decodeURIComponent($.urlParam('type'));
    var type = getType(display);
    $('#resultType').html(display);

    loadLocalStorate();
    //======================================================================

    function getType(display) {
        var type = null;
        switch (display) {
        case "Comics":
            type = "comic";
            break;
        case "Books":
            type = "book";
            break;
        case "Music":
            type = "music";
            break;
        case "Movies":
            type = "movie";
            break;
        case "Games":
            type = "game";
            break;
        case "All":
            type = "all";
            break;
        }
        return type;
    }

    function loadLocalStorate() {
        if (type == "all") {
            ListAll();
        } else {
            List();
        }
    }

    function ListAll() {
        //console.log("List All");
        for (var i in tbProducts) {
            var searchProduct = JSON.parse(tbProducts[i]);
            var appendString = '<li id="' + searchProduct.ID + '"><a href="item.html?id=' + searchProduct.ID + '" data-ajax="false">' +
                '<img src="' + '' + '">' +
                '<h2>' + searchProduct.Vname + '</h2>' +
                '<p style="padding-top:-20px">' + searchProduct.Name + '</p>' +
                '<p class="ui-li-aside"><strong>' + searchProduct.Quantity + '</strong> Items</p>' +
                '</a></li>';
            $("#listview")
                .append(appendString);
        }
        updateDisplay(tbProducts.length);
    }

    function List() {
        var flag = false;
        for (var i in tbProducts) {
            var searchProduct = JSON.parse(tbProducts[i]);
            //console.log("Found "+searchProduct.Name);
            //console.log("Type "+type);
            if (searchProduct.Type.toLowerCase() == type) {
                //console.log("Found " + searchProduct.Name);

                if(searchProduct.Barcode=="unknown"){
                    searchProduct.Barcode ="";
                }

                var appendString = '<li id="' + searchProduct.ID + '"><a href="collectionitem.html?id=' + searchProduct.ID + '&type=issue&storage=local" data-ajax="false">' +
                    '<img src="' + searchProduct.Image + '">' +
                    '<h2>' + searchProduct.Vname + '</h2>' +
                    '<p style="padding-top:-20px">' + searchProduct.Name + '</p>' +
                    '<p class="ui-li-aside"><strong> #</strong>' + searchProduct.IssueNo + '</br> </p>' +
                    '</a></li>'
                $("#listview")
                    .append(appendString);
                flag = true;
            }
        }
        if (flag == false) {
            $("#listview")
                .append("<p>No Results</p>");
        }

        updateDisplay(tbProducts.length);
    }

    //---------------------------------------------------------------------------------------------------------------
    //          Updates View
    //---------------------------------------------------------------------------------------------------------------
    function updateDisplay(tbProducts) {
        $('#listview')
            .listview('refresh');
        $('#overlay')
            .fadeOut();

        // Animations and dynamically changing screen elements
        $('#numberOfResults')
            .html(tbProducts + " Results");
        $('#cancle')
            .hide();
        $('#comicview')
            .listview('refresh');
        $("#message-info")
            .fadeIn("slow", function () {
                //console.log("Request Complete : Comic Vine Volume");
            });
    };
    //---------------------------------------------------------------------------------------------------------------
});