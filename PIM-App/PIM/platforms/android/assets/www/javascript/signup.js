$(document).ready(function() {
		//Stops the submit request
		$("#myAjaxRequestForm").submit(function(e){
			   e.preventDefault();
		});
		
		//checks for the button click event
		$("#myButton").click(function(e){
			
				document.getElementById("modal").style.display="block";

				//get the form data and then serialize that
				dataString = $("#myAjaxRequestForm").serialize();

				//make the AJAX request, dataType is set to json
				//meaning we are expecting JSON data in response from the server
				$.ajax({
					type: "POST",
					url: "http://192.168.137.1:8080/RhieHorn/SignUp",
					data: dataString,
					dataType: 'jsonp',
					jsonp: 'callback',
					jsonpCallback: 'jsonpCallback',
					 
					//if received a response from the server
					success: function( data, textStatus, jqXHR) {
						//our country code was correct so we have some information to display
						 if(data.success){

								$("#ajaxResponseSignup").html("");
								$("#ajaxResponseSignup").append("<b>Sign Up:</b> " + data.success + "\n<br><br>");
								$("#ajaxResponseSignup").append("<b>Email:</b> " + data.userInfo.email + "\n<br>");
								$("#ajaxResponseSignup").append("<b>Password :</b> " + data.userInfo.password + "\n<br>");
								$("#ajaxResponseSignup").append("<b>Password Confirmation:</b> " + data.userInfo.passwordConfirmation + "\n<br>");

								$("#ajaxResponseSignup").append("<b>Title :</b> " + data.userInfo.title + "\n<br>");
								$("#ajaxResponseSignup").append("<b>First Name :</b> " + data.userInfo.firstname + "\n<br>");
								$("#ajaxResponseSignup").append("<b>Surname :</b> " + data.userInfo.surname + "\n<br>");
								$("#ajaxResponseSignup").append("<b>Postcode :</b> " + data.userInfo.postcode + "\n<br>");

								$("#ajaxResponseSignup").append("<b> DataString :</b> " + dataString.toString() + "\n");		
							 
							 
							 
							 
							 alert(data.success);
			
							 // Redirect to Main Menu
							// window.location.replace("menu.html");
			
						 }
						 //display error message
						 else {
							 alert("Fail");
							 
							 $("#ajaxResponseSignup").html("<div><b>Signup failed</b></div>");
						 }
					},
					 
					//If there was no resonse from the server
					error: function(jqXHR, textStatus, errorThrown){
						 console.log("Something really bad happened " + textStatus);
						  $("#ajaxResponseSignup").html(jqXHR.responseText);
					},
					 
					//capture the request before it was sent to server
					beforeSend: function(jqXHR, settings){
						//disable the button until we get the response
						$('#myButton').attr("disabled", true);
					},
					 
					//this is called after the response or error functions are finsihed
					//so that we can take some action
					complete: function(jqXHR, textStatus){
						//enable the button
						$('#myButton').attr("disabled", false);
						document.getElementById("modal").style.display="none";
						
					}
		 
				});        
		});
		 
		function jsonpCallback(data) {
			console.log("callback",data);
			//do nothing   
		}

	 
	});