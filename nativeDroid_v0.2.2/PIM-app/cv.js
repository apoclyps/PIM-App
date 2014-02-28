var url = 'http://192.168.0.17:8080/PIM-Server/comicvine?callback=?';

$.ajax({
    type: 'GET',
    url: url,
    async: false,
    jsonpCallback: 'comicvine',
    contentType: "application/json",
    dataType: 'jsonp',
    success: function (data) {
        var head = "<div class='bs-example table-responsive'><table class='table table-striped table-hover' id='sub-table'>";

        var tr = "<thead><tr><div class='row'><strong>";
        var th0 = "<td><div class ='span1' style='padding-left:50px'> </div></td>";
        var th1 = "<td><div class ='span3'> Name </div></td>";
        var th2 = "<td><div class ='span2' style='padding-right:25px'> Issue Count </div></td>";
        var th3 = "<td><div class ='span4' > Last Issue</div></td>";
        var th4 = "<td><div class ='span1'> Last Issue Number</div></td>";
        var th5 = "<td><div class ='span1'> Resource Type</div></td></strong></div></tr>";

        $("#table").append(head + tr + th0 + th1 + th2 + th3 + th4 + th5 + "</thead><tbody>");

        for (var i in data.COMICVINE) {
            var tr = "<tr><div class='row'><a href='#'>";
            var td0 = "<td><div class ='span1' style='padding-left:50px'> </div></td>";
            var td1 = "<td><div class ='span3'>" + data.COMICVINE[i].name + "</div></td>";
            var td2 = "<td><div class ='span2' style='padding-right:50px'>" + data.COMICVINE[i].count_of_issues + "</div></td>";
            var td3 = "<td><div class ='span4'>" + data.COMICVINE[i].last_issue.name + "</div></td>";
            var td4 = "<td><div class ='span1'>" + data.COMICVINE[i].last_issue.issue_number + "</div></td>";
            var td5 = "<td><div class ='span1'>" + data.COMICVINE[i].resource_type + "</div></td></div></a></tr>";

            $("#sub-table").append(tr +td0 + td1 + td2 + td3 + td4 + td5);
        }
        $("#table").append("</tbody></table></div>");
    },
    error: function (e) {
        console.log(e.message);
    }
});