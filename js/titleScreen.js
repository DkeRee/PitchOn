class TitleScreen {
	constructor() {
		this.ongoing = true;
		this.finishing = false;
		this.opacity = 1;

		this.tX = CANVAS_WIDTH / 2;
		this.tY = -30;
		this.tGoalY = (canvas.height / 2) - 60;
		this.tC = "#c9b5f7";
		this.tSC = "#d6c5fc";

		this.bX = (CANVAS_WIDTH / 2) - 115;
		this.bY = CANVAS_HEIGHT + 50;
		this.bGoalY = ((CANVAS_HEIGHT / 2) + 160) - 80;
		this.bWidth = 230;
		this.bHeight = 100;
		this.bC = "#f5d88e";
		this.bF = "#c9b5f7";

		this.pTick = 5;
		this.tTick = 50;
		this.bTick = 75;

		this.tFinish = false;
		this.bFinish = false;

		this.glowUp = true;
		this.glow = 0;
	}

	manageGlow() {
		if (this.glowUp) {
			if (this.glow < 20) {
				this.glow += 0.3;

				if (this.glow >= 20) {
					this.glow = 20;
					this.glowUp = false;
				}
			}
		} else {
			if (this.glow > 0) {
				this.glow -= 0.3;

				if (this.glow <= 0) {
					this.glow = 0.02;
					this.glowUp = true;
				}
			}
		}
	}

	toCircleCollision(cir) {
		const dist = {
			x: Math.abs(cir.x - this.bX - this.bWidth / 2),
			y: Math.abs(cir.y - this.bY - this.bHeight / 2)
		};

		if (dist.x > (this.bWidth / 2 + cir.radius)) return false;
		if (dist.y > (this.bHeight / 2 + cir.radius)) return false;

		if (dist.x <= (this.bWidth / 2)) return true;
		if (dist.y <= (this.bHeight / 2)) return true;

		const cornerSq = Math.pow(dist.x - this.bWidth / 2, 2) + Math.pow(dist.y - this.bHeight / 2, 2);

		return cornerSq <= cir.radius * cir.radius;
	}

	dropTitle() {
		if (!this.tFinish) {
			const len = Math.abs(this.tGoalY - this.tY);
			this.tY += len / 3;

			if (len / 3 <= 0.05) {
				this.tFinish = true;
				this.tY = this.tGoalY;
			}
		}
	}

	raiseButton() {
		if (!this.bFinish) {
			const len = Math.abs(this.bGoalY - this.bY);
			this.bY -= len / 3;

			if (len / 3 <= 0.05) {
				this.bFinish = true;
				this.bY = this.bGoalY;
			}
		}
	}

	updateDrop() {
		if (this.tTick > 0) this.tTick--;
		if (this.bTick > 0) this.bTick--;

		if (this.tTick <= 0) {
			this.dropTitle();
		}

		if (this.bTick <= 0) {
			this.raiseButton();
		}

		if (INTERACTED) {
			if (this.tTick == 1) {
				playSound(whooshSmall);
			}

			if (this.bTick == 1) {
				playSound(whoosh);
			}
		}
	}

	updateParticles() {
		if (this.ongoing) {
			if (this.pTick > 0) {
				this.pTick--;
			} else {
				PARTICLES.push(new SideParticle());
			}
		}
	}

	updateStart() {
		if (this.toCircleCollision(MOUSE) && MOUSE.holding && !this.finishing) {
			this.finishing = true;
			playSound(enter);
		}
	}

	updateFinishing() {
		if (this.finishing) {
			this.opacity -= 0.03;
			if (this.opacity <= 0) {
				this.opacity = 0;
				this.ongoing = false;
				NEXT_STAGE = MENU;
			}
		}
	}

	update() {
		this.updateParticles();
		this.updateDrop();
		this.manageGlow();
		this.updateStart();
		this.updateFinishing();
	}

	render() {
		ctx.shadowBlur = 35;
		ctx.shadowColor = hexToRgbA(this.tC, this.opacity);
		ctx.strokeStyle = hexToRgbA(this.tSC, this.opacity);
		ctx.fillStyle = hexToRgbA(this.tC, this.opacity);

		ctx.lineWidth = 5;
		ctx.font = "185px UniSansHeavy";
		ctx.textAlign = "center";


		//title
		ctx.fillText("PITCHLE", this.tX, this.tY);
		ctx.strokeText("PITCHLE", this.tX, this.tY);


		//button
		ctx.shadowBlur = this.glow;
		ctx.shadowColor = hexToRgbA(this.bF, this.opacity);

		ctx.strokeStyle = hexToRgbA(this.bC, this.opacity);
		ctx.strokeRect(this.bX, this.bY, this.bWidth, this.bHeight);

		ctx.fillStyle = hexToRgbA(this.bF, this.opacity / 4);
		ctx.fillRect(this.bX, this.bY, this.bWidth, this.bHeight);

		ctx.font = "70px UniSansHeavy";
		ctx.fillStyle = hexToRgbA("#f5d88e", this.opacity);

		ctx.fillText("START", canvas.width / 2, this.bY + 76);

		ctx.shadowBlur = 0;
	}
}