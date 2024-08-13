class Menu {
	constructor() {
		this.ongoing = true;
		this.starting = true;
		this.finishing = false;
		this.opacity = 0;

		//back button
		this.back = new BoxWidget(80, 25, 160, 75);
		this.touchingBack = false;

		//1100, 220 total, 200 for padding
		this.content = new MenuContent();
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

	update() {
		this.updateStarting();
		this.updateFinishing();
		this.frontWidgetUpdate();
	}

	render() {
		ctx.shadowBlur = 35;
		ctx.shadowColor = hexToRgbA("#c9b5f7", this.opacity);
		ctx.strokeStyle = hexToRgbA("#d6c5fc", this.opacity);
		ctx.fillStyle = hexToRgbA("#c9b5f7", this.opacity);

		ctx.lineWidth = 4;
		ctx.font = "100px UniSansHeavy";
		ctx.textAlign = "center";

		//title
		ctx.fillText("MENU", CANVAS_WIDTH / 2, 100);
		ctx.strokeText("MENU", CANVAS_WIDTH / 2, 100);

		//line
		ctx.beginPath();
		ctx.moveTo(30, 120);
		ctx.lineTo(CANVAS_WIDTH - 30, 120);
		ctx.stroke();

		//back button render
		if (this.touchingBack) {
			ctx.fillStyle = hexToRgbA("#f5d88e", this.opacity);
			ctx.strokeStyle = hexToRgbA("#f5e8c9", this.opacity);
		}

		ctx.font = "60px UniSansHeavy";
		ctx.fillText("BACK", this.back.x + this.back.width / 2, this.back.y + this.back.height / 2 + 20);
		ctx.strokeText("BACK", this.back.x + this.back.width / 2, this.back.y + this.back.height / 2 + 20);

		ctx.shadowBlur = 0;

		this.content.render();
	}
}