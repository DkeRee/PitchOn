const Z = 0;
const X = 1;

const RIGHT_ARROW = 0;
const LEFT_ARROW = 1;

const NATURAL = 0;
const SHARP = 1;
const FLAT = 2;

class ToneMenu {
	constructor(toneList, isChromatic) {
		this.toneIndex = 0;
		this.toneList = toneList;
		this.isChromatic = isChromatic;

		//keybind info
		this.held = false;
		this.lastHeld = -1;

		//create container
		this.color = "#ccbaf7";
		this.width = 44; //100 - this.toneList.length * 8, removed ability to scale due to unreliability, plus not really needed
		this.height = this.width * this.toneList.length;
		this.x = -100;
		this.y = (CANVAS_HEIGHT / 2) - (this.width / 2) * this.toneList.length;

		//accidental container
		this.accidental = NATURAL;
		this.accidentalHeld = false;
		this.accidentalLastHeld = -1;
		this.accidentalWidth = this.width;
		this.accidentalHeight = this.accidentalWidth;
		this.accidentalX = this.x;
		this.accidentalY = this.y - this.accidentalHeight * 2;

		//lerped container
		this.goalX = -40;
		this.containerVel = 0;
		this.containerAcc = 0;

		//lerped cursor
		this.cX = this.x;
		this.cY = this.y;
		this.colorC = "#f5c690";
		this.goalY = this.cY;
		this.cursorVel = 0;
		this.cursorAcc = 0;

		this.setNewGoalContainer(15);
	}

	getSelected() {
		return this.toneList[this.toneIndex];
	}

	setNewGoalCursor(newGoal) {
		this.goalY = newGoal;
		const dist = this.goalY - this.cY;

		this.cursorVel = dist / 5;
		this.cursorAcc = (Math.abs(dist) / 45) * -Math.sign(this.cursorVel);
	}

	setNewGoalContainer(newGoal) {
		this.goalX = newGoal;
		const dist = this.goalX - this.x;

		this.containerVel = dist / 16;
		this.containerAcc = (Math.abs(dist) / 500) * -Math.sign(this.containerVel);
	}

	updateContainerLerp() {
		this.cX = this.x;
		if (this.goalX !== this.x) {
			this.x += this.containerVel;
			this.containerVel += this.containerAcc;

			if (Math.abs(this.goalX - this.x) <= 2) {
				//end travel
				this.x = this.goalX;
			}
		}
	}

	updateSelectorBind() {
		//structure where mashing keys will end up moving down only
		if (!this.held) {
			var bareY = this.y + (this.toneIndex) * this.width;

			if (KEYBINDS[88]) {
				//X
				if (this.toneIndex + 1 < this.toneList.length) {
					this.toneIndex++;
					this.held = true;
					this.lastHeld = X;
					this.setNewGoalCursor(bareY + this.width);
					playSound(switchTone);
				}
			} else if (KEYBINDS[90]) {
				//Z
				if (this.toneIndex - 1 > -1) {
					this.toneIndex--;
					this.held = true;
					this.lastHeld = Z;
					this.setNewGoalCursor(bareY - this.width);
					playSound(switchTone);
				}
			}
		} else {
			if (!KEYBINDS[88] && this.lastHeld == X) {
				this.held = false;
			} else if (!KEYBINDS[90] && this.lastHeld == Z) {
				this.held = false;
			}
		}
	}

	updateAccidentalBind() {
		if (this.isChromatic) {
			if (!this.accidentalHeld) {
				if (KEYBINDS[39]) {
					//RIGHT ARROW
					if (this.accidental + 1 < 3) {
						this.accidental++;
					} else {
						this.accidental = NATURAL;
					}

					this.accidentalHeld = true;
					this.accidentalLastHeld = RIGHT_ARROW;
					playSound(switchAccidental);
				} else if (KEYBINDS[37]) {
					//LEFT ARROW
					if (this.accidental - 1 > -1) {
						this.accidental--;
					} else {
						this.accidental = FLAT;
					}

					this.accidentalHeld = true;
					this.accidentalLastHeld = LEFT_ARROW;
					playSound(switchAccidental);
				}
			} else {
				if (!KEYBINDS[39] && this.accidentalLastHeld == RIGHT_ARROW) {
					this.accidentalHeld = false;
				} else if (!KEYBINDS[37] && this.accidentalLastHeld == LEFT_ARROW) {
					this.accidentalHeld = false;
				}
			}
		}
	}

	updateCursor() {
		if (this.goalY !== this.cY) {
			//move to new spot
			this.cY += this.cursorVel;
			this.cursorVel += this.cursorAcc;

			if (Math.abs(this.goalY - this.cY) <= 2) {
				//end travel
				this.cY = this.goalY;
			}
		}
	}

	update() {
		this.updateSelectorBind();
		this.updateAccidentalBind();
		this.updateCursor();
		this.updateContainerLerp();
		this.accidentalX = this.x;
	}

	render() {
		var fontSize = 31.428571428571427; //1 / this.toneList.length * 220;, again removed ability to customize for same reasons

		if (this.isChromatic) {
			switch (this.accidental) {
				case NATURAL:
					this.colorC = "#f5c690";
					break;
				case SHARP:
					this.colorC = "#78f5c3";
					break;
				case FLAT:
					this.colorC = "#f59953";
					break;
			}

			ctx.fillStyle = hexToRgbA(this.colorC, 0.5);

			//render accidental container
			ctx.lineWidth = this.accidentalWidth / 18;
			ctx.strokeStyle = this.colorC;
			ctx.fillRect(this.accidentalX, this.accidentalY, this.accidentalWidth, this.accidentalHeight);
			ctx.strokeRect(this.accidentalX, this.accidentalY, this.accidentalWidth, this.accidentalHeight);

			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.font = `${fontSize}px UniSansHeavy`;
			switch (this.accidental) {
				case NATURAL:
					ctx.fillText("N", this.accidentalX + this.accidentalWidth / 2, this.accidentalY + this.accidentalHeight / 2 + fontSize / 2.8);
					break;
				case SHARP:
					ctx.fillText("S", this.accidentalX + this.accidentalWidth / 2, this.accidentalY + this.accidentalHeight / 2 + fontSize / 2.8);
					break;
				case FLAT:
					ctx.fillText("F", this.accidentalX + this.accidentalWidth / 2, this.accidentalY + this.accidentalHeight / 2 + fontSize / 2.8);
					break;
			}
		}

		//rendertone menu
		ctx.strokeStyle = hexToRgbA(this.color, 0.9);
		ctx.lineWidth = 4;

		for (var i = 0; i < this.toneList.length; i++) {
			ctx.fillStyle = hexToRgbA(this.color, 0.5);
			ctx.fillRect(this.x, this.y + i * this.width, this.width, this.width);
			ctx.strokeRect(this.x, this.y + i * this.width, this.width, this.width);

			ctx.font = `${fontSize}px UniSansHeavy`;
			ctx.fillStyle = this.color;
			ctx.textAlign = "center";
			ctx.fillText(this.toneList[i], this.x + this.width / 2, (this.y + i * this.width) + this.width / 2 + fontSize / 2.8);
		}

		//render cursor
		ctx.shadowBlur = 40;
		ctx.shadowColor = this.colorC;
		ctx.strokeStyle = this.colorC;
		ctx.strokeRect(this.cX, this.cY, this.width, this.width);

		//render cursor Z and X indicators
		ctx.fillStyle = this.colorC;
		ctx.font = `${fontSize / 3}px UniSansHeavy`;

		//Z
		ctx.beginPath();
		ctx.arc(this.cX + this.width, this.cY, this.width / 5, 0, 2 * Math.PI, false);
		ctx.fill();

		//X
		ctx.beginPath();
		ctx.arc(this.cX + this.width, this.cY + this.width, this.width / 5, 0, 2 * Math.PI, false);
		ctx.fill();

		ctx.fillStyle = "white";
		ctx.fillText("Z", this.cX + this.width, this.cY + (this.width / 10));
		ctx.fillText("X", this.cX + this.width, this.cY + this.width + (this.width / 10));

		ctx.shadowBlur = 0;
	}
}