var url = 'http://192.168.0.17:8080/PIM-Server/comicvine?callback=?';

$.ajax({
    type: 'GET',
    url: url,
    async: false,
    jsonpCallback: 'comicvine',
    contentType: "application/json",
    dataType: 'jsonp',
    success: function (data) {

        $("#table").append("<ul data-role='listview' data-inset='false' data-icon='false' data-divider-theme='b'");

        for (var i in data.COMICVINE) {
            var tr = "<li><a href='index.php'>";
            var img = "<img src='http://www.placehold.it/150x150'></img>";
            var td1 = "<h2" + data.COMICVINE[i].name + "<h2>";
            var description = "<p>Hey x, if you're available at 10am tomorrow, we've got a meeting with the jQuery team.</p>";
            var td2 = "<p class='ui-li-aside'><strong>" + data.COMICVINE[i].count_of_issues + "</strong></p></a></li>";


            var td3 = "<td><div class ='span2'>" + data.COMICVINE[i].last_issue.name + "</div></td>";
            var td4 = "<td><div class ='span2'>" + data.COMICVINE[i].last_issue.issue_number + "</div></td>";
            var td5 = "<td><div class ='span2'>" + data.COMICVINE[i].resource_type + "</div></td></div></tr>";

            $("#table").append(tr + img + td1 + description + td2);

        }
        $("#table").append("</ul>");
        
    },
    error: function (e) {
        console.log(e.message);
    }
});