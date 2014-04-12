$(document).ready(function () {
    // Swipe Event Listeners
    //-----------------------------------------------------------
    $("#page").on("swipeleft", function () {
        nextItem();
    });
    $("#page").on("swiperight", function () {
        previousItem();
    });
    $("#content").on("swipeleft", function () {
        nextItem();
    });
    $("#content").on("swiperight", function () {
        previousItem();
    });
    //-----------------------------------------------------------
    //Button event listners
    $("#previous").click(previousItem);
    $("#next").click(nextItem);
    //------------------------------------------------------------
    $.urlParam = function (name) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        } else {
            return results[1] || 0;
        }
    };

    var id = decodeURIComponent($.urlParam('id'));
    var issuesA = window.localStorage.getItem("currentSearchIssues");
    var currentSearchIssues = issuesA.split(',').map(function (item) {
        return parseInt(item, 10);
    });
    var index = findIndex(id);

    updateDataView();
    buttonUpdate();
    console.log("Loading complete");
    //------------------------------------------------------------

    function updateDataView() {
        console.log("Updating view");
        document.getElementById('comicview').innerHTML = "";

        var localData = JSON.parse(localStorage.getItem(id));
        console.log("ID = " + id);
        //var index = findIndex(id);
        // Displaying Data if it exists
        if (localData == null) {
            alert("Value is null");
        } else {
            //alert(localData.toString());
            // alert("Accessed from LocalStorage : " + localData.id);
        }

        //console.log("name :" + localData.name);
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
        //$("#comicview").load(dynamicView);
        document.getElementById('itemviewlink').href="itemview.html?id="+id;
        console.log("Updating Complete \n\n");
    }
    //-------------------------------------------------------------------------

    function runLeftEffect() {
        $("#comicview").effect("slide", {
            direction: "left"
        }, "fast");
    }

    function runRightEffect() {
        $("#comicview").effect("slide", {
            direction: "right"
        }, "fast");
    }

    function findIndex(value) {
        for (i = 0; i < currentSearchIssues.length; i++) {
            //console.log(currentSearchIssues[i]);
            if (currentSearchIssues[i] == value) {
                return i;
            }
        }
    }

    function buttonUpdate() {
        var index = findIndex(id);
        console.log("Button Update " + index);
        if (index >= (currentSearchIssues.length - 1)) {
            $("#next").hide();
        } else {
            $("#next").show();
        }

        if (index <= 0) {
            $("#previous").hide();
        } else {
            $("#previous").show();
        }
    }

    function checkIndexExists() {
        if (index - 1 < 0) {
            index = currentSearchIssues.length - 1;
        }
        return index;
    }

    function previousItem() {
        var index = findIndex(id);
        if (index <= 0) {
            //index = currentSearchIssues.length-1;
            //$("#previous").hide();
        } else {
            index = i - 1;
            //$("#previous").show();
            //window.location.href = "item.html?id=" + currentSearchIssues[index];
            console.log("Previous Index " + currentSearchIssues[index]);
            id = currentSearchIssues[index];
            updateDataView();
            runLeftEffect();
            buttonUpdate();
        }
    }

    function nextItem() {
        var index = findIndex(id);
        console.log("current " + index);
        if (index >= (currentSearchIssues.length - 1)) {
            //index = 0;
            //$("#next").hide();
        } else {
            index = i + 1;
            //$("#next").show();
            //window.location.href = "item.html?id=" + currentSearchIssues[index];
            //$(document).getElementById('itemviewlink').href="itemview.html?id="+currentSearchIssues[index];
            console.log("Next Index" + currentSearchIssues[index]);
            id = currentSearchIssues[index];
            updateDataView();
            runRightEffect();
            buttonUpdate();
        }
    }

});