const R_C = 0;
const N_C = 1;
const S_C = 2;
const F_C = 3;

class Mouse {
	constructor() {
		this.x = CANVAS_WIDTH / 2;
		this.y = CANVAS_HEIGHT / 2;
		this.goalX = this.x;
		this.goalY = this.y;
		this.holding = false;
		this.radius = 25;
		this.color = "#edadf0";

		this.touching = false;
		this.particleCounter = 5;

		this.angle = 0;
		this.bWidth = 12;
		this.bHeight = 4;
	}

	updateMouseGoal(clientX, clientY) {
		const rect = canvas.getBoundingClientRect();
		this.goalX = clientX - rect.left;
		this.goalY = clientY - rect.top;
	}

	switchColor(type) {
		switch (type) {
			case R_C:
				this.color = "#edadf0";
				break;
			case N_C:
				this.color = "#f5d88e";
				break;
			case S_C:
				this.color = "#78f5c3";
				break;
			case F_C:
				this.color = "#f59953";
				break;
		}
	}

	followGoal() {
		var angle = betterAtan2(this.goalY - this.y, this.goalX - this.x);
		var speed = dist(this.goalX - this.x, this.goalY - this.y) / 6;

		this.x += Math.cos(angle) * speed;
		this.y += Math.sin(angle) * speed;
	}

	updateParticles() {
		if (this.particleCounter > 0) {
			this.particleCounter--;
		} else {
			this.particleCounter = 5;

			var count;
			if (this.touching || this.holding) {
				count = 5;
			} else {
				count = 1;
			}

			for (var i = 0; i < count; i++) {
				PARTICLES.push(new MouseParticle(this.x, this.y, this.color));
			}
		}
	}

	checkTouching() {
		//check everything that mouse could touch for cool fx
		if (STAGE_CACHE) {
			//bubbles
			if (STAGE_CACHE.bubbles) {
				for (var i = 0; i < STAGE_CACHE.bubbles.length; i++) {
					if (STAGE_CACHE.bubbles[i].isColliding(MOUSE)) {
						this.touching = true;
						return;
					}
				}
			}

			//title play button
			if (STAGE_CACHE.toCircleCollision) {
				if (STAGE_CACHE.toCircleCollision(this)) {
					this.touching = true;
					return;
				}
			}

			//menu back button
			if (STAGE_CACHE.back) {
				if (STAGE_CACHE.back.touchingMouse()) {
					this.touching = true;
					return;
				}
			}
		}

		this.touching = false;
	}

	updateRot() {
		var speed;
		if (this.touching || this.holding) {
			speed = 10;
		} else {
			speed = 2;
		}

		this.angle += degToRad(speed);
		this.angle %= 2 * Math.PI;
	}

	update() {
		this.followGoal();
		this.updateRot();
		this.checkTouching();

		if (STAGE_CACHE)
			this.updateParticles();
	}

	render() {
		//create cool looking circle
		ctx.shadowBlur = 10;
		ctx.shadowColor = this.color;

		ctx.lineWidth = 5;
		ctx.strokeStyle = this.color;
		ctx.fillStyle = this.color;

		//center dot
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius / 6, 0, 2 * Math.PI, false);
		ctx.fill();

		//outer circle
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.stroke();

		//rotating spike engravings
		ctx.save();

		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);

		ctx.fillRect((this.bWidth / -2) + 12, this.bHeight / -2, this.bWidth, this.bHeight);

		ctx.rotate(degToRad(90));
		ctx.fillRect((this.bWidth / -2) + 12, this.bHeight / -2, this.bWidth, this.bHeight);

		ctx.rotate(degToRad(90));
		ctx.fillRect((this.bWidth / -2) + 12, this.bHeight / -2, this.bWidth, this.bHeight);

		ctx.rotate(degToRad(90));
		ctx.fillRect((this.bWidth / -2) + 12, this.bHeight / -2, this.bWidth, this.bHeight);

		ctx.restore();

		ctx.shadowColor = 0;
	}
}

const MOUSE = new Mouse();