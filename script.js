// Store frame for motion functions
var previousFrame = null;

// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

var position = 0;

// to use HMD mode:
// controllerOptions.optimizeHMD = true;

Leap.loop(controllerOptions, function(frame) {
    // Display Hand object data
    if (frame.hands.length > 0) {
        for (var i = 0; i < frame.hands.length; i++) {
            var hand = frame.hands[i];
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
            else position += 1;
            $("#square").css({left:x,top:-y});
            $("#wallTop").css({right:position});
            $("#wallBottom").css({right:position});
            var leftWall  = window.innerWidth - position-70;
            var rightWall = window.innerWidth - position;
            var topWall  = $("#wallBottom").offset().top + 150;
            var botWall = $("#wallBottom").offset().top;
            //console.log(topWall + ' ' + botWall + ' ' + y);
            //console.log(leftWall + ' ' + rightWall);
            if (x+25 >= leftWall && x <= rightWall+25) {
            	var posPeix = $("#square").offset().top + 25;
            	//console.log(topWall + ' ' + botWall + ' ' + posPeix);
            	if (posPeix + 25 >= botWall || posPeix + 25 <= topWall) {
            		alert("SUCH FAIL!!");
            		console.log(topWall + ' ' + botWall + ' ' + posPeix + ' ' + leftWall + ' ' + rightWall + ' ' + x);
            	}
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

    }, 1000);
});
