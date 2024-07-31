class NaturalBubble extends MusicBubble {
	constructor(x, y, note) {
		const colors = ["#c9b5f7", "#b5bcf7", "#e8b5f7"];
		super(x, y, 60, colors[randRange(0, 2)], note);
	}
}