class MusicBubble extends Bubble {
	constructor(x, y, radius, color, noteRange) {
		super(x, y, radius, color);

		//music stuffs
		this.note = noteRange[randRange(0, noteRange.length - 1)];
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
			if (this.note == STAGE_CACHE.toneMenu.getSelected()) {
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