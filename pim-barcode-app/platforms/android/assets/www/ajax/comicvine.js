//var url = 'http://192.168.0.17:8080/PIM-Server/comicvine?callback=?';
var url = 'http://137.117.146.199:8080/PIM-Server/comicvine?callback=?&query=batman';

$.ajax({
    type: 'GET',
    url: url,
    async: false,
    jsonpCallback: 'comicvine',
    contentType: "application/json",
    dataType: 'jsonp',
    success: function (data) {
        var head = "<div class='bs-example table-responsive'><table class='table table-striped table-hover' id='sub-table'>";
        var tr = "<thead><tr>";
        var td1 = "<th><b>Name</b></th>";
        var td2 = "<th><b>Issue Count</b></th>";
        var td3 = "<th><b>Last Issue</b></th>";
        var td4 = "<th><b>Last Issue No</b></th>";
        var td5 = "<th><b>Resource Type</b></th></tr>";

        $("#table").append(
            head + tr + td1 + td2 + td3 + td4 + td5 + "</thead><tbody>");

        for (var i in data.COMICVINE) {
            var tr = "<tr><div class='row'>";
            var td1 = "<td><div class ='span6'>" + data.COMICVINE[i].name + "</div></td>";
            var td2 = "<td><div class ='span2'>" + data.COMICVINE[i].count_of_issues + "</div></td>";
            var td3 = "<td><div class ='span2'>" + data.COMICVINE[i].last_issue.name + "</div></td>";
            var td4 = "<td><div class ='span2'>" + data.COMICVINE[i].last_issue.issue_number + "</div></td>";
            var td5 = "<td><div class ='span2'>" + data.COMICVINE[i].resource_type + "</div></td></div></tr>";

            $("#sub-table").append(tr + td1 + td2 + td3 + td4 + td5);
        }
        $("#table").append("</tbody></table></div>");
    },
    error: function (e) {
        console.log(e.message);
    }
});