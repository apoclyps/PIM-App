  /**
   * Tables.js
   *
   */
  $(document).ready(function () {
      var server = getConnection();
      sendAjax();
      //=============================================================================

      function getServer() {
          var x = 0;
          var activity = jsonstr;
          var server = activity[0].server;
          console.log(server);
          // alert(server);
          return server;
      };

      function getIP() {
          var x = 0;
          var activity = jsonstr;
          var ip = activity[0].ip;
          console.log(ip);
          // alert(server);
          return ip;
      }

      function getConnection() {
          var ip = getIP();

          var externalServer = "http://" + ip + ":8080/PIM-Server/comicvine?callback=?&query=batman";
          var localServer = "http://127.0.0.1:8080/PIM-Server/comicvine?callback=?&query=batman";

          var server = null;
          if (getServer() == "localServer") {
              server = localServer;
          } else {
              server = externalServer;
          }
          return server;
      }

      function sendAjax() {
          $.ajax({
              type: 'GET',
              url: server,
              async: false,
              jsonpCallback: 'comicvine',
              contentType: "application/json",
              dataType: 'jsonp',
              success: function (data) {

                  for (var i in data.COMICVINE) {
                      var rank = i.valueOf();
                      rank++;
                      var tr = "<tr>";
                      var td0 = "<th class='class='ui-table-priority-2 ui-table-cell-visible'>" + rank + "</th>";
                      var td1 = "<td class='title'><a href='item.html' class='ui-link' data-rel='external'>" + data.COMICVINE[i].name + "</a></td>";
                      var td2 = "<td class='ui-table-priority-3 ui-table-cell-visible'>" + data.COMICVINE[i].count_of_issues + "</td>";
                      var td3 = "<td class='ui-table-priority-1 ui-table-cell-visible'>" + data.COMICVINE[i].last_issue.name + "</td>";
                      var td4 = "<td class='ui-table-priority-4 ui-table-cell-visible' style='padding-right:30px'>" + data.COMICVINE[i].last_issue.issue_number + "</td></tr>";

                      $("#table-column-toggle")
                          .append(tr + td0 + td1 + td2 + td3 + td4);
                  }
                  $("#table-column-toggle")
                      .table("refresh");
                  console.log("Request Complete : Comic Vine Volume");
              },
              error: function (e) {
                  console.log(e.message);
              }
          });
      }

  });