      //Selects input from pop-up dialogue and returns as object.
      function getParameters() {
          var parameters = {};
          parameters.select = $('input[name=radio-choice-2]:checked').val();
          console.log("Selected : " + parameters.select);
          parameters.scan = $('input[name=radio-choice-3]:checked').val();
          console.log("Scan Type : " + parameters.scan);
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
      function scan() {
          var parameters = getParameters();
          var urlParameters = objectToURLParameters(parameters);
          console.log(urlParameters);

          if (parameters.true == true) {
              if(parameters.scan=="Auto"){
                  console.log("Redirect to page here");
                  console.log("Parameters Encoded : " + urlParameters);
                  console.log("Barcode Scan");
                  //window.location.href = "listviews.html?" + urlParameters;
              }else if(parameters.scan=="Manual"){
                console.log("Manual Scan");
                window.location.href = "product.html?" + urlParameters;
              }

          } else {
              console.log("Returned false");
          }
      }

      $(document).keypress(function (e) {
          if (e.which == 13) {
              query();
          }
      })

