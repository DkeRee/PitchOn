class Sea {
	constructor(goalHeight) {
		this.goalHeight = goalHeight;
		this.y = CANVAS_HEIGHT + 20;
		this.yVel = 0;
		this.moving = false;

		this.renderOffset = 0;
		this.renderOffsetVel = 0;
		this.renderOffsetAcc = degToRad(1);
	}

	newGoal(goalHeight) {
		this.goalHeight = goalHeight;
	}

	update() {
		const posDiff = Math.abs(this.y - this.goalHeight);
		this.y += this.yVel;

		//moving offset
		if (posDiff > 1) {
			if (!this.moving) {
				if (this.goalHeight < this.y) {
					this.yVel = -posDiff / 19.9;
				} else {
					this.yVel = posDiff / 19.9;
				}

				this.moving = true;
			}

			this.yVel /= (63 / 60);
		} else {
			this.y = this.goalHeight;
			this.yVel = 0;

			if (this.moving) {
				this.moving = false;
			}
		}


		this.renderOffset += this.renderOffsetVel;
		if (Math.abs(this.renderOffsetVel) > degToRad(40)) {
			this.renderOffsetAcc *= -1;
		}

		this.renderOffsetVel += this.renderOffsetAcc;
	}

	render() {
		const sine = [];
		const cosine = [];
		const amp = 15;

		ctx.shadowBlur = 20;
		ctx.shadowColor = "#C2A7FF";

		ctx.strokeStyle = "#C2A7FF";
		ctx.lineWidth = 3;

		//sine wave increment
		for (var i = 0; i < CANVAS_WIDTH; i++) {
			sine.push([i, amp * Math.sin(this.renderOffset + degToRad((5 * i)))]);
		}

		//cosine wave increment
		for (var i = 0; i < CANVAS_WIDTH; i++) {
			cosine.push([i, amp * Math.cos(-this.renderOffset + degToRad((5 * i)))]);
		}

		ctx.beginPath();

		for (var i = 0; i < sine.length; i++) {
			const point = sine[i];
			if (i == 0) {
				ctx.moveTo(point[0], this.y + point[1])
			} else {
				ctx.lineTo(point[0], this.y + point[1]);
			}
		}

		ctx.stroke();

		ctx.beginPath();
		for (var i = 0; i < cosine.length; i++) {
			const point = cosine[i];
			if (i == 0) {
				ctx.moveTo(point[0], this.y + point[1]);
			} else {
				ctx.lineTo(point[0], this.y + point[1]);
			}
		}

		ctx.stroke();

		ctx.shadowBlur = 0;
	}
}