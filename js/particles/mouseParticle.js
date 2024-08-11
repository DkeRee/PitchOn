class MouseParticle extends Particle {
	constructor(x, y, color) {
		super(x, y);

		this.color = color;
		this.opacity = 1;
		this.radius = randRange(2, 4);
		this.speed = randRange(1, 3);
		this.angle = degToRad(randRange(0, 360));
	}

	update() {
		this.x += this.speed * Math.cos(this.angle);
		this.y += this.speed * Math.sin(this.angle);

		this.speed -= 0.01;
		this.opacity -= 0.02;

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