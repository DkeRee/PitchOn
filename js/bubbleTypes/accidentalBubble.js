class AccidentalBubble extends MusicBubble {
	constructor(x, y, note) {
		const colors = ["#a5f05b", "#f0795b", "#5ba3f0", "#f0e551"];
		super(x, y, ACCIDENTAL_BUBBLE_RADIUS, colors[randRange(0, colors.length - 1)], note);
	}
}