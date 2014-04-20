

$(document).ready(function () {

	var operation = "A"; //"A"=Adding; "E"=Editing

	var selected_index = -1; //Index of the selected list item

	var tbProducts = window.localStorage.getItem("tbProducts");//Retrieve the stored data

	tbProducts = JSON.parse(tbProducts); //Converts string to object

	if(tbProducts == null) //If there is no data, initialize an empty array
		tbProducts = [];

	List();

	var buttonRef = document.getElementById("btnEmpty");
	buttonRef.onclick = function()
            {
               alert('Test');
               Empty();
            };

	function Empty(){
		for(var i =tbProducts.length-1; i >= 0; i--){
			console.log("Index : "+i);
			selected_index = i;
			Delete();
			List();
		}
	}


	//Purge();
	function getProduct(){
		var product = JSON.stringify({
			ID    : $("#txtID").val(),
			Name  : $("#txtName").val(),
			Barcode : $("#txtBarcode").val(),
			Quantity : $("#txtQuantity").val(),
			Type : 'product',
			AssociateID : '1'
		});
		return product;
	}

	function Add(product){
		tbProducts.push(product);
		window.localStorage.setItem("tbProducts", JSON.stringify(tbProducts));
		alert("The Product was saved.");
		return true;
	}

	function Search(query){
		for(var i in tbProducts){
			var product = JSON.parse(tbProducts[i]);
			if(product.Name==query){
				return product;
			}
		}
		return null;
	}

	function Edit(){
		tbProducts[selected_index] = getProduct();
		//Alter the selected item on the table
		window.localStorage.setItem("tbProducts", JSON.stringify(tbProducts));
		alert("The Product was edited.")
		operation = "A"; //Return to default value
		return true;
	}

	function Delete(){
		tbProducts.splice(selected_index, 1);
		window.localStorage.setItem("tbProducts", JSON.stringify(tbProducts));
		alert("Product deleted.");
	}

	function Purge(){
		window.localStorage.clear();
		alert("Purged");
	}

	function List(){		
		$("#tblList").html("");
		$("#tblList").html(
			"<thead>"+
			"	<tr>"+
			"	<th></th>"+
			"	<th>ID</th>"+
			"	<th>Volume Name</th>"+
			"	<th>Name</th>"+
			"	<th>Barcode</th>"+
			"	<th>Quantity</th>"+
			"	<th>Type</th>"+
			"	<th>AID</th>"+
			"	<th>Issue no</th>"+
			"	<th>JSON</th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);
		for(var i in tbProducts){
			var product = JSON.parse(tbProducts[i]);
			if(product.JSONItem==null){
				product.JSONItem = "";
			}
		  	$("#tblList tbody").append("<tr>"+
			 	 "	<td><img src='images/edit.png' alt='Edit"+i+"' class='btnEdit'/><img src='images/delete.png' alt='Delete"+i+"' class='btnDelete'/></td>" + 
				 "	<td>"+product.ID+"</td>" + 
				 "	<td>"+product.Vname+"</td>" + 
				 "	<td>"+product.Name+"</td>" + 
				 "	<td>"+product.Barcode+"</td>" + 
				 "	<td>"+product.Quantity+"</td>" + 
				 "	<td>"+product.Type+"</td>" + 
				 "	<td>"+product.AssociateID+"</td>" + 
				 "	<td>"+product.IssueNo+"</td>" + 
				 "	<td>"+product.JSONItem+"</td>" + 
					 "</tr>");
		}
	}

	$("#frmCadastre").bind("submit",function(){		
		if(operation == "A"){
			var product = getProduct();
			return Add(product);
		}
		else{
			var product = getProduct();
			return Edit();
		}
	});

	$(".btnEmpty").bind("click", function(){
		Empty();
	});

	$(".btnEdit").bind("click", function(){

		operation = "E";
		selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
		
		var product = JSON.parse(tbProducts[selected_index]);
		$("#txtID").val(product.ID);
		$("#txtName").val(product.Name);
		$("#txtBarcode").val(product.Barcode);
		$("#txtQuantity").val(product.Quantity);
		$("#txtID").attr("readonly","readonly");
		$("#txtName").focus();
	});

	$(".btnDelete").bind("click", function(){
		selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
		Delete();
		List();
	});
});