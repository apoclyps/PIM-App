         function Purge() {
             var tbProducts = window.localStorage.getItem("tbProducts"); //Retrieve the stored data
             tbProducts = JSON.parse(tbProducts); //Converts string to object
             if (tbProducts == null) //If there is no data, initialize an empty array
                 tbProducts = [];
             //window.localStorage.clear();
             window.localStorage.setItem("tbProducts", JSON.stringify(tbProducts));
         }

      //Selects input from pop-up dialogue and returns as object.
      function getQueryParameters() {
          var parameters = {};
          parameters.select = $('input[name=radio-choice-1]:checked').val();
          console.log("Selected : " + parameters.select);
          parameters.query = $('input[name=search]').val();
          console.log("Query : " + parameters.query);
          parameters.true = true;
          return parameters;
      }

      //Converts an object and encodes variables to URL Parameter String.
      function objectToURLParameters(obj) {
          var str = "";
          for (var key in obj) {
              if (str != "") {
                  str += "&";
              }
              str += key + "=" + encodeURIComponent(obj[key]);
          }
          return str;
      }

      //Builds a query to append to URL parameters.
      function query() {
          Purge();
          var parameters = getQueryParameters();
          var urlParameters = objectToURLParameters(parameters);
          console.log(urlParameters);

          if (parameters.true == true) {
              console.log("Redirect to page here");
              console.log("Parameters Encoded : " + urlParameters);
              window.location.href = "listviews.html?" + urlParameters;
          } else {
              console.log("Returned false");
          }
      }

      $(document).keypress(function (e) {
          if (e.which == 13) {
              query();
          }
      })

