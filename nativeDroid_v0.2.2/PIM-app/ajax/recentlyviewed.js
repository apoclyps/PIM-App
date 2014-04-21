/**
 * RecentlyViewed.js
 *
 */
$(document).ready(function () {

    function allStorage() {
        var archive = [],
            keys = Object.keys(localStorage);
        //console.log(keys.toString());
        i = 0;

        for (var i; i < keys.length; i++) {
            archive.push(localStorage.getItem(keys[i]));
        }
        return archive;
    }

    //console.log(allStorage().toString());
    var archive = allStorage();
    updateTable();

    function updateTable() {
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

                if (object.issue_number == null) {
                    object.issue_number = "";
                }
                if (object.count_of_issues == null) {
                    object.count_of_issues = "";
                }
                if (object.first_issue == null) {
                    object.type = "issue";
                } else {
                    object.type = "volume";
                }

                var tr = "<tr>";
                var td1 = "<td class='title'><a href='item.html?id=" + object.id + "&type=" + object.type + "' class='ui-link' data-rel='external' data-ajax='false'>" + object.name.substring(0, 25) + "</a></td>";
                var td2 = "<td class='ui-table-priority-3 ui-table-cell-visible'>" + object.count_of_issues + "</td>";
                var td3 = "<td class='ui-table-priority-4 ui-table-cell-visible' style='padding-right:30px'>" + object.issue_number + "</td>";
                var td4 = "<td class='ui-table-priority-1 ui-table-cell-visible'>" + object.type + "</td></tr>";

                $("#table-column-toggle")
                    .append(tr + td1 + td2 + td3 + td4);
            }
        }
        $("#table-column-toggle")
            .table("refresh");
    }



});