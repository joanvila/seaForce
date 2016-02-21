// Store frame for motion functions
var previousFrame = null;

// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

var position = window.innerWidth;

var acceleration = 5;
var points = 0;

var checkCounter = 0;
var lastTrueCheck = 0;

var randomX = getRandomArbitrary(300, 1000);
var randomY = getRandomArbitrary(-550, 30);

var started = false;
var finished = false;

// to use HMD mode:
// controllerOptions.optimizeHMD = true;

Leap.loop(controllerOptions, function(frame) {
    if (checkCounter === 1000) {
        checkCounter = 0;
        lastTrueCheck = 0;
    }
    ++checkCounter;
    // Display Hand object data
    if (frame.hands.length > 0) {
        if (!started) {
            started = true;
            $("#presentation").hide();
            $("#game").show();
        }
        if (!finished) {
            ++points;
            $("#points").text(points);
        }
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
                finished = true;
        	}
        }

        //Check for tortoise
        var check1 = false;
        var check2 = false;

        if (x < randomX + 20 && x > randomX - 20) check1 = true;
        if (y < randomY + 20 && y > randomY - 20) check2 = true;

        if (check1 && check2) {
            if (!(lastTrueCheck > checkCounter - 30)) {
                randomX = 5000;
                randomY = 5000;
                $("#dogFood").hide();
                $("#square").animate({width:'75px', height: '75px', backgroundSize: '75px'}, 100, "linear", function() {
                    $("#square").animate({width:'50px', height: '50px', backgroundSize: '50px'}, 100, "linear");
                });
                lastTrueCheck = checkCounter;
                acceleration -= 4;
                if (acceleration <= 0) acceleration = 1;
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

function renderFood(x, y) {
    $("#dogFood").show();
    $("#dogFood").css({left:x,top:-y});
}

$(document).ready(function() {
    window.setInterval(function(){
        if (started && !finished)
    	   acceleration += 1;
    }, 4000);

    window.setInterval(function(){
        if (started && !finished) {
            randomX = getRandomArbitrary(300, 1000);
            randomY = getRandomArbitrary(-550, 30);
            renderFood(randomX, randomY);
        }
    }, 20000);
});
