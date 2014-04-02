// Validates form on submit before sending to server
$('#register').submit(function () {
	if(validateForm()){
		registerUser();
	}
	return false;
});

// Clears Username when a user selects no after selecting yes.
$("#usernameUnique").change(function(){
	alert("Enter Unique Email");
	var email = $('#email').val();
	$('input#username').val("");
	document.getElementById("username").disabled = false;
});

// Sets Username when a user selects yes after default no.
$("#usernameDuplicate").change(function(){
	alert("Username will match email");
	var email = $('#email').val();
	$('input#username').val(email);
	document.getElementById("username").disabled = true;
	
});

// Validates inputs for the form and displays alert messages if not valid.
function validateForm()
{
var username=document.forms["register"]["username"].value;
var password=document.forms["register"]["password"].value;
var passwordConfirmation =document.forms["register"]["passwordConfirmation"].value;
var email =document.forms["register"]["email"].value;

if (username==null || username=="")
  {
	  alert("Username must be filled out");
	  return false;
  }else if (email==null || email=="")
  {
	  alert("Email Address must be filled out");
	  return false;
  }else if (password==null || password=="")
  {
	  alert("Password must be filled out");
	  return false;
  } else if (passwordConfirmation==null || passwordConfirmation=="")
  {
	  alert("Confirmation password must be filled out");
	  return false;
  }
  
  if(password.length<=5){
	alert("Password is shorter than 6 charachters");
	return false;
  }
  // Ensuring passwords match
  if(password!=passwordConfirmation){
	  alert("Passwords do not match!");
	  return false;
  }
  // Ensuring the email address is valid
  if(!(validateEmail(email))){
	  alert("Invalid Email Address");
	  return false;
  }
  return true;
}

//Validates email addresses
function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

// Registers a user on the server
function registerUser() {
 
	// get inputs
	var register = new Object();
	register.username = $('#username').val();
	register.password = $('#password').val();
	register.email = $('#email').val();

	// For testing local / Remote server
	var externalServer = "http://137.117.146.199:8080/PIM-Server/register";
	var localServer = "http://127.0.0.1:8080/PIM-Server/register";
	
	// Building the JSON data to be sent
	var sendData = "data="+JSON.stringify(register);
	
	// Enabling cross domain requests.
	jQuery.support.cors = true;
	$.ajax({
		url: localServer,
		type: 'POST',
		dataType: 'jsonp',
		data: sendData,
		jsonpCallback: 'callback',
		contentType: 'application/json',
		mimeType: 'application/json',
		
		// Success redirects to home screen
		success: function (data) {
			alert("Login Attempt : "+data.success);
			console.log(data.username);
			if(data.success){
				window.location.href = "index.html";
			}else{
				alert(data.message);
			}
        },
		// Error returns to page with alert
		error:function(data,status,er) {
			console.log("error: "+data+" status: "+status+" er:"+er);
			alert("Register Unsuccessful");
		}
	});
}