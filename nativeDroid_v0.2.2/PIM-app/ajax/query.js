  /**
   * Query.js
   *
   */
  $(document).ready(function () {

      //Selects input from pop-up dialogue and returns as object.
      function getParameters() {
          var parameters = {};
          parameters.select = $('input[name=radio-choice-1]:checked').val();
          console.log("Selected : " + parameters.select);
          parameters.query = $('input[name=search]').val();
          console.log("Query : " + parameters.query);
          parameters.true = true;
          return parameters;
      };

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
      };

      //Builds a query to append to URL parameters.
      function query() {
          var parameters = getParameters();
          var urlParameters = objectToURLParameters(parameters);
          console.log(urlParameters);

          if (parameters.true == true) {
              console.log("Redirect to page here");
              console.log("Parameters Encoded : " + urlParameters);
              window.location.href = "listviews.html?" + urlParameters;
          } else {
              console.log("Returned false");
          }
      };

      $(document).keypress(function (e) {
          if (e.which == 13) {
              query();
          }
      });

  });