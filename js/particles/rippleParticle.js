class RippleParticle extends Particle {
	constructor(x, y, color) {
		super(x, y);
		this.color = color;
		this.radius = 1;
		this.opacity = 1;
		this.radiusExpansion = 20;
	}

	update() {
		this.radiusExpansion -= 0.9;
		this.opacity -= 0.04;

		this.radius += this.radiusExpansion;

		if (this.opacity <= 0) {
			this.delete = true;
		}
	}

	render() {
		ctx.shadowBlur = 40;
		ctx.shadowColor = hexToRgbA(this.color, this.opacity);

		ctx.strokeStyle = hexToRgbA(this.color, this.opacity);
		ctx.lineWidth = 3;

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.stroke();

		ctx.shadowColor = 0;
	}
}