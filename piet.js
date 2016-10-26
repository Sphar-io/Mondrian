//initialize canvas
var a_canvas = document.getElementById("a");
var ctx = a_canvas.getContext("2d");
a_canvas.width = Math.floor(.80*window.innerHeight);
a_canvas.height = Math.floor(.80*window.innerHeight);

//initialize colors
var Blue = "rgb(65, 131, 215)";
var Red = "rgb(242, 38, 19)";
var Yellow = "rgb(247, 202, 24)";
var canvas = "#FFF8F0";
var Black = "rgb(45, 45, 45)";

//initialize
var xLocs =[];
var yLocs = [[]];
var rects = [[]];

function makeRects(){
	var c = 0;

	//insert start and end points to make calculations more general
	xLocs.splice(0,0,-100);
	xLocs.splice(xLocs.length,0,1100);
	yLocs.splice(0,0,-100);
	yLocs.splice(xLocs.length,0,1100);
	for(var i = 1; i < xLocs.length; i++){ //loops through vert lines
		for(var j = 0; j < yLocs.length; j++){
		 	//loops through horz lines
			var jEnd = j+1;
			for(var x=0; x< yLocs.length; x++){
				if(Math.random() < (1/6)){
					jEnd++;
				} //rectangle ending math
			}
			if (!rects[c]) {
			    rects[c] = [];
			}
			if(j==0){ //case 1 and 2
				rects[c][0] = xLocs[i-1]; //
				rects[c][1] = yLocs[0];
				rects[c][2] = xLocs[i]; //
				rects[c][3] = yLocs[0];
				rects[c][4] = xLocs[i-1]; // 
				rects[c][5] = yLocs[jEnd];
				rects[c][6] = xLocs[i]; //
				rects[c][7] = yLocs[jEnd];
				c++;
			}
			else{ //not first 
				rects[c][0] = xLocs[i-1]; //
				rects[c][1] = yLocs[j];
				rects[c][2] = xLocs[i]; //
				rects[c][3] = yLocs[j];
				rects[c][4] = xLocs[i-1]; // 
				rects[c][5] = yLocs[jEnd];
				rects[c][6] = xLocs[i]; //
				rects[c][7] = yLocs[jEnd];
				c++;					
			}
			j = j+(jEnd-(j+1));

		}
		
	}
}

function lineSize(){
	return Math.floor(20+(Math.random()*10));
}

function numLines(){
	return Math.floor(3+(Math.random()*10)/3);
}

function vertLines(){
	var lines = numLines();
	for(var i=0; i<lines; i++){
		var point = ((i*(1000/lines))+(Math.random()*1000+1)/3.3);
		point = (Math.min(1000, Math.max(0, point)));
		xLocs[i]=point;
	}
}

function horzLines(){
	var lines = numLines();
	for(var i=0; i<lines; i++){
		var side = Math.random();
		var point = ((i*(1000/lines))+(Math.random()*1000+1)/3.3);
		point = (Math.min(1000, Math.max(0, point)));
		yLocs[i]=point;
	}
}

function drawRects(){
	//goes through each rectangle
	for(var i = 0; i < rects.length; i++){
		//choice what color a square is
		if(Math.random() < (1/2.5)){
			var colorChoice = 1+Math.random()*100
			if(colorChoice > 75) ctx.fillStyle = Black;  
			else if(colorChoice > 50) ctx.fillStyle = Blue;
			else if(colorChoice > 25) ctx.fillStyle = Yellow;
			else ctx.fillStyle = Red;
		}else{
			ctx.fillStyle = canvas;
		}
		//pull out single rectangle array: 0-7 is (x,y) for each point in rectangle
		var curRect = rects[i];
		ctx.lineWidth = lineSize();
		ctx.beginPath();
		ctx.rect(curRect[0],curRect[1],curRect[2]-curRect[0],curRect[5]-curRect[1]);
		ctx.fill();
		ctx.stroke();
	}
}

function createArt(){
	ctx.fillStyle = canvas;
	ctx.fillRect(0,0,1000,1000);
	vertLines();
	horzLines();
	makeRects();
	drawRects();
}

createArt();