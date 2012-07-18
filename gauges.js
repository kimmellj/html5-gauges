var a_canvas = document.getElementById("a");
var a_context = a_canvas.getContext("2d");

var b_canvas = document.getElementById("b");
var b_context = b_canvas.getContext("2d");

var c_canvas = document.getElementById("c");
var c_context = c_canvas.getContext("2d");

var d_canvas = document.getElementById("d");
var d_context = d_canvas.getContext("2d");

var e_canvas = document.getElementById("e");
var e_context = e_canvas.getContext("2d");

var f_canvas = document.getElementById("f");
var f_context = f_canvas.getContext("2d");

var needleWidth = 5; // Width of the Gauge Needles
var ninety = Math.PI / 2; // Ninety Degrees
var threesixtey = Math.PI * 2; // 360 Degrees

/** 
 * The angles of each individual gauge
 */
var a = 0;
var b = ninety;
var c = ninety * 2;
var d = ninety * 2;
var e = ninety * 2;
var f = ninety * 2;

/** 
 * Redraw this function gets called to redraw a gauge, it then 
 * calls itself after updating the needle angle
 * 
 * @param x x orign coordinate for the gauge
 * @param y y orign coordinate for the gauge
 * @param radius how wide is the gague
 * @param context context of the drawing canvas
 * @param angle angle of the needle to be drawn
 */
function redraw(x, y, radius, context, angle) {
	var halfRadius = radius / 2;

	if (angle > threesixtey) {
		angle = 0;
	}

	context.clearRect(0, 0, 800, 800);

	//Create the Background
	drawCircle(x, y, radius, context);

	//Apex of the Triangle
	var px = x + radius * Math.cos(angle);
	var py = y + radius * Math.sin(angle);

	//Left corner of the Triangle 
	var lx = x + needleWidth * Math.cos((angle + ninety));
	var ly = y + needleWidth * Math.sin((angle + ninety));

	//Right corner of the Triangle
	var rx = x + needleWidth * Math.cos((angle - ninety));
	var ry = y + needleWidth * Math.sin((angle - ninety));

	//Draw the Triangle
	context.beginPath();
	context.lineWidth = 1;
	context.moveTo(px, py); // Top Corner
	context.lineTo(lx, ly); // Left Corner
	context.lineTo(rx, ry); // Right Corner
	context.lineTo(px, py); // Complete the Triangle
	context.closePath();

	context.strokeStyle = "#FF8300";
	context.stroke();

	context.shadowBlur = 20;
	context.shadowColor = "#FFF";
	context.fillStyle = "#FF8300";
	context.fill();

	angle += .1;

	setTimeout(function() {
		redraw(x, y, radius, context, angle);
	}, 20);
}

/** 
 * Draw a circle this is used to draw the background of the gauges
 * 
 * @param x x orign coordinate for the gauge
 * @param y y orign coordinate for the gauge
 * @param radius how wide is the gague
 * @param context context of the drawing canvas
 */
function drawCircle(x, y, radius, context) {
	/** 
	 * Setup
	 */
	context.strokeStyle = "#000";
	context.shadowBlur = 10;
	context.shadowColor = "#00A1FF";
	context.fillStyle = "#FF8300";
	
	var gradient = b_context.createLinearGradient(0, 0, 400, 400);
	gradient.addColorStop(0, "#0068A6");
	gradient.addColorStop(1, "#00A1FF");	
	
	context.fillStyle = gradient;

	/** 
	 * Create the Border of the Circle
	 */
	context.beginPath();
	context.arc(x, y, radius, 0, Math.PI * 2, false);
	context.closePath();

	context.stroke();
	context.fill();
	
	/** 
	 * Create the The Inner dot of the circle
	 */
	context.beginPath();
	context.arc(x, y, 2, 0, Math.PI * 2, false);
	context.closePath();

	context.stroke();
	
}

redraw(210, 210, 200, a_context, a);
redraw(210, 210, 200, b_context, b);
redraw(60, 60, 50, c_context, c);
redraw(60, 60, 50, d_context, d);
redraw(60, 60, 50, e_context, e);
redraw(60, 60, 50, f_context, f);
