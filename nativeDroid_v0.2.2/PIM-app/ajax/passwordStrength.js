$(window).load(function () {
    $('#password').keyup(function () {
            
    var textValue = $(this).val();
    var result = zxcvbn(textValue);

    var currentScore = result.score;
    var imageFile = null;

    var passwordStrength = null;
    if (currentScore == 0) {
        imageFile = "insecure.png";
        passwordStrength = "Insecure";
    } else if (currentScore == 1) {
        imageFile = "warning.png";
        passwordStrength ="Weak"
    } else if(currentScore == 2){
        imageFile = "warning.png";
        passwordStrength ="Average"
    }else if (currentScore == 3) {
        imageFile = "secure.png";
        passwordStrength ="Strong"
    }else if (currentScore >= 4) {
        imageFile = "secure.png";
        passwordStrength ="Secure"
    }
    $('#result').html('Password Strengh : '+passwordStrength);
    var injectHTML = "<p><img src='images/"+imageFile+"'></img></p>";
    document.getElementById("strength").innerHTML = injectHTML;
    }); 
}); 