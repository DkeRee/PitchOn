class Bubble {
	constructor(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.solidRadius = radius;
		this.radius = this.solidRadius;
		this.color = color;

		//xMovement
		this.goalX = randRange(0, CANVAS_WIDTH);
		this.xRate = 1;
		this.xAcc = 0.05;
		this.xMoving = false;

		//yDec
		this.yDec = 0.15;

		//bubble inflation
		this.passive = true;

		this.expandRate = 0.5;
		this.expandAcc = 0.02;

		this.passive = false;
		this.goalRadius = this.solidRadius;

		//particle watch
		this.particleCheck = 0;

		//bubble id
		this.id = randRange(100000, 500000);

		//delete flag
		this.delete = false;
	}

	findNewGoal() {
		while (true) {
			const pos = randRange(this.solidRadius, CANVAS_WIDTH - this.solidRadius);
			if (this.xRate > 0) {
				if (pos < this.x) {
					return pos;
				}
			} else {
				if (pos > this.x) {
					return pos;
				}
			}
		}
	}

	isColliding(otherEntity) {
		const dX = this.x - otherEntity.x;
		const dY = this.y - otherEntity.y;
		if (dist(dX, dY) < this.solidRadius + otherEntity.radius) {
			return true;
		}
	}

	pushIdleParticle() {
		STAGE_CACHE.particles.push(new BubbleParticle(this.x, this.y, this.radius, this.color));
	}

	pushRippleParticle() {
		STAGE_CACHE.particles.push(new RippleParticle(this.x, this.y, this.radius, this.color));
	}

	killSelf() {
		for (var i = 0; i < 50; i++) {
			this.pushIdleParticle();
		}

		this.pushRippleParticle();
		this.delete = true;
	}

	isTouching() {
 		return this.isColliding(Object.assign({radius: 1}, MOUSE_POS));
	}

	checkServerTouching() {
		return this.id == STAGE_CACHE.touchedBubble && STAGE_CACHE.touchFound;
	}

	updateHorizontal() {
		//make bubble lerp to goal X
		const xDist = Math.abs(this.goalX - this.x);
		if (xDist > 5) {
			if (!this.xMoving) {
				this.xAcc = xDist / 10000;

				if (this.x < this.goalX) {
					this.xAcc = Math.abs(this.xAcc);
				} else {
					this.xAcc = -Math.abs(this.xAcc);
				}

				this.xRate = 0;
				this.xMoving = true;
			}

			this.xRate += this.xAcc;

			if (Math.abs(this.xRate) > (xDist / 50) && ((this.xRate > 0 && this.xAcc > 0) || (this.xRate < 0 && this.xAcc < 0))) {
				this.xAcc *= -1;
			}

			this.x += this.xRate;
		} else {
			this.goalX = this.findNewGoal();
			this.xMoving = false;
		}
	}

	updateIdleParticle() {
		//update particle system
		const touchingMouse = this.checkServerTouching();

		if (this.particleCheck > 0) {
			this.particleCheck--;
		} else {
			if (touchingMouse) {
				this.particleCheck = 0.1;

				for (var i = 0; i < 5; i++) {
					this.pushIdleParticle();
				}
			} else {
				this.particleCheck = 2;
				this.pushIdleParticle();
			}
		}
	}

	updateRadialFluctuation() {
		const touchingMouse = this.checkServerTouching();

		//make bubble fluctuate
		const goalDist = Math.abs(this.goalRadius - this.radius);
		if (touchingMouse) {
			this.goalRadius = this.solidRadius + 25;
		} else {
			this.goalRadius = this.solidRadius;
		}

		//snap back
		if (!(goalDist >= 10) && !this.passive) {
			this.radius = this.goalRadius;
		}

		this.passive = !(goalDist >= 10);

		if (this.passive) {
			this.radius += this.expandRate;

			if (Math.abs(this.expandRate) >= 0.5) {
				this.expandAcc *= -1;
			}

			this.expandRate += this.expandAcc;
		} else {
			if (this.goalRadius > this.radius) {
				this.radius += 3;
				this.expandRate = 0.5;
				this.expandAcc = 0.02;
			} else {
				this.radius -= 3;
				this.expandRate = -0.5;
				this.expandAcc = -0.02;
			}

			if ((this.radius < this.goalRadius && this.radius + 6 >= this.goalRadius)
				|| (this.radius > this.goalRadius && this.radius - 6 <= this.goalRadius)) {
				this.passive = true;
				this.radius = this.goalRadius;
			}
		}
	}

	updatePop() {
		if (this.checkServerTouching() && holding) {
			this.killSelf();
			holding = false;
		}
	}

	update() {
		//make bubble go down
		this.y += this.yDec;

		//other updates
		this.updateHorizontal();
		this.updateIdleParticle();
		this.updateRadialFluctuation();
		this.updatePop();

		//touched sea
		if (this.y + this.radius >= STAGE_CACHE.sea.y) {
			this.killSelf();
		}
	}

	render() {
		ctx.shadowBlur = 10;
		ctx.shadowColor = this.color;
		ctx.fillStyle = hexToRgbA(this.color, 0.4);

		ctx.strokeStyle = this.color;
		ctx.lineWidth = 5;

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		ctx.shadowBlur = 0;
	}
}