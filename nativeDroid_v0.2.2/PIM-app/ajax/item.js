/**
 * CollectionView.js
 *
 */
function goBack() {
    history.back();
    return false;
}

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
    $("#itemviewlink").click(function () {
        checkIfIssue();
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

    var type = decodeURIComponent($.urlParam('type'));
    var storage = decodeURIComponent($.urlParam('storage'));
    var activeSearchIDs;
    if (type == "volume") {
        activeSearchIDs = window.localStorage.getItem("currentSearchVolumes");
        console.log("Volume selected " + activeSearchIDs.toString());
        //console.log(findIndex(id));
    } else if (storage == "local") {
        activeSearchIDs = localStorage.getItem("tbProducts");
    } else if (type == "issue") {
        activeSearchIDs = window.localStorage.getItem("currentSearchIssues");
        console.log("Issue selected");
    }

    var currentSearchIDs = activeSearchIDs.split(',').map(function (item) {
        return parseInt(item, 10);
    });

    //console.log(currentSearchIDs.toString());

    var index = findIndex(id);
    //console.log(activeSearchIDs.length + " : "+activeSearchIDs.toString());
    //console.log(currentSearchIDs.toString());
    //console.log("current index"+index);

    var tbProducts = getTBProducts();

    updateDataView();
    buttonUpdate();
    //console.log("Loading complete");
    //------------------------------------------------------------

    function getTBProducts(){
        var tbProducts = localStorage.getItem("tbProducts"); //Retrieve the stored data

        tbProducts = JSON.parse(tbProducts); //Converts string to object
        if (tbProducts == null) { //If there is no data, initialize an empty array
            tbProducts = [];
            //localStorage.setItem("tbProducts", JSON.stringify(tbProducts));
        }
        return tbProducts;
    }

    function getProduct() {

        var localData;
        var id = currentSearchIDs[index];
        localData = JSON.parse(localStorage.getItem(id));
        var vname = decodeURIComponent($.urlParam('vname'));

        var product = JSON.stringify({
            ID: id,
            Name: localData.name,
            Barcode: 'unknown',
            Quantity: 1,
            Type: 'comic',
            Image: localData.image_url,
            AssociateID: '1',
            JSONItem: localStorage.getItem(id),
            Vname: vname,
            IssueNo: localData.issue_number
        });
        return product;
    }

    // returns last id in table
    function getID() {
        var productID = JSON.parse(tbProducts[tbProducts.length - 1]);
        console.log(productID.ID);
        return productID.ID;
    }

    function Add(product) {
        tbProducts.push(product);
        localStorage.setItem("tbProducts", JSON.stringify(tbProducts));
        console.log("Item added to Collection.");
        $("#nextView").html("View Collection");
        $("#nextView").show();
        document.getElementById('nextView').href = "collectionview.html?type=Comics";
        return true;
    }

    function Search(product) {
        var product = JSON.parse(product);
        //console.log("PROD "+product.id);
        //console.log("Prod TBL " + tbProducts.length + " data "+ tbProducts.toString());
        for (var i in tbProducts) {
            var searchProduct = JSON.parse(tbProducts[i]);
            //console.log("search product id "+searchProduct.ID);
            //console.log(" product id "+product.ID);
            if (searchProduct.ID == product.ID) {
                //console.log("Found " + searchProduct.ID);
                return true;
            }
        }
        return false;
    }

    function SearchID(ID) {
        console.log("LENGTH " + tbProducts.length);
        for (var i in tbProducts) {
            var searchProduct = JSON.parse(tbProducts[i]);
            console.log("search product id " + searchProduct.ID);
            //console.log(" product id "+product.ID);
            if (searchProduct.ID == ID) {
                console.log("Found " + searchProduct.ID);
                return searchProduct;
            }
        }
        return null;
    }

    function getTBIndex(product) {
        //console.log("PROD "+product.id);
        console.log("Prod TBL " + tbProducts.length + " data " + tbProducts.toString());
        var count = 0;
        for (var i in tbProducts) {
            var searchProduct = JSON.parse(tbProducts[i]);
            count++;
            if (searchProduct.ID == product.ID) {
                //console.log("Index to remove " + searchProduct.ID);
                return count;
            }
        }
        return 0;
    }

    function Delete(product) {
        product = JSON.parse(product);
        for (var i in tbProducts) {
            var searchProduct = JSON.parse(tbProducts[i]);
            //console.log("search product id "+searchProduct.ID);
            //console.log(" product id "+product.ID);
            if (searchProduct.ID == product.ID) {
                //console.log("Found " + searchProduct.ID);
                //console.log("INDEX : " +getTBIndex(product));
                tbProducts.splice(getTBIndex(product) - 1, 1);
                window.localStorage.setItem("tbProducts", JSON.stringify(tbProducts));
                $("#viewText").html("Add Issue");
                console.log("Item removed to Collection.");
            }
        }
        $("#nextView").html("View Collection");
        $("#nextView").hide();

    }


    function checkIfIssue() {
        var issue = decodeURIComponent($.urlParam('type'));

        if (issue == "issue") {
            document.getElementById('itemviewlink').href = "";
            console.log("Existing " + Search(getProduct()));
            if (Search(getProduct()) == true) {
                $("#viewText").html("Remove Issue");
                var product = getProduct();
                //console.log("#id " + product.id);
                Delete(getProduct());
            } else if (Search(getProduct()) == false) {
                // var product = JSON.parse(getProduct());
                Add(getProduct());
                $("#viewText").html("Remove Issue");

            }
        } else {
            console.log(issue.toString());
            // document.getElementById('itemviewlink').href="itemview.html";
        }
    }

    function updateDataView() {
        console.log("Updating view");
        document.getElementById('comicview').innerHTML = "";

        var localData = JSON.parse(localStorage.getItem(id));
        console.log("ID = " + id);
        // Displaying Data if it exists
        if (localData == null) {
            alert("Value is null");
            var storage = decodeURIComponent($.urlParam('storage'));
            if (storage == "local") {
                // Find item in tbProducts
                console.log(id);
                localData = SearchID(id);
                console.log(localData);
            }
        } else {
            var deck = localData.deck;
            var description = localData.description;
        }

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

        var type = decodeURIComponent($.urlParam('type'));
        var vname = decodeURIComponent($.urlParam('vname'));
        if (type == "issue") {
            var dynamicView = '<img style="float:right" src="' + localData.image_url + '"></img>' +
                '<h1 id="name">' + localData.name + '</h1> <br>' + '<h2>' + vname + '</h2>' + '<h2> #' 
                + localData.issue_number + ' Issue</h2><br>' + '<div style="text-align:justify" id="description">' + '<h3><strong>Description</strong></h3>' + '<p>' + deck + '</p><br>' +
                '<h3><strong>Synopsis</strong></h3>' + '<p>' + localData.description + '</p> ' + '</div>';
            //document.getElementById('itemviewlink').href="itemview.html?volume="+id+"&select=Comics&type=issue";
            document.getElementById('itemviewlink').value = "Add to Collection";
        } else if( type=="volume") {
            var dynamicView = '<img style="float:right" src="' + localData.image.thumb_url + '"></img>' +
                '<h1 id="name">' + localData.name + '</h1> <br>' + '<h2>' + localData.last_issue.name + '</h2>' + '<h2>' 
                + localData.count_of_issues + ' Issues</h2><br>' + '<div style="text-align:justify" id="description">' + '<h3><strong>Description</strong></h3>' + '<p>' + deck + '</p><br>' +
                '<h3><strong>Synopsis</strong></h3>' + '<p>' + description + '....<a href="#">Read More </a></p> ' + '</div>';
            document.getElementById('itemviewlink').href = "itemview.html?volume=" + id + "&select=Comics&type=issue&vname="+localData.name;
            document.getElementById('nextView').href = "itemview.html?volume=" + id + "&select=Comics&type=issue&vname="+localData.name;
        }
        $("#comicview").append(dynamicView);
        //$("#comicview").load(dynamicView);
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
        for (i = 0; i < currentSearchIDs.length; i++) {
            //console.log(currentSearchIDs[i]);
            if (currentSearchIDs[i] == value) {
                return i;
            }
        }
    }

    function buttonUpdate() {
        index = findIndex(id);
        console.log("Button Update " + index);

        var issue = decodeURIComponent($.urlParam('type'));
        //console.log("Type " + issue);
        if (issue == "issue") {
            $("#itemviewlink").show();
            $("#nextText").html("Next Issue");
            $("#nextView").hide();

            if (Search(getProduct()) == true) {
                $("#viewText").html("Remove Issue");
                $("#nextView").html("View Collection");
                $("#nextView").show();
                document.getElementById('nextView').href = "collectionview.html?type=Comics";
            } else if (Search(getProduct()) == false) {
                $("#viewText").html("Add Issue");
            }

            $("#previousText").html("Previous Issue");

            document.getElementById('viewText').href = "";
            // Add event listener here
        }

        if (index >= (currentSearchIDs.length - 1)) {
            $("#next").hide();
        } else {
            $("#next").show();
        }

        console.log("Index : " + index);
        if (index <= 0) {
            $("#previous").hide();
        } else {
            $("#previous").show();
        }
    }

    function checkIndexExists() {
        if (index - 1 < 0) {
            index = currentSearchIDs.length - 1;
        }
        return index;
    }

    function previousItem() {
        index = findIndex(id);
        if (index <= 0) {
            //index = currentSearchIDs.length-1;
            //$("#previous").hide();
        } else {
            index = i - 1;
            //$("#previous").show();
            //window.location.href = "item.html?id=" + currentSearchIDs[index];
            console.log("Previous Index " + currentSearchIDs[index]);
            id = currentSearchIDs[index];
            updateDataView();
            runLeftEffect();
            buttonUpdate();
        }
    }

    function nextItem() {
        index = findIndex(id);
        console.log("current " + index);
        if (index >= (currentSearchIDs.length - 1)) {
            //index = 0;
            //$("#next").hide();
        } else {
            index = i + 1;
            //$("#next").show();
            //window.location.href = "item.html?id=" + currentSearchIDs[index];
            //$(document).getElementById('itemviewlink').href="itemview.html?id="+currentSearchIDs[index];
            console.log("Next Index" + currentSearchIDs[index]);
            id = currentSearchIDs[index];
            updateDataView();
            runRightEffect();
            buttonUpdate();
        }
    }

});