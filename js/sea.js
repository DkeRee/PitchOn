class Sea {
	constructor(goalHeight) {
		this.goalHeight = goalHeight;
		this.y = CANVAS_HEIGHT + 20;
		this.yVel = 0;
		this.moving = false;

		this.amp = 0;
		this.ampVel = 0;
		this.ampAcc = degToRad(9);
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

		this.amp += this.ampVel;

		if (Math.abs(this.ampVel) > degToRad(100) && Math.sign(this.ampAcc) == Math.sign(this.amp)) {
			this.ampAcc *= -1;
		}

		this.ampVel += this.ampAcc;
	}

	render() {
		const wave = [];

		ctx.shadowBlur = 20;
		ctx.shadowColor = "#C2A7FF";

		ctx.strokeStyle = "#C2A7FF";
		ctx.lineWidth = 3;

		for (var i = 0; i < CANVAS_WIDTH; i++) {
			wave.push([i, (this.amp) * Math.sin(degToRad((5 * i)))]);
		}

		//highest
		ctx.beginPath();

		for (var i = 0; i < wave.length; i++) {
			const point = wave[i];
			if (i == 0) {
				ctx.moveTo(point[0], this.y + point[1] + 15)
			} else {
				ctx.lineTo(point[0], this.y + point[1] + 15);
			}
		}

		ctx.stroke();

		//middle
		ctx.beginPath();

		for (var i = 0; i < wave.length; i++) {
			const point = wave[i];
			if (i == 0) {
				ctx.moveTo(point[0], this.y + point[1])
			} else {
				ctx.lineTo(point[0], this.y + point[1]);
			}
		}

		ctx.stroke();

		//lowest
		ctx.beginPath();

		for (var i = 0; i < wave.length; i++) {
			const point = wave[i];
			if (i == 0) {
				ctx.moveTo(point[0], this.y + point[1] - 15)
			} else {
				ctx.lineTo(point[0], this.y + point[1] - 15);
			}
		}

		ctx.stroke();

		ctx.shadowBlur = 0;
	}
}