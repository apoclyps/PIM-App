$(document).ready(function () {

function allStorage(){

    var archive = [],
        keys = Object.keys(localStorage),
        i = 0;

    for (; i < keys.length; i++) {
        archive.push( localStorage.getItem(keys[i]) );
    }

    return archive;
}

	console.log(allStorage().toString());
	
	var archive = allStorage();
	
	$('#result').html('<br/>Key Storage Size : <strong>'+archive.length+'</strong>');
	
	
	for(var i =0; i < archive.length; i++){
	
	var object = JSON.parse(archive[i]);
		$('#result').append('<br/><strong>'+object.id.toString()+'</strong> : <pre>'+object.name.toString()+'</pre>');
	}



});