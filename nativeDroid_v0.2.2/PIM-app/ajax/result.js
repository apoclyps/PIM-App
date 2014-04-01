$( document ).ready(function() {
console.log( "ready!" );




$.urlParam = function(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

var name = decodeURIComponent($.urlParam('name'));
var barcode = decodeURIComponent($.urlParam('barcode'));
var quantity = decodeURIComponent($.urlParam('quantity'))
var mediatype = decodeURIComponent($.urlParam('mediatype'))

console.log(name); 
console.log(barcode);  
console.log(quantity);  
console.log(mediatype);  

$('input#productName').val(name);
$('input#productBarcode').val(barcode);
$('input#productQuantity').val(quantity);
$('input#productMediaType').val(mediatype);
$('input#productName').listview('refresh');

});

