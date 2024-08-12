class SideParticle extends Particle {
	constructor() {
		super((Math.random() > 0.5 ? (-20) : (CANVAS_WIDTH + 20)), randRange(10, CANVAS_HEIGHT - 10));
		this.mvSign = Math.sign(this.x);
		this.speed = randRange(5, 15);
		this.radius = randRange(3, 5);
		this.color = "#f7e2ad";
		this.opacity = 0.7;
	}

	update() {
		this.x += this.mvSign * this.speed;
		this.speed -= 0.4;

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