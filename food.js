function Food(x, y){
	this.radius = random(width / 480, width / 274);
	this.x = x || random(this.radius, width - this.radius);
	this.y = y || random(this.radius, height - this.radius);
  
	this.show = function(){
		fill(255, 220, 145);
		ellipse(this.x, this.y, this.radius, this.radius);
	}
}