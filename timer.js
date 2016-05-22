function Timer(){
	this.time = 0;
	this.startTime = 0;
	this.timeLeft = 0;
	this.running = false;
	
	this.start = function(time){
		this.time = time;
		this.running = true;
		this.startTime = millis();
	}
	
	this.update = function(){
		if(this.running){				// Countdown timer if running
			this.timeLeft = this.time - (millis() - this.startTime) / 1000;
			if(this.timeLeft < 0){
				this.running = false;
				this.clean();
			}
		}
	}
	
	this.done = function(){
		if(!this.running){
			return true;
		}
		return false;
	}
	
	this.add = function(time){
		this.time += time;
	}
	
	this.clean = function(){
		this.timeLeft = 0;
		this.startTime = 0;
		this.time = 0;
	}
}