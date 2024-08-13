class MenuContent {
	constructor(roundContents) {
		this.x = 50;
		this.y = 130;
		this.width = 1100;
		this.height = 600;

		this.rounds = [];

		this.newSelectedID = -1;

		var spawnX = this.x;
		var spawnY = this.y;
		for (var i = 0; i < roundContents.length; i++) {
			const boxWidget = new RoundWidget(spawnX, spawnY, roundContents[i]);
			this.rounds.push(boxWidget);
			spawnX += ROUND_WIDGET_WIDTH;

			if ((i + 1) % 5 == 0 && i > 0) {
				//reset to next row
				spawnX = this.x;
				spawnY += ROUND_WIDGET_HEIGHT;
			}
		}
	}

	update() {
		//update round widgets
		for (var i = 0; i < this.rounds.length; i++) {
			this.rounds[i].update();

			if (this.rounds[i].id == this.newSelectedID) {
				this.rounds[i].touching = true;
			} else {
				this.rounds[i].touching = false;
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