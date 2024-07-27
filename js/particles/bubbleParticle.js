class BubbleParticle extends Particle {
	constructor(x, y, bubbleRadius, color) {
		const angle = degToRad(randRange(0, 360));
		x += bubbleRadius * Math.cos(angle);
		y += bubbleRadius * Math.sin(angle);

		super(x, y);
		this.color = color;
		this.opacity = 1;
		this.radius = randRange(2, 8);
		this.speed = randRange(5, 10);
		this.angle = angle;
	}

	update() {
		this.x += this.speed * Math.cos(this.angle);
		this.y += this.speed * Math.sin(this.angle);

		this.opacity -= 0.08;

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