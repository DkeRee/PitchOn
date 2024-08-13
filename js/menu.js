class Menu {
	constructor() {
		this.ongoing = true;
		this.starting = true;
		this.finishing = false;
		this.opacity = 0;

		//back button
		this.back = new BoxWidget(80, 25, 160, 45);
		this.touchingBack = false;

		//1100, 220 total, 200 for padding
		this.content = new MenuContent([
			BEGINNER,
			CDE_AMATEUR,
			FGAB_AMATEUR,
			FULL_NATURAL,
			CD_ACCIDENTAL,
			FGA_ACCIDENTAL,
			FULL_ACCIDENTAL_1,
			FULL_ACCIDENTAL_2,
			FULL_CHROMATIC,
			OCTAVE_FULL_NAT,
			OCTAVE_FULL_ACC,
			OCTAVE_FULL_CHROMATIC,
			CHROMATIC_BLIND_1,
			CHROMATIC_BLIND_2,
			FULL_CHROMATIC_BLIND
		]);

		this.pTick = 5;
	}

	updateStarting() {
		if (this.starting) {
			this.opacity += 0.03;

			if (this.opacity >= 1) {
				this.opacity = 1;
				this.starting = false;
			}
		}
	}

	updateFinishing() {
		if (this.finishing) {
			this.opacity -= 0.03;

			if (this.opacity <= 0) {
				this.opacity = 0;
				this.ongoing = false;
			}
		}
	}

	frontWidgetUpdate() {
		const preTouch = this.touchingBack;
		this.touchingBack = this.back.touchingMouse();

		if (preTouch !== this.touchingBack) {
			playSound(selectIn);
		}

		if (this.touchingBack && MOUSE.holding && !this.finishing && !this.starting) {
			this.finishing = true;
			NEXT_STAGE = OPENING;
			playSound(selectedBack);
		}
	}

	updateParticles() {
		if (this.pTick > 0) {
			this.pTick--;
		} else {
			this.pTick = 5;
			PARTICLES.push(new TopParticle());
		}
	}

	update() {
		this.updateStarting();
		this.updateFinishing();
		this.frontWidgetUpdate();
		this.updateParticles();

		if (!this.finishing)
			this.content.update();
	}

	render() {
		ctx.shadowBlur = 35;
		ctx.shadowColor = hexToRgbA("#c9b5f7", this.opacity);
		ctx.strokeStyle = hexToRgbA("#d6c5fc", this.opacity);
		ctx.fillStyle = hexToRgbA("#c9b5f7", this.opacity);

		ctx.lineWidth = 4;
		ctx.font = "65px UniSansHeavy";
		ctx.textAlign = "center";

		//title
		ctx.fillText("MENU", CANVAS_WIDTH / 2, 60);
		ctx.strokeText("MENU", CANVAS_WIDTH / 2, 60);

		//line
		ctx.beginPath();
		ctx.moveTo(30, 75);
		ctx.lineTo(CANVAS_WIDTH - 30, 75);
		ctx.stroke();

		//back button render
		if (this.touchingBack) {
			ctx.fillStyle = hexToRgbA("#f5d88e", this.opacity);
			ctx.strokeStyle = hexToRgbA("#f5e8c9", this.opacity);
		}

		ctx.font = "40px UniSansHeavy";
		ctx.fillText("BACK", this.back.x + this.back.width / 2, this.back.y + this.back.height / 2 + 5);
		ctx.strokeText("BACK", this.back.x + this.back.width / 2, this.back.y + this.back.height / 2 + 5);

		ctx.shadowBlur = 0;

		this.content.render();
	}
}