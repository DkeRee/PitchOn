class RoundWidget extends BoxWidget {
	constructor(x, y) {
		super(x, y, 220, 220);
	}

	render() {
		ctx.lineWidth = 3;
		ctx.shadowColor = hexToRgbA("#c9b5f7", STAGE_CACHE.opacity);
		ctx.strokeStyle = hexToRgbA("#d6c5fc", STAGE_CACHE.opacity);
		ctx.fillStyle = hexToRgbA("#d6c5fc", STAGE_CACHE.opacity / 4);
		ctx.strokeRect(this.x + 10, this.y + 10, this.width - 10, this.height - 10);
		ctx.fillRect(this.x + 10, this.y + 10, this.width - 10, this.height - 10);
	}
}