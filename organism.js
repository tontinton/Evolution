function Organism(x, y, vision, speed, radius, digestTime){
	this.vision = vision || 0;
	this.radius = radius || width / 126.8;
	this.speed = speed || 10;
	this.digestTime = digestTime || 30;
	
	this.x = x || random(this.radius, width - this.radius);
	this.y = y || random(this.radius, height - this.radius);
	
	this.direction = random(360);
	this.alive = true;
	
	this.lifeTime = 60;
	this.lifeTimer = new Timer();
	
	this.foodDigesting = 0;
	this.digestTimer = new Timer();
	
	this.clickedOn = false;
	this.pointedOn = false;
	
	this.setOnTarget = false;
	
	this.layAnEgg = false;

	this.show = function(){
		
		fill(65, 167 ,108);
		triangle(this.x + cos(radians(this.direction - 90)) * this.radius * 0.5,
					this.y - sin(radians(this.direction - 90)) * this.radius * 0.5,
					this.x + cos(radians(this.direction + 90)) * this.radius * 0.5,
					this.y - sin(radians(this.direction + 90)) * this.radius * 0.5,
					this.x + cos(radians(this.direction + 180)) * this.radius * 1.5,
					this.y - sin(radians(this.direction + 180)) * this.radius * 1.5);
		fill(90, 200, 100);
		ellipse(this.x, this.y, this.radius, this.radius);
	
		this.drawEyes();
	}
	
	this.drawEyes = function(){
		if(this.vision > 0){
			if(this.vision < 10){
				fill(0, 0, 0, this.vision * 22.5);
			}
			else{
				fill(0);
			}
				
			ellipse(this.x + cos(radians(this.direction - 45)) * this.radius * 0.25,
						this.y - sin(radians(this.direction - 45)) * this.radius * 0.25,
						this.radius * 0.25,
						this.radius * 0.25);
			ellipse(this.x + cos(radians(this.direction + 45)) * this.radius * 0.25,
						this.y - sin(radians(this.direction + 45)) * this.radius * 0.25,
						this.radius * 0.25,
						this.radius * 0.25);
		}
	}
	
	this.showStats = function(){
		if(this.clickedOn || this.pointedOn){
			fill(200, 166, 255, 100);
			rect(this.x, this.y, width / 8, width / 9, width / 50);
			textSize(25);
			fill(95, 0, 148);
			text("Death Timer: " + nf(this.lifeTimer.timeLeft, 1, 2), this.x - width / 18, this.y - width / 32);
			text("Vision: " + nf(this.vision), this.x - width / 18, this.y - width / 64);
			text("Food Digesting: " + nf(this.foodDigesting), this.x - width / 18, this.y);
			text("Digest Timer: " + nf(this.digestTimer.timeLeft, 1, 2), this.x - width / 18, this.y + width / 64);
			text("Size: " + nf(this.radius, 1, 1), this.x - width / 18, this.y + width / 32);
			text("Speed: " + nf(this.speed, 1, 2), this.x - width / 18, this.y + width / 22);
		}
	}
	
	this.update = function(){
		this.direction = this.fixDirection(this.direction);
		
		this.x += cos(radians(this.direction)) * this.speed / 10;
		this.y -= sin(radians(this.direction)) * this.speed / 10;
		
		this.lifeTimer.update();
		if(this.lifeTimer.done()){
			this.alive = false;
		}
		
		if(!this.digestTimer.done()){
			this.digestTimer.update();
		}
		else if(this.digestTimer.done() && this.foodDigesting >= 1){
			this.layAnEgg = true;
			this.foodDigesting --;
			
			while(round(random(0, 2)) === 0){
				var rnd = round(random(0, 3))
				if(rnd === 0)
					this.vision ++;
				else if(rnd === 1)
					this.speed ++;
				else if(rnd === 2)
					this.radius += 0.5;
				else if(rnd === 3 && this.digestTime > 0)
					this.digestTime --;
			}
			
			if(this.foodDigesting >= 1){
				this.digestTimer.start(this.digestTime);
			}
		}
	}
	
	this.eatFood = function(){
		
		this.setOnTarget = false;
		
		if(this.foodDigesting === 0){
			this.digestTimer.start(this.digestTime);
		}
		
		this.foodDigesting ++;
	}
	
	this.checkDeath = function(){
		if(!this.alive){
			return true;
		}
		return false;
	}
	
	this.checkHitWall = function(){
		if(this.x + this.radius > width){
			this.direction = 180 - this.direction;
		}
		else if(this.x - this.radius < 0){
			this.direction = 180 - this.direction;
		}
		
		if(this.y + this.radius > height){
			this.direction = 360 - this.direction;
		}
		else if(this.y - this.radius < 0){
			this.direction = 360 - this.direction;
		}
	}
	
	this.fixDirection = function(dir){
		if(dir >= 360){
			dir -= 360;
		}
		else if(dir < 0){
			dir += 360;
		}
		return dir;
	}
}