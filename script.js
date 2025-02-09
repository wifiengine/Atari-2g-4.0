//variables
var canvas = document.getElementById("canvas");
var draw = canvas.getContext("2d");
var mouseX = 100;
var mouseY;
var x;
var y;
var ballX = [231, 342];
var ballY = [123, 50];
var dx = 4;
var dy = 6;
var gameOverAlert;
var score = 0;
var counter = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//get mouse coordinates
window.addEventListener("mousemove", function (event) {
	mouseX = event.clientX;
	mouseY = event.clientY;
});

//resize canvas
window.onresize = function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function Ball (x, y, radius, color) {
	this.x = x,
	this.y = y,
	this.radius = radius,
	this.color = color,
	this.drawBall = function () {
		draw.beginPath();
		draw.fillStyle = this.color;
		draw.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		draw.fill();
		draw.closePath();
	}
}

//main game loop
function run () {

	counter += 1;

	draw.fillStyle = "rgba(0, 0, 0, 0.2)";
	draw.fillRect(0, 0, canvas.width, canvas.height);
	draw.fill();

	//score
	draw.beginPath();
	draw.fillStyle = "#ffffff";
	draw.font = "300px Arial";
	draw.fillText(score, canvas.width / 6, canvas.height / 1.5);
	draw.fill();

	//draw horizontal bars
	draw.beginPath();
	draw.fillStyle = "#E63131";
	draw.moveTo(x - 100, 0);
	draw.lineTo(x + 100, 0);
	draw.lineTo(x + 80, 20);
	draw.lineTo(x - 80, 20);
	draw.fill();
	draw.closePath();

	draw.beginPath();
	draw.fillStyle = "#E63131";
	draw.moveTo(x - 100, canvas.height)
	draw.lineTo(x + 100, canvas.height);
	draw.lineTo(x + 80, canvas.height - 20);
	draw.lineTo(x - 80, canvas.height - 20);
	draw.fill();
	draw.closePath();

	//draw vertical lines
	draw.beginPath();
	draw.fillStyle = "#00F976";
	draw.moveTo(0, y - 100);
	draw.lineTo(0, y + 100);
	draw.lineTo(20, y + 80);
	draw.lineTo(20, y - 80);
	draw.fill();
	draw.closePath();

	draw.beginPath();
	draw.fillStyle = "#00F976";
	draw.moveTo(canvas.width, y - 100);
	draw.lineTo(canvas.width, y + 100);
	draw.lineTo(canvas.width - 20, y + 80);
	draw.lineTo(canvas.width - 20, y - 80);
	draw.fill();
	draw.closePath();

	//defining x position and preventing bars from going over the sides
	if (mouseX < 100) {
		x = 100;
	}
	else if (mouseX > canvas.width - 100) {
		x = canvas.width - 100;
	}
	else {
		x = mouseX;
	}


	//defining y position and preventing bars from going over the top and bottom
	if (mouseY < 100) {
		y = 100;
	}
	else if (mouseY > canvas.height - 100) {
		y = canvas.height - 100;
	}
	else {
		y = mouseY;
	}


	var a  = new Ball(ballX[0], ballY[0], 20, "#00BD9C").drawBall();
	

/*	if (counter > 1000) {
		var b  = new Ball(ballX[1], ballY[1], 20, "#FF3700").drawBall();	

		ballX[1] += dx;
		ballY[1] += dy;

	}
*/

		ballX[0] += dx;
		ballY[0] += dy;



	//collision detection
	for (var i = 0; i < ballX.length; i++) {
		if (ballX[i] > mouseX - 100 && ballX[i] < mouseX + 100) {
			if (ballY[i] - 20 < 20 && ballY[i] - 20 > 0 || ballY[i] + 20 > canvas.height - 20 && ballY[i] + 20 < canvas.height) {
				dy = -dy;
				score += 1;
			}
		}
	}

	for (var i = 0; i < ballY.length; i++) {
		if (ballY[i] > mouseY - 100 && ballY[i] < mouseY + 100) {
			if (ballX[i] - 20 < 20 && ballX[i] - 20 > 0 || ballX[i] + 20 > canvas.width - 20 && ballX[i] + 20 < canvas.width) {
				dx = -dx;
				score += 1;
			}
		}
	}



/*	//game over
	for (var i = 0; i < ballX.length; i++) {
		if (ballX[i] < 0 || ballX[i] > canvas.width || ballY[i] < 0 || ballY[i] > canvas.height) {
			gameOverAlert = alert("Game over \n Final score: " + score);
			location.reload();
		}	
	}
*/


}
setInterval(run, 10);