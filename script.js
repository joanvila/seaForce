// Store frame for motion functions
var previousFrame = null;

// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

var position = window.innerWidth;

var acceleration = 5;
var points = 0;
// to use HMD mode:
// controllerOptions.optimizeHMD = true;

Leap.loop(controllerOptions, function(frame) {
    // Display Hand object data
    if (frame.hands.length > 0) {
		++points;
		$("#points").text(points);
        var hand = frame.hands[0];
        var x = hand.palmPosition[0];
        var y = hand.palmPosition[1];
        var rand = getRandomArbitrary(50,window.innerHeight - 150);
        x += 350;
        y -= 350;
        x *= 2;
        y *= 2;
        if (position >= window.innerWidth) {
        	position = 0;
        	$("#wallBottom").css({height:rand});
        	$("#wallTop").css({height:window.innerHeight - rand - 150});
        }
        else position += acceleration;
        $("#square").css({left:x,top:-y});
        $("#wallTop").css({right:position});
        $("#wallBottom").css({right:position});
        var leftWall  = window.innerWidth - position-70;
        var rightWall = window.innerWidth - position;
        var topWall  = parseInt($("#wallBottom").offset().top) - 150;
        var botWall = parseInt($("#wallBottom").offset().top);

        if (x+50 >= leftWall && x <= rightWall) {
        	var posPeix = parseInt($("#square").offset().top) + 25;
        	if (posPeix >= botWall-25 || posPeix <= topWall+25) {
        		$("#pointsDiv").hide();
        		$("#game").hide();
        		$("#endGame").show();
        		$("#finalPuntuation").text(points);
        	}
        }
    }

    // Store frame for motion functions
    previousFrame = frame;
})

function vectorToString(vector, digits) {
    if (typeof digits === "undefined") {
        digits = 1;
    }
    return "(" + vector[0].toFixed(digits) + ", "
    + vector[1].toFixed(digits) + ", "
    + vector[2].toFixed(digits) + ")";
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

$(document).ready(function() {
    window.setInterval(function(){
    	acceleration += 1;
    }, 4000);
});
