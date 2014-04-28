/**
 * LocalStorage.js
 *
 */
$(document).ready(function () {

    function allStorage() {
        var archive = [],
            keys = Object.keys(localStorage);
            console.log(keys.toString());
            i = 0;

        for (var i ; i < keys.length; i++) {
            archive.push(localStorage.getItem(keys[i]));
        }
        return archive;
    }

    //console.log(allStorage().toString());
    var archive = allStorage();
    $('#result').html('<br/>Key Storage Size : <strong>' + archive.length + '</strong>');


    for (var j = 0; j < archive.length-1; j++) {
        var currentID;
        try{
            var object = JSON.parse(archive[j]);
            currentID=  parseInt(object.id,10);
        }catch(error){
            currentID = 0;
        }

        if(object.id >0){
            $('#result').append('<br/><strong>' + object.id.toString() 
                + '</strong> : <pre>' + object.name.toString() + '</pre>');
        }
    }

});