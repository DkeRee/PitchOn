class RoundWidget extends BoxWidget {
	constructor(x, y, settings) {
		super(x, y, 220, 220);
		this.touchCache = false;
		this.touching = false;
		this.settings = settings;
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
					playSound(selectIn);
				}
			}
		}
	}

	updateTouch() {
		if (this.touching && MOUSE.holding && !STAGE_CACHE.finishing && !STAGE_CACHE.starting) {
			STAGE_CACHE.finishing = true;
			NEXT_STAGE = GAME;
			ROUND_PRESET = this.settings;
			playSound(gameStartOne);
			playSound(gameStartTwo);
		}
	}

	//assumes that ALL accidentals given are sharps
	noteFormatter() {
		//first pick out types
		const C_SCALE = ["C", "D", "E", "F", "G", "A", "B"];
		const CHROMATIC = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

		const toneRange = this.settings.toneRange;
		for (var i = 0; i < toneRange.length; i++) {
			if (toneRange[i] !== C_SCALE[i]) {
				break;
			}

			if (i + 1 == C_SCALE.length) {
				return "C SCALE";
			}
		}

		for (var i = 0; i < toneRange.length; i++) {
			if (toneRange[i] !== CHROMATIC[i]) {
				break;
			}

			if (i + 1 == CHROMATIC.length) {
				return "CHROMATIC";
			}
		}

		var formatted = "";
		for (var i = 0; i < toneRange.length; i++) {
			const note = toneRange[i];

			formatted += note;

			if (i + 1 < toneRange.length) {
				formatted += ", ";
			}

			//truncate
			if (i > 6) {
				formatted += "...";
				return formatted;
			}
		}

		return formatted;
	}

	update() {
		this.updateLooks();
		this.updateTouch();
	}

	render() {
		//render box
		ctx.lineWidth = 3;
		ctx.shadowColor = hexToRgbA("#c9b5f7", STAGE_CACHE.opacity);
		ctx.strokeStyle = hexToRgbA("#d6c5fc", STAGE_CACHE.opacity);
		ctx.fillStyle = hexToRgbA("#d6c5fc", STAGE_CACHE.opacity / 3);

		if (this.touching) {
			ctx.strokeStyle = hexToRgbA("#f5d88e", STAGE_CACHE.opacity);
			ctx.fillStyle = hexToRgbA("#f5d88e", STAGE_CACHE.opacity / 3);
		}

		const rX = this.x + 10;
		const rY = this.y + 10;
		const rWidth = this.width - 10;
		const rHeight = this.height - 10;

		ctx.strokeRect(rX, rY, rWidth, rHeight);
		ctx.fillRect(rX, rY, rWidth, rHeight);

		//render info
		ctx.textAlign = "center";
		ctx.fillStyle = `rgba(255, 255, 255, ${STAGE_CACHE.opacity})`;
		const cX = rX + rWidth / 2;

		//title
		const titleSize = 180 / this.settings.title.length;
		ctx.font = `${titleSize}px UniSansHeavy`;
		ctx.fillText(this.settings.title, cX, rY + 32);

		//everything else
		ctx.font = "15px UniSansHeavy";

		//left padding

		//Notes
		ctx.fillText(`Notes — ${this.noteFormatter()}`, cX, rY + 60);

		//Lives
		ctx.fillText(`Lives — ${this.settings.maxLives}`, cX, rY + 80);

		//Bubbles
		ctx.fillText(`Bubbles — ${this.settings.minBubbles}-${this.settings.maxBubbles}`, cX, rY + 100);

		//Wave/Level count
		ctx.fillText(`Waves/Levels — ${this.settings.waveCount}/${this.settings.levelCount}`, cX, rY + 120);

		//Blind mode
		ctx.fillText(`Blind Mode — ${this.settings.blind ? "On" : "Off"}`, cX, rY + 140);

		//Falling speed
		ctx.fillText(`Fall Speed — ${this.settings.fallingSpeed}`, cX, rY + 160);

		//Octaves
		ctx.fillText(`Octaves — +${this.settings.octaveUpRange}/-${this.settings.octaveDownRange}`, cX, rY + 180);

		//Punish amount
		ctx.fillText(`Punish Gap — ${this.settings.punishOffset}`, cX, rY + 200);
	}
}