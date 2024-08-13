class MenuContent {
	constructor() {
		this.x = 50;
		this.y = 130;
		this.width = 1100;
		this.height = 600;

		this.rounds = [];

		var spawnX = this.x;
		var spawnY = this.y;
		for (var i = 0; i < 6; i++) {
			const boxWidget = new RoundWidget(spawnX, spawnY);
			this.rounds.push(boxWidget);
			spawnX += ROUND_WIDGET_WIDTH;

			if ((i + 1) % 5 == 0 && i > 0) {
				//reset to next row
				spawnX = this.x;
				spawnY += ROUND_WIDGET_HEIGHT;
			}
		}
	}

	render() {
		//render round widgets
		for (var i = 0; i < this.rounds.length; i++) {
			this.rounds[i].render();
		}
	}
}