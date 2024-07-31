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

		//alarm
		this.alarming = false;
		this.alarmDecY = 10;
		this.alarmRateX = -3;
		this.alarmAccX = -4;
		this.alarmXCounter = 0;
		this.alarmOpacity = 1;

		//yDec
		this.yDec = 0.4;

		//bubble inflation
		this.passive = true;

		this.expandRate = 0.5;
		this.expandAcc = -0.02;

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

	pushIdleParticle(color) {
		STAGE_CACHE.particles.push(new BubbleParticle(this.x, this.y, this.radius, color));
	}

	pushRippleParticle(color, full) {
		STAGE_CACHE.particles.push(new RippleParticle(this.x, this.y, this.radius, color, full));
	}

	alarmSelf() {
		this.alarming = true;
		this.pushRippleParticle("#EE4B2B", false);
	}

	killSelf(color) {
		for (var i = 0; i < 50; i++) {
			this.pushIdleParticle(color);
		}

		this.pushRippleParticle(color, true);
		this.delete = true;
	}

	isTouching() {
 		return this.isColliding(Object.assign({radius: 1}, MOUSE_POS));
	}

	checkServerTouching() {
		return this.id == STAGE_CACHE.touchedBubble && STAGE_CACHE.touchFound;
	}

	updateVertical() {
		if (this.alarming) {
			this.y += this.alarmDecY;
			this.alarmDecY -= 0.5;
			this.alarmOpacity -= 0.05;

			if (this.alarmDecY <= this.yDec) {
				this.alarmDecY = 10;
				this.alarmRateX = -3;
				this.alarmAccX = -4;
				this.alarmXCounter = 0;
				this.alarmOpacity = 1;
				this.alarming = false;
			}
		} else {
			this.y += this.yDec;
		}
	}

	updateHorizontal() {
		//make bubble lerp to goal X
		if (!this.alarming) {
			this.alarmX

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
		} else {
			this.alarmRateX += this.alarmAccX;

			if (this.alarmXCounter > 0) {
				this.alarmXCounter--;
			} else {
				this.alarmXCounter = 3;
				this.alarmAccX *= -1;

				if (this.alarmAccX > 0) {
					this.alarmAccX -= 0.4;
				} else {
					this.alarmAccX += 0.4;
				}
			}

			this.x += this.alarmRateX;
		}
	}

	updateIdleParticle() {
		//update particle system
		const touchingMouse = this.checkServerTouching();
		const color = this.alarming ? "#EE4B2B" : this.color;

		if (this.alarming) {
			if (this.alarmXCounter % 2 == 0) {
				for (var i = 0; i < 10; i++) {
					this.pushIdleParticle("#EE4B2B");
				}
			}
		}

		if (this.particleCheck > 0) {
			this.particleCheck--;
		} else {
			if (touchingMouse) {
				this.particleCheck = 0.1;

				for (var i = 0; i < 5; i++) {
					this.pushIdleParticle(color);
				}
			} else {
				this.particleCheck = 2;
				this.pushIdleParticle(color);
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

	update() {
		//other updates
		this.updateVertical();
		this.updateHorizontal();
		this.updateIdleParticle();
		this.updateRadialFluctuation();

		//touched sea
		if (this.y + this.radius >= STAGE_CACHE.sea.y) {
			this.killSelf("#EE4B2B");
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

		if (this.alarming) {
			ctx.fillStyle = hexToRgbA("#EE4B2B", this.alarmOpacity);
			ctx.strokeStyle = hexToRgbA("#EE4B2B", this.alarmOpacity);

			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.stroke();
		}

		ctx.shadowBlur = 0;
	}
}