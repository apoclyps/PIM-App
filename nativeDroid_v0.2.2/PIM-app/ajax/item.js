//var url = 'http://192.168.0.17:8080/PIM-Server/comicvine?callback=?';

$( document ).ready(function() {
console.log( "Document ready : item.js");
//$.mobile.loading('show')




				var localData = JSON.parse(localStorage.getItem("796"));
		        
		        // Displaying Data if it exists
		        if(localData==null){
		        	alert("Value is null");
		        }else{
		        	//alert(localData.toString());
		        	alert("Accessed from LocalStorage : "+localData.id);
		        }

});