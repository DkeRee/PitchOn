class NaturalBubble extends MusicBubble {
	constructor(x, y) {
		const noteRange = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
		const colors = ["#c9b5f7", "#b5bcf7", "#e8b5f7"];
		super(x, y, 60, colors[randRange(0, 2)], noteRange);
	}
}