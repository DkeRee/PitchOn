const Z = 0;
const X = 1;

class ToneMenu {
	constructor(toneList) {
		this.toneIndex = 0;
		this.toneList = toneList;

		//keybind info
		this.held = false;
		this.lastHeld = -1;
	}

	getSelected() {
		return this.toneList[this.toneIndex];
	}

	updateSelectorBind() {
		//structure where mashing keys will end up moving down only
		if (!this.held) {
			if (KEYBINDS[88]) {
				//X
				if (this.toneIndex + 1 < this.toneList.length) {
					this.toneIndex++;
					this.held = true;
					this.lastHeld = X;
					console.log(this.getSelected());
				}
			} else if (KEYBINDS[90]) {
				//Z
				if (this.toneIndex - 1 > -1) {
					this.toneIndex--;
					this.held = true;
					this.lastHeld = Z;
					console.log(this.getSelected());
				}
			}
		} else {
			if (!KEYBINDS[88] && this.lastHeld == X) {
				this.held = false;
			} else if (!KEYBINDS[90] && this.lastHeld == Z) {
				this.held = false;
			}
		}
	}

	update() {
		this.updateSelectorBind();
	}

	render() {

	}
}