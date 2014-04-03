$('#result').submit(function () {
    addProduct();
    return false;
});

function addProduct() {

    // get inputs
    var result = new Object();
    login.username = $('#username').val();
    login.password = $('#password').val();
    login.mediaType = $('#mediaType').val();

    var externalServer = "http://137.117.146.199:8080/PIM-Server/register";
    var localServer = "http://127.0.0.1:8080/PIM-Server/product/add/" + login.mediaType;

    jQuery.support.cors = true;
    $.ajax({
        url: localServer,
        type: 'POST',
        dataType: 'jsonp',
        data: JSON.stringify(login),
        jsonpCallback: 'callback',
        contentType: 'application/json',
        mimeType: 'application/json',

        success: function (data) {
            alert(data.success);
            //console.log(data.username);
            if (data.success) {
                //window.location.href = "index.html";
            }
        },
        error: function (data, status, er) {
            console.log("error: " + data + " status: " + status + " er:" + er);
            alert("Login Unsuccessful");
        }
    });
}