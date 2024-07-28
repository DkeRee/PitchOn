class MusicBubble extends Bubble {
	constructor(x, y, radius, color, noteRange) {
		super(x, y, radius, color);

		//music stuffs
		this.note = noteRange[randRange(0, noteRange.length - 1)];
		this.playing = false;
	}

	update() {
		const now = Tone.now();
		if (this.checkServerTouching()) {
			if (!this.playing) {
				synth.triggerAttack(this.note, now);
				this.playing = true;
			}
		} else {
			if (this.playing) {
				synth.triggerRelease(now);
				this.playing = false;
			}
		}

		super.update();
	}
}