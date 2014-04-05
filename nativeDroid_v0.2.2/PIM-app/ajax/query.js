function getParameters(){
	
	var parameters = {};
	
	parameters.select = $('input[name=radio-choice-1]:checked').val();
	console.log("Selected : " +parameters.select);
	parameters.query = $('input[name=search]').val();
	console.log("Query : "+parameters.query);
	parameters.true = true;
	return parameters;
};

function objectToURLParameters(obj){
	var str = "";
	for (var key in obj) {
		if (str != "") {
			str += "&";
		}
		str += key + "=" + obj[key];
	}
	return str;
};

function query(){
	var parameters = getParameters();
	var urlParameters=objectToURLParameters(parameters);
	console.log(urlParameters);

	if(parameters.true == true){
		console.log("Redirect to page here");
		//window.location.href = "listviews.html?";
	}else{
		console.log("Returned false");
	}
};



