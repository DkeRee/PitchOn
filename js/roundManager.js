/*
	RoundManager shall receieve a certain set of parameters for the type of game that is about to be played.
	I'm writing this here to quite literally remind myself what the round params object is going to be like in case I get lost

	Param Details:
		fallingSpeed -> how fast the bubbles will fall, aka difficulty gouge
		wantOctave -> whether we want to add random octaves into the mix
		toneRange -> gives range of tones disregarding octaves
		waveCount -> how many waves of bubbles we want to spawn per level, each wave will have more and more bubbles
		levelCount -> how many levels we want to have
		maxBubbles -> max amount of bubbles per wave

		//add lives later
*/


class RoundManager {
	constructor(roundParams) {
		//params
		this.fallingSpeed = roundParams.fallingSpeed;
		this.wantOctave = roundParams.wantOctave;
		this.toneRange = roundParams.toneRange;
		this.waveCount = roundParams.waveCount;
		this.levelCount = roundParams.levelCount;
		this.maxBubbles = roundParams.maxBubbles;

		//necessities
		this.ongoing = true;
		this.particles = [];
		this.touchedBubble = 0;
		this.touchFound = false;
		this.bubbles = [];
		this.toneMenu;
		this.sea;

		//properties & other transitions
		this.startCounter = 50;
		this.startDone = false
	}

	initializationCare() {
		if (!this.startDone) {
			if (this.startCounter > 0) {
				this.startCounter--;
			} else {
				//initialize only NOW for dramatic effects!
				this.sea = new Sea(700);

				//set up tone menu...
				const toneMenuRange = [];

				for (var i = 0; i < this.toneRange.length; i++) {
					const note = this.toneRange[i].substring(0, 1);

					//double check to see if there's a sharp or flat duplicate, or if there already is a sharp or flat then natural duplicate
					//either way, we are going to use holding shift to determine sharp/flat fluctuation when clicking on the bubbles, so it doesn't matter which comes first
					var skip = false;
					for (var k = 0; k < toneMenuRange.length; k++) {
						const tNote = toneMenuRange[k];

						if (note == tNote) {
							skip = true;
							break;
						}
					}
					if (skip) continue;

					toneMenuRange.push(note);
				}

				this.toneMenu = new ToneMenu(toneMenuRange);
				this.startDone = true;
			}
		}
	}

	updateLogic() {
		this.initializationCare();
	}

	updateContent() {
		this.touchFound = false;

		for (var i = 0; i < this.particles.length; i++) {
			const particle = this.particles[i];

			if (particle.delete) {
				this.particles.splice(i, 1);
				continue;
			}

			particle.update();
		}

		for (var i = 0; i < this.bubbles.length; i++) {
			const bubble = this.bubbles[i];

			if (bubble.delete) {
				if (bubble.playing) {
					bubbleToneSynth.triggerRelease(Tone.now());
				}

				this.bubbles.splice(i, 1);
				continue;
			}

			if (!this.touchFound) {
				if (bubble.isTouching()) {
					this.touchedBubble = bubble.id;
					this.touchFound = true;
				}
			}

			bubble.update();
		}

		this.toneMenu.update();
		this.sea.update();
	}

	renderContent() {
		//render particles
		for (var i = 0; i < this.particles.length; i++) {
			this.particles[i].render();
		}

		//render bubbles
		for (var i = 0; i < this.bubbles.length; i++) {
			this.bubbles[i].render();
		}

		//render sea
		this.sea.render();

		//render tonemenu
		this.toneMenu.render();
	}

	update() {
		this.updateLogic();

		if (this.ongoing && this.startDone)
			this.updateContent();
	}

	render() {
		if (this.ongoing && this.startDone)
			this.renderContent();
	}
}