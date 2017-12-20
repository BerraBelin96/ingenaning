var socket = io();

socket.on('userMsg', function (msg) {
    console.log(msg);
});

var input = document.getElementById("msg");

input.addEventListener("keydown", function (event) {
    if(event.key === "Enter") {
    	socket.emit('chat', input.value);
    	input.value = "";
	}
});

socket.on('chat', function(msg) {
	var li = document.createElement("li");
	li.textContent = msg;
	document.getElementById("chat").appendChild(li);
});