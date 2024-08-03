class AccidentalBubble extends MusicBubble {
	constructor(x, y, note) {
		const colors = ["#a5f05b", "#f0795b", "#5ba3f0", "#f0e551"];
		super(x, y, (STAGE_CACHE.settings.blind ? 50 : ACCIDENTAL_BUBBLE_RADIUS), (STAGE_CACHE.settings.blind ? "#6b6f75" : colors[randRange(0, colors.length - 1)]), note);
	}
}