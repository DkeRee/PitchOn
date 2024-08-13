class TopParticle extends Particle {
	constructor() {
		super(randRange(10, CANVAS_WIDTH - 10), -20);
		this.speed = randRange(3, 7);
		this.radius = randRange(4, 7);
		this.color = "#edadf0";
		this.opacity = 0.7;
	}

	update() {
		this.y += this.speed;
		this.speed -= 0.01;

		this.opacity -= 0.004;

		if (this.opacity <= 0) {
			this.delete = true;
		}
	}

	render() {
		const color = hexToRgbA(this.color, this.opacity);
		ctx.shadowBlur = 20;
		ctx.shadowColor = color;
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.shadowBlur = 0;
	}
}