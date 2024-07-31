class MusicBubble extends Bubble {
	constructor(x, y, radius, color, note) {
		super(x, y, radius, color);

		//music stuffs
		this.note = note;
		this.playing = false;
	}

	updateSound() {
		const now = Tone.now();
		if (this.checkServerTouching()) {
			if (!this.playing) {
				bubbleToneSynth.triggerAttack(this.note, now);
				this.playing = true;
			}
		} else {
			if (this.playing) {
				bubbleToneSynth.triggerRelease(now);
				this.playing = false;
			}
		}
	}

	updatePop() {
		if (this.checkServerTouching() && holding && !this.alarming) {
			//check for whether you have the right sound selected
			//use substring to disregard octaves
			if (this.note.substring(0, 1) == STAGE_CACHE.toneMenu.getSelected()) {
				playSound(popGood);
				this.killSelf(this.color);
			} else {
				playSound(incorrectPitch);
				this.alarmSelf();
			}


			holding = false;
		}
	}

	update() {
		this.updateSound();
		this.updatePop();
		super.update();
	}
}