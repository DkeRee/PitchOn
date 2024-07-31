class BubbleFade extends Particle {
	constructor(x, y, color) {
		super(x, y);

		this.color = color;
		this.opacity = 1;
		this.radius = randRange(6, 13);
		this.speed = randRange(10, 15);
		this.angle = degToRad(randRange(0, 360));

		this.walkCounter = 5;
	}

	walk() {
		if (this.walkCounter > 0) {
			this.walkCounter--;
		} else {
			this.walkCounter = 5;
			const randOffset = degToRad(randRange(40, 60));
			return this.angle + (Math.random() > 0.5 ? randOffset : -randOffset);
		}

		return this.angle;
	}

	update() {
		this.x += this.speed * Math.cos(this.angle);
		this.y += this.speed * Math.sin(this.angle);

		this.angle %= degToRad(360);

		this.angle = this.walk();

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