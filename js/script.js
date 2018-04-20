function iframe(){
		document.getElementById('container').innerHTML = "";
		var div = document.createElement("iframe");
		div.src = "view/principal.html"
		div.style.width = '90%';
		div.style.height = '820px';
		div.style.marginLeft = '5%';
		document.getElementById('container').appendChild(div);
}

