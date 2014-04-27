$(document).ready(function() {
		//Stops the submit request
		/*$("#searchAjaxRequest").submit(function(e){
			   e.preventDefault();
		});
		
		//checks for the button click event
		$("#searchBtn").click(function(e){*/
			
				document.getElementById("modal").style.display="block";

				//get the form data and then serialize that
				dataString = $("#searchAjaxRequest").serialize();

				//make the AJAX request, dataType is set to json
				//meaning we are expecting JSON data in response from the server
				$.ajax({
					type: "POST",
					url: "http://192.168.137.1:8080/RhieHorn/JobSearchController/getJobs?title=clean&location=dundee&callback=jsonpCallback",
					data: dataString,
					dataType: 'jsonp',
					jsonp: 'callback',
					jsonpCallback: 'jsonpCallback',
					 
					//if received a response from the server
					success: function( data, textStatus, jqXHR) {
						//our country code was correct so we have some information to display
						 if(data.success){
							 						 
							 $("#descriptionContent").html("");
							 							 
							 
							 $("#descriptionContent").append('<font style="color:white"><h3>Title: ' + data.results[0].title + '</h3><br /><p class="topic"><strong>Company: ' + data.results[0].advertiserName + '</strong></p><br /><p>Yearly Minimum Salary: £' + data.results[0].salaryMinYearly + '</p><br /><p>Salary Period: ' + data.results[0].salaryPeriod + '</p><br /><p>Date Posted: ' + data.results[0].dateFound + '</p><br /><p>Source: ' + data.results[0].jobBoard + '</p></font>');
							 							 			
						 }
						 //display error message
						 else {
							 alert("fail");		
							 
							 $("#ajaxResponseSearch").html("<div><b>Search failed</b></div>");
						 }
					},
					 
					//If there was no response from the server
					error: function(jqXHR, textStatus, errorThrown){
						 console.log("Something really bad happened " + textStatus);
						  $("#ajaxResponseSearch").html(jqXHR.responseText);
					},
					 
					//capture the request before it was sent to server
					beforeSend: function(jqXHR, settings){
						//disable the button until we get the response
						$('#searchBtn').attr("disabled", true);
					},
					 
					//this is called after the response or error functions are finished
					//so that we can take some action
					complete: function(jqXHR, textStatus){
						//enable the button
						$('#searchBtn').attr("disabled", false);
						document.getElementById("modal").style.display="none";
						
					}
		 
			        
				});
		 
		function jsonpCallback(data) {
			console.log("callback",data);
			//do nothing   
		}

		
	 
	});