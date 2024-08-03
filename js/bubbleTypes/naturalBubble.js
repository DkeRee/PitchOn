class NaturalBubble extends MusicBubble {
	constructor(x, y, note) {
		const colors = ["#c9b5f7", "#b5bcf7", "#f57ad0"];
		super(x, y, (STAGE_CACHE.settings.blind ? 50 : NATURAL_BUBBLE_RADIUS), (STAGE_CACHE.settings.blind ? "#6b6f75" : colors[randRange(0, colors.length - 1)]), note);
	}
}