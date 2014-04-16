  /**
   * Product.js
   *
   */
  $(document).ready(function () {
      var server = getConnection();
      var selected_index = -1; //Index of the selected list item
      var tbProducts = localStorage.getItem("tbProducts"); //Retrieve the stored data
      tbProducts = JSON.parse(tbProducts); //Converts string to object

      if (tbProducts == null) //If there is no data, initialize an empty array
          tbProducts = [];

      $('#addManualProduct').submit(function () {
          if (validateForm()) {
              sendProduct();
          }
          return false;
      });

      function validateForm() {
          var productName = document.forms["addManualProduct"]["productName"].value;
          var productBarcode = document.forms["addManualProduct"]["productBarcode"].value;
          var productQuantity = document.forms["addManualProduct"]["productQuantity"].value;
          if (productName == null || productName == "") {
              alert("Product name must be filled out");
              return false;
          } else if (productBarcode == null || productBarcode == "") {
              alert("Product Barcode must be filled out");
              return false;
          } else if (productQuantity == null || productQuantity == "") {
              alert("Product Quantity must be filled out");
              return false;
          }
          return true;
      }

      function getProduct() {
          var id = getID();
          id++;

          var product = JSON.stringify({
              ID: id,
              Name: $('#productName').val(),
              Barcode: $('#productBarcode').val(),
              Quantity: $('#productQuantity').val(),
              Type: $('input[name=radio-choice-a]:checked', '#addManualProduct').val(),
              AssociateID: '1'
          });
          return product;
      }

      // returns last id in table
      function getID() {
          var productID = JSON.parse(tbProducts[tbProducts.length - 1]);
          console.log(productID.ID);
          return productID.ID;
      }

      function Search(product) {
          for (var i in tbProducts) {
              var searchProduct = JSON.parse(tbProducts[i]);
              if (searchProduct.Name == product.name) {
                  console.log("Found " + product.name);
                  return true;
              }
          }
          return false;
      }

      function Add(product) {
          tbProducts.push(product);
          localStorage.setItem("tbProducts", JSON.stringify(tbProducts));
          alert("The Product was saved.");
          return true;
      }

      function getServer() {
          var x = 0;
          var activity = jsonstr;
          var server = activity[0].server;
          console.log(server);
          // alert(server);
          return server;
      }

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

          var externalServer = "http://"+ip+":8080/PIM-Server/product/add/comic";
          var localServer = "http://127.0.0.1:8080/PIM-Server/product/add/comic";

          var server = null;
          if (getServer() == "localServer") {
              server = localServer;
          } else {
              server = externalServer;
          }
          return server;
      }

      function sendProduct() {
          var product = new Object();
          product.name = $('#productName').val();
          product.barcode = $('#productBarcode').val();
          product.quantity = $('#productQuantity').val();
          product.mediatype = $('input[name=radio-choice-a]:checked', '#addManualProduct').val();

          var sendData = "data=" + JSON.stringify(product);

          jQuery.support.cors = true;
          $.ajax({
              url: server,
              type: 'POST',
              dataType: 'jsonp',
              data: sendData,
              jsonpCallback: 'callbackme',
              contentType: 'application/json',
              mimeType: 'application/json',

              success: function (data) {
                  if (Search(product) == false) {
                      Add(getProduct());
                      if (data.success) {
                          window.location.href = "result.html?name=" + product.name + "&barcode=" + product.barcode + "&quantity=" + product.quantity + "&mediatype=" + product.mediatype;
                      }
                  } else {
                      alert("Product already exists");
                  }
              },
              error: function (data, status, er) {
                  console.log("error: " + data + " status: " + status + " er:" + er);
                  alert("Login Unsuccessful");
              }
          });
      }
  });