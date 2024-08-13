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

	getIndexInc(index) {
		if (index + 1 == INDEX_TOOL.length) {
			return 0;
		} else {
			return index + 1;
		}
	}

	getIndexDec(index) {
		if (index - 1 == -1) {
			return INDEX_TOOL.length - 1;
		} else {
			return index - 1;
		}
	}

	checkMatching() {
		/*
			This gets a little tricky.
			This is being implemented with the pretense that specials like Cb4 will NOT get implemented inside a bubble note because that is the same thing as a natural B
			This will take into account for trying to achieve normal notes like B by switching to C flat.
			It will also take into account duplicates, like C# and Db are the same thing
		*/		

		//first check what mode we are in
		if (STAGE_CACHE.toneMenu.accidental == NATURAL) {
			if (this.note.length == 2) {
				return this.note.substring(0, 1) == STAGE_CACHE.toneMenu.getSelected();
			}
		} else {
			const answerNote = this.note.substring(0, 1);
			const answerIndex = INDEX_TOOL.indexOf(answerNote);

			if (this.note.length == 3) {
				const answerAccidental = this.note.substring(1, 2);

				if (answerAccidental == "#") {
					if (STAGE_CACHE.toneMenu.accidental == SHARP) {
						return answerNote == STAGE_CACHE.toneMenu.getSelected();
					} else {
						return INDEX_TOOL.charAt(this.getIndexInc(answerIndex)) == STAGE_CACHE.toneMenu.getSelected();
					}
				} else if (answerAccidental == "b") {
					if (STAGE_CACHE.toneMenu.accidental == FLAT) {
						return answerNote == STAGE_CACHE.toneMenu.getSelected();
					} else {
						return INDEX_TOOL.charAt(this.getIndexDec(answerIndex)) == STAGE_CACHE.toneMenu.getSelected();
					}
				}
			} else if (this.note.length == 2) {
				const toneMenuSelected = STAGE_CACHE.toneMenu.getSelected();
				const toneMenuSelectedIndex = INDEX_TOOL.indexOf(toneMenuSelected);

				if (STAGE_CACHE.toneMenu.accidental == SHARP) {
					const special = toneMenuSelected == "B" || toneMenuSelected == "E";
					return special && INDEX_TOOL.charAt(this.getIndexInc(toneMenuSelectedIndex)) == answerNote;
				} else if (STAGE_CACHE.toneMenu.accidental == FLAT) {
					const special = toneMenuSelected == "C" || toneMenuSelected == "F";
					return special && INDEX_TOOL.charAt(this.getIndexDec(toneMenuSelectedIndex)) == answerNote;
				}
			}
		}

		return false;
	}

	updatePop() {
		if (this.checkServerTouching() && MOUSE.holding && !this.alarming) {
			//check for whether you have the right sound selected
			//use substring to disregard octaves
			if (this.checkMatching()) {
				playSound(popGood);
				this.killSelf(this.color);
			} else {
				playSound(incorrectPitch);
				this.alarmSelf();
			}


			MOUSE.holding = false;
		}
	}

	update() {
		this.updateSound();
		this.updatePop();
		super.update();
	}
}