class RippleParticle extends Particle {
	constructor(x, y, radius, color) {
		super(x, y);
		this.color = color;
		this.radius = radius;
		this.opacity = 1;
		this.radiusExpansion = 15;
	}

	update() {
		this.radiusExpansion -= 0.9;
		this.opacity -= 0.062;

		this.radius += this.radiusExpansion;

		if (this.opacity <= 0) {
			this.delete = true;
		}
	}

	render() {
		ctx.shadowBlur = 40;
		ctx.shadowColor = hexToRgbA(this.color, this.opacity);

		ctx.strokeStyle = hexToRgbA(this.color, this.opacity);
		ctx.lineWidth = 6;

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.stroke();

		ctx.shadowColor = 0;
	}
}