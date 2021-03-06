/**
 * Login.js
 *
 */
$(document).ready(function () {

    var server = getConnection();

    $('#login').submit(function () {
        sendAjax();
        return false;
    });

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

        var externalServer = 'http://' + ip + ':8080/PIM-Server/login';
        var localServer = "http://127.0.0.1:8080/PIM-Server/login";

        var server = null;
        if (getServer() == "localServer") {
            server = localServer;
        } else {
            server = externalServer;
        }
        return server;
    }

    function encryptPassword(login) {
        // Get details to generate Salt
        console.log("Password inside :" + login.password.toString());
        var username = login.username;
        var secret_key = "Ivnwnhu$2015";
        var salt = username + secret_key;
        var password = login.password;

        //Encryt password over 100 generations
        var key512Bits100Iterations = CryptoJS.PBKDF2(password, salt, {
            keySize: 512 / 32
        });
        console.log("100 Iteration Key " + key512Bits100Iterations.toString());
        login.password = key512Bits100Iterations.toString();
        login.encrypted = true;
        return login;
    };

    function sendAjax() {

        // get inputs
        var login = new Object();
        login.username = $('#username').val();
        login.password = $('#password').val();

        console.log("Password " + login.password.toString());

        var encrypted = {};
        encrypted = encryptPassword(login);
        console.log("Encryption : " + encrypted.password.toString());

        // Building the JSON data to be sent
        var sendData = "data=" + JSON.stringify(encrypted);

        jQuery.support.cors = true;
        $.ajax({
            url: server,
            type: 'POST',
            dataType: 'jsonp',
            data: sendData,
            jsonpCallback: 'callback',
            contentType: 'application/json',
            mimeType: 'application/json',

            success: function (data) {
                alert(data.success);
                console.log(data.username);
                if (data.success) {
                    window.location.href = "index.html";
                }
            },
            error: function (data, status, er) {
                console.log("error: " + data + " status: " + status + " er:" + er);
                alert("Login Unsuccessful");
            }
        });
    }
});