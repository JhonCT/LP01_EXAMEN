function producto(nombre, cantidad, precio){
	this.nombre = nombre;
	this.cantidad = cantidad;
	this.precio = precio;
}

var tabla = document.getElementById("productos");
var pr = document.getElementById("precio-pro");
var stock = document.getElementById("stock-pro");
var productos = [];
var a;
var option = document.getElementsByTagName("option");

function agregar(){		
	var pro = document.getElementById("info-producto");
	pro.style.display = "block";
	
	var nom = document.getElementById("nombre-pro");
	nom.value = obtenerProducto();
	document.getElementById("nombre-pro").setAttribute("disabled", null);
	var can = document.getElementById("cantidad-pro").value = 0;
	document.getElementById("precio-pro").value = 0;
	stock.setAttribute("disabled", null);	

	switch (nom.value) {
		case "Arroz":			
			stock.value = 50;		
			break;
		case "Azucar":
			stock.value = 30;
			break;
		case "Carne":
			stock.value = 40;
			break;
		default:
			alert("No hay productos");			
			break;
	}	
}	

function precio(){
	var nom = document.getElementById("nombre-pro");
	var can = document.getElementById("cantidad-pro").value;		
	switch (nom.value) {
		case "Arroz":
			pr.value = 3.5 * can;
			stock.value = 50 - can;				
			break;
		case "Azucar":
			pr.value = 2.9 * can;			
			stock.value = 30 - can;
			break;
		case "Carne":
			pr.value = 5.2 * can;			
			stock.value = 40 - can;
			break;
		default:
			alert("Eliga el producto");
			break;
	}	
}

function registrar(){	
	var nom = document.getElementById("nombre-pro").value;
	var can = document.getElementById("cantidad-pro").value;
	var pre = document.getElementById("precio-pro").value;
	var sto = document.getElementById("stock-pro").value;

	a = new producto(nom,can,pre,sto);

	productos.push(a);

	document.getElementById("info-producto").style.display = 'none';
	document.getElementById("produc").value = "";

	listar();
	limpiar();
	total();	

}

function listar(){	
	var data = "";
	if (productos.length > 0) {
		for (var i = 0; i < productos.length; i++) {
		data += '<tr>';
  		data += '<td>' + productos[i].nombre + '</td>';
  		data += '<td>' + productos[i].cantidad + '</td>';
  		data += '<td>' + productos[i].precio + '</td>';
  		data += '<td><button onclick="editar(' + i + ')">Editar</button>'; 
  		data += '<button onclick="eliminar(' + i + ')">Eliminar</button></td>';
  		data += '</tr>';  		
		}
	}
	return tabla.innerHTML = data;	 
}
function obtenerProducto(){
  	var producto = document.getElementById("produc");
  	var option = document.getElementsByTagName("option");
  	
  	if (option[producto.value] != null) {
  		option[producto.value].setAttribute("disabled","");
  		return(option[producto.value].innerHTML);
  	} else {
  		return false;
  	}
}

function editar(item){
	document.getElementById("info-producto").style.display = 'block';
	var nom = document.getElementById("nombre-pro");
	nom.value = this.productos[item].nombre;
	nom.setAttribute("disabled", null);

	var can = document.getElementById("cantidad-pro");
	can.value = this.productos[item].cantidad;

	var pre = document.getElementById("precio-pro");
	pre.value = this.productos[item].precio;

	var button = document.getElementById("btn-guardar");	
	button.innerHTML = "Guardar";

	button.onclick = function guardar(){
		var a = new producto(nom.value, can.value, pre.value);
		if (a) {
			productos.splice(item, 1, a);
			document.getElementById("info-producto").style.display = 'none';
			listar();
			limpiar();
			button.innerHTML = "Agregar";
			button.setAttribute("onclick", "registrar();");
		} else {
			alert("no");
		}
	}
}

function eliminar(producto){
	productos.splice(producto, 1);
	option[producto + 1].removeAttribute("disabled");
	listar();
}

function limpiar(){
	document.getElementById("nombre-pro").value = "";
	document.getElementById("cantidad-pro").value = "";
	document.getElementById("precio-pro").value = "";
	document.getElementById("stock-pro").value = "";

}

function total(){
	var subtotal = document.getElementById("subtotal");
	var sub = 0.0;

	for (var i = 0; i < tabla.rows.length; i++) {
		sub += parseFloat(tabla.rows[i].getElementsByTagName("td")[2].innerHTML);
	}

	subtotal.value = sub;

	document.getElementById("igv").value = 18;
	
	var total = document.getElementById("total");
	var igv = sub * 0.18;
	var totalPrecio = 0.0;	
	totalPrecio += sub + igv;

	total.value = totalPrecio.toFixed(2);
}


