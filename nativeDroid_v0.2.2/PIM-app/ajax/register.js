$('#register').submit(function () {
	if(validateForm()){
		registerUser();
	}
	return false;
});

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
  
  if(password!=passwordConfirmation){
	  alert("Passwords do not match!");
	  return false;
  }
  
  if(!(validateEmail(email))){
	  alert("Invalid Email Address");
	  return false;
  }
  return true;
}

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

function registerUser() {
 
	// get inputs
	var register = new Object();
	register.username = $('#username').val();
	register.password = $('#password').val();
	register.email = $('#email').val();

	var externalServer = "http://137.117.146.199:8080/PIM-Server/register";
	var localServer = "http://127.0.0.1:8080/PIM-Server/register";
	
	jQuery.support.cors = true;
	$.ajax({
		url: localServer,
		type: 'POST',
		dataType: 'jsonp',
		data: JSON.stringify(register),
		jsonpCallback: 'callback',
		contentType: 'application/json',
		mimeType: 'application/json',
		
		success: function (data) {
			alert(data.username);
			console.log(data.username);
			window.location.href = "index.html";
        },
		error:function(data,status,er) {
			console.log("error: "+data+" status: "+status+" er:"+er);
			alert("Register Unsuccessful");
		}
	});
}