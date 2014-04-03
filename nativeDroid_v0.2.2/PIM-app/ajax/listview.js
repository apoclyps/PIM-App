//var url = 'http://192.168.0.17:8080/PIM-Server/comicvine?callback=?';

$( document ).ready(function() {
//console.log( "Document ready : listview.js");
//$.mobile.loading('show')

	//var url = 'http://127.0.0.1:8080/PIM-Server/comicvine?callback=?';
	var url = 'http://137.117.146.199:8080/PIM-Server/comicvine?callback=?&query=batman';
	$.ajax({
		type: 'GET',
		url: url,
		async: false,
		jsonpCallback: 'comicvine',
		contentType: "application/json",
		dataType: 'jsonp',
		success: function (data) {

			for (var i in data.COMICVINE) {
				var appendString = '<li id="'+data.COMICVINE[i].id+'"><a href="item.html?id='+data.COMICVINE[i].id+'">'+
					'<img src="'+data.COMICVINE[i].image.thumb_url+'">'+
					'<h2>'+data.COMICVINE[i].name+'</h2>'+
					'<p style="padding-top:-20px">'+data.COMICVINE[i].last_issue.name+'</p>'+
					'<p class="ui-li-aside"><strong>'+data.COMICVINE[i].count_of_issues+'</strong> Issues</p>'+
				'</a></li>';
				$("#comicview").append(appendString);
				$('#comicview').listview('refresh');
			}
			

// TEST


				//Creating a datastore for ComicvineData
				var dataToStore = JSON.stringify(data.COMICVINE[0]);
				// Storing data in localstorage 
		        window.localStorage.setItem(data.COMICVINE[0].id, dataToStore);
		  
		        var key = data.COMICVINE[0].id;
		        var localData = JSON.parse(localStorage.getItem(key));
		        
		        // Displaying Data if it exists
		        if(localData==null){
		        	alert("Value is null");
		        }else{
		        	//alert(localData.toString());
		        	alert("Accessed from LocalStorage : "+localData.id);
		        }
		  
		        // localStorage is now empty
		        //window.localStorage.clear();

			
			$('#comicview').listview('refresh');
			//console.log("Request Complete : Comic Vine Volume");
			//$.mobile.loading('hide')
		},
		error: function (e) {
			console.log(e.message);
		}
	});


//SQL LITE	
    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        //var db = window.openDatabase("Database", "1.0", "PIM", 200000);
		//db.transaction(createDB, errorCB, successCB);
       // db.transaction(populateDB, errorCB, successCB);
		//db.transaction(queryDB, errorCB);
    }

    // Populate the database
    //

    function createDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS COMICS');
        tx.executeSql('CREATE TABLE IF NOT EXISTS COMICS (id unique, data)');
    }	
	
    function populateDB(tx) {
        tx.executeSql('INSERT INTO COMICS (id, data) VALUES (1, "First row")');
        tx.executeSql('INSERT INTO COMICS (id, data) VALUES (2, "Second row")');
		//alert(tx.executeSql('SELECT count(*) FROM COMICS'));
    }

    // Transaction error callback
    //
    function errorCB(tx, err) {
        alert("Error processing SQL: "+err);
    }

    // Transaction success callback
    //
    function successCB() {
        alert("success!");
    }
	
	function queryDB(tx) {
    tx.executeSql('SELECT * FROM COMICS', [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
    alert("Returned rows = " + results.rows.length);
    // this will be true since it was a select statement and so rowsAffected was 0
    if (!results.rowsAffected) {
        alert('No rows affected!');
        return false;
    }
    // for an insert statement, this property will return the ID of the last inserted row
    alert("Last inserted row ID = " + results.rows.item(0).id);
}

function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}


});