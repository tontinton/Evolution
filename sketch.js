var foods = [];
var foodsNum = 200;
var foodTimer;

var organisms = [];
var organismNum = 10;

var eggs = [];

function setup() {
	var canvas = createCanvas(1920, 700);
	canvas.parent('sketch-holder');
	noStroke();
	rectMode(CENTER);
	
	for(var i = 0; i < foodsNum; i++){
		foods.push(new Food());
	}
	for(var i = 0; i < organismNum; i++){
		var org = new Organism();
		org.lifeTimer.start(org.lifeTime);
		organisms.push(org);
	}
	
	foodTimer = new Timer();
	foodTimer.start(20);
}

update = function(){
	
	for(var i = organisms.length - 1; i >= 0; i--){
		organisms[i].update();
		checkOrganismTouchWithFood(i);
		organisms[i].checkHitWall();
		
		if(dist(mouseX, mouseY, organisms[i].x, organisms[i].y) < organisms[i].radius){
			organisms[i].pointedOn = true;
		}
		else{
			organisms[i].pointedOn = false;
		}
		
		if(organisms[i].layAnEgg){
			var egg = new Egg(organisms[i].x, organisms[i].y, organisms[i].vision, organisms[i].speed, organisms[i].radius);
			egg.timer.start(10);
			eggs.push(egg);
			organisms[i].layAnEgg = false;
		}
		
		if(organisms[i].checkDeath()){
			for(var j = 0; j < organisms[i].foodDigesting; j++){
				foods.push(new Food(organisms[i].x + random(-15, 15), organisms[i].y + random(-15, 15)));
			}
			organisms.splice(i, 1);
		}
		
	}
	
	for(var i = eggs.length - 1; i >= 0; i--){
		if(!eggs[i].timer.done()){
			eggs[i].timer.update();
		}
		else{
			var org = new Organism(eggs[i].x, eggs[i].y, eggs[i].vision, eggs[i].speed, eggs[i].radius);
			org.lifeTimer.start(org.lifeTime);
			organisms.push(org);
			eggs.splice(i, 1);
		}
	}
	
	foodTimer.update();
	if(foodTimer.done()){
		foods.push(new Food())
		foodTimer.start(20);
	}
}

function draw() {
	update();
	
	background(2, 58, 86);
	
	if(foods.length > 0){
		for(var i = 0; i < foods.length; i++){
			foods[i].show();
		}
	}
  
	if(organisms.length > 0){
		for(var i = 0; i < organisms.length; i++){
			organisms[i].show();
			organisms[i].showStats();
		}
	}
	
	
	if(eggs.length > 0){
		for(var i = 0; i < this.eggs.length; i++){
			this.eggs[i].show();
		}
	}
}

function mousePressed(){
	for(var i = 0; i < organisms.length; i++){
		if(dist(mouseX, mouseY, organisms[i].x, organisms[i].y) < organisms[i].radius){
			organisms[i].clickedOn = true;
		}
		else{
			organisms[i].clickedOn = false;
		}
	}
}

checkOrganismTouchWithFood = function(i){
	for(var j = foods.length - 1; j >= 0; j--){
		var touchDistance = organisms[i].radius - foods[j].radius;
		
		if(dist(foods[j].x, foods[j].y, organisms[i].x, organisms[i].y) < organisms[i].vision + touchDistance - 1
				&& !organisms[i].setOnTarget){
					
			var dx = foods[j].x - organisms[i].x;
			var dy = foods[j].y - organisms[i].y;
			var m = dy / dx;
			var dir = degrees(atan(m));
			
			if(foods[j].x < organisms[i].x)
				dir = 180 - dir;
			else
				dir = 360 - dir;
			
			organisms[i].direction = dir;
			organisms[i].setOnTarget = true;
		}
			
		if(dist(foods[j].x, foods[j].y, organisms[i].x, organisms[i].y) < touchDistance){
			foods.splice(j, 1);
			organisms[i].eatFood();
		}
	}
}