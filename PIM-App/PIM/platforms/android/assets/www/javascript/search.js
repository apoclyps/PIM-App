$(document).ready(function() {
		//Stops the submit request
		$("#searchAjaxRequest").submit(function(e){
			   e.preventDefault();
		});
		
		//checks for the button click event
		$("#searchBtn").click(function(e){
			
				document.getElementById("modal").style.display="block";

				//get the form data and then serialize that
				dataString = $("#searchAjaxRequest").serialize();

				//make the AJAX request, dataType is set to json
				//meaning we are expecting JSON data in response from the server
				$.ajax({
					type: "POST",
					url: "http://192.168.137.1:8080/RhieHorn/JobSearchController/getJobs",
					data: dataString,
					dataType: 'jsonp',
					jsonp: 'callback',
					jsonpCallback: 'jsonpCallback',
					 
					//if received a response from the server
					success: function( data, textStatus, jqXHR) {
						//our country code was correct so we have some information to display
						 if(data.success){

							 //alert("success here");
							 
							 $("#ajaxResponseList").html("");
							 							 
							 
							 $.each(data.results, function(index,value) {
								 $("#ajaxResponseList").append('<li id="result' + index + '"style="color:white;border-bottom:solid 1px white"><a href="details.html" rel="external" style="text-decoration:none"><font style="color:white"><h3>Title: ' + data.results[index].title + '</h3><p class="topic"><strong>Company: ' + data.results[index].advertiserName + '</strong></p><p>Yearly Minimum Salary: £' + data.results[index].salaryMinYearly + '</p></font></a></li>');								 								 
							 });
							 
							 //$("#ajaxResponseSearch").append("<b> DataString :</b> " + dataString.toString() + "\n");
								
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
		});
		 
		function jsonpCallback(data) {
			console.log("callback",data);
			//do nothing   
		}

		
	 
	});
