class HealthBar {
	constructor(maxLives) {
		this.maxLives = maxLives;
		this.life = this.maxLives;

		//rendering stuff
		this.x = CANVAS_WIDTH + 200;
		this.y = 30;
		this.width = 45;
		this.height = 100;

		this.contentY = this.y;
		this.goalY = this.y;
		this.yVel = 0;
		this.yAcc = 0;

		this.contentHeight = this.height;
		this.goalHeight = this.height;
		this.heightVel = 0;
		this.heightAcc = 0;

		this.goalX = this.x;
		this.xVel = 0;
		this.xAcc = 0;

		this.borderColor = "#2dd41c";
		this.fillColor = "#76f069";

		this.setNewGoalX(CANVAS_WIDTH - 60);
	}

	registerHurt() {
		const dec = this.height / this.maxLives;
		this.life--;

		this.goalHeight = this.contentHeight - dec;
		this.goalY = this.contentY + dec;

		const distHeight = this.goalHeight - this.contentHeight;
		this.heightVel = distHeight / 5;
		this.heightAcc = (Math.abs(distHeight) / 45) * -Math.sign(this.heightVel);

		const distY = this.goalY - this.contentY;
		this.yVel = distY / 5;
		this.yAcc = (Math.abs(distY) / 45) * -Math.sign(this.yVel);
	}

	setNewGoalX(newGoal) {
		this.goalX = newGoal;
		const dist = this.goalX - this.x;

		this.xVel = dist / 16;
		this.xAcc = (Math.abs(dist) / 500) * -Math.sign(this.xVel);
	}

	updateContentYLerp() {
		if (this.goalY !== this.contentY) {
			this.contentY += this.yVel;
			this.yVel += this.yAcc;

			if (Math.abs(this.goalY - this.contentY) <= 2) {
				//end travel
				this.contentY = this.goalY;

				//then, we wait until we finish decrementing the healthbar to declare death, not instantly
				if (this.life == 0) {
					playSound(gameFail);
					STAGE_CACHE.endRound();
				}
			}
		}
	}

	updateHeightLerp() {
		if (this.goalHeight !== this.contentHeight) {
			this.contentHeight += this.heightVel;
			this.heightVel += this.heightAcc;

			if (Math.abs(this.goalHeight - this.contentHeight) <= 2) {
				//end travel
				this.contentHeight = this.goalHeight;
			}
		}
	}

	updateXLerp() {
		if (this.goalX !== this.x) {
			this.x += this.xVel;
			this.xVel += this.xAcc;

			if (Math.abs(this.goalX - this.x) <= 2) {
				//end travel
				this.x = this.goalX;
			}
		}
	}

	update() {
		this.updateXLerp();
		this.updateHeightLerp();
		this.updateContentYLerp();
	}

	render() {
		ctx.shadowBlur = 40;
		ctx.shadowColor = this.fillColor;
		ctx.lineWidth = 7;

		ctx.strokeStyle = this.borderColor;
		ctx.fillStyle = this.fillColor;
		ctx.fillRect(this.x, this.contentY, this.width, this.contentHeight);
		ctx.strokeRect(this.x, this.y, this.width, this.height);
		ctx.shadowBlur = 0;
	}
}