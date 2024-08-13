class RoundWidget extends BoxWidget {
	constructor(x, y) {
		super(x, y, 220, 220);
		this.touchCache = false;
		this.touching = false;
		this.id = randRange(1, 1000000);
	}

	updateLooks() {
		const preTouch = this.touching;
		this.touchCache = this.touchingMouse();

		//no selection yet
		if (STAGE_CACHE.content.newSelectedID == -1) {
			//select in
			if (!preTouch && this.touchCache) {
				STAGE_CACHE.content.newSelectedID = this.id;
				playSound(selectIn);
			}
		} else {
			//there is a selection
			if (STAGE_CACHE.content.newSelectedID == this.id) {
				//make sure we select out before we select someone else

				//select out
				if (preTouch && !this.touchCache) {
					STAGE_CACHE.content.newSelectedID = -1;
				}
			}
		}
	}

	update() {
		this.updateLooks();
	}

	render() {
		ctx.lineWidth = 3;
		ctx.shadowColor = hexToRgbA("#c9b5f7", STAGE_CACHE.opacity);
		ctx.strokeStyle = hexToRgbA("#d6c5fc", STAGE_CACHE.opacity);
		ctx.fillStyle = hexToRgbA("#d6c5fc", STAGE_CACHE.opacity / 3);

		if (this.touching) {
			ctx.strokeStyle = hexToRgbA("#f5d88e", STAGE_CACHE.opacity);
			ctx.fillStyle = hexToRgbA("#f5d88e", STAGE_CACHE.opacity / 3);
		}

		ctx.strokeRect(this.x + 10, this.y + 10, this.width - 10, this.height - 10);
		ctx.fillRect(this.x + 10, this.y + 10, this.width - 10, this.height - 10);
	}
}