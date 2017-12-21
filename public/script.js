var socket = io();

var pID = Math.floor(Math.random()*1000);
console.log(pID);
//document.getElementById()

var paragraph = document.getElementById("pID");
var text = document.createTextNode("Your ID: "+pID);
paragraph.appendChild(text);

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

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

//ctx.fillStyle = "rgb(0,255,0)";
//ctx.font = "20px Arial";
//ctx.fillText("Welcome to ingenting!", 20, 40);

var r = 255;
var g = Math.random() * 256;
var b = Math.random() * 256;

var pColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);

function drawPlayer(x, y) {
	//ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.fillStyle = pColor;
	ctx.fillRect(x,y,10,10);
}

var x = Math.floor(Math.random() * 20 + 1)*10+20;
var y = Math.floor(Math.random() * 20 + 1)*10+20;

canvas.addEventListener("keydown", function (event) {
	console.log(event.key);
	/*if (event.key === "w") {
		y -= 10;
		drawPlayer(x, y);
	}*/
	switch (event.key){
		case "w":
			y -= 10;
			socket.emit('pMove', {x: x,y: y});
			ifWhite(x, y-0);
		break;
		case "s":
			y += 10;
			ifWhite(x, y+0);
			socket.emit('pMove', {x: x,y: y});
		break;
		case "a":
			x -= 10;
			ifWhite(x-0, y);
			socket.emit('pMove', {x: x,y: y});
		break;
		case "d":
			x += 10;
			ifWhite(x+0, y);
			socket.emit('pMove', {x: x,y: y});
		break;
	}
});

socket.on('pMove', function(move) {
	drawPlayer(move.x, move.y);
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function ifWhite(x, y) {
	//console.log('Taking a break...');
	//await sleep(2000);
	//console.log('Two second later');

	imageData = ctx.getImageData(x, y, 1, 1); //take away the .data
	//console.log(x);
	//console.log(y);
	//console.log("imageData "+imageData);
	//console.log(imageData.data.length);
	var r, g, b, a;

	for(var i = 0; i+3 < imageData.data.length; i+=4) {
	    r = imageData.data[i];
	    g = imageData.data[i+1];
	    b = imageData.data[i+2];
	    a = imageData.data[i+3];

	    if((r > 0 || g > 0 || b > 0)) { // if pixel is not black, and not transparent          
	        //imageData.data[i+3] = 0; //set alpha to 0
	        console.log("Crash!!");
	        var paragraph = document.getElementById("crash");
			var text = document.createTextNode("Crash!!");
			paragraph.appendChild(text);
	    }
	    //console.log(r+g+b+a);
	}
	//console.log(r+g+b+a);
}


