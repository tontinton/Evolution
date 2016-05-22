function Egg(x, y, vision, speed, radius, digestTime){
	this.x = x;
	this.y = y;
	this.size = 10;
	
	this.vision = vision;
	this.speed = speed;
	this.radius = radius;
	this.digestTime = digestTime;
	
	this.timer = new Timer();
	
	this.show = function(){
		fill(0, 0, 0, 255);
		ellipse(this.x, this.y, this.radius * 0.8, this.radius);
		fill(235, 158, 255);
		ellipse(this.x, this.y, this.radius * 0.64, this.radius * 0.8);
	}
}