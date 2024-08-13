class BoxWidget {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	touchingMouse() {
		const dist = {
			x: Math.abs(MOUSE.x - this.x - this.width / 2),
			y: Math.abs(MOUSE.y - this.y - this.height / 2)
		};

		if (dist.x > (this.width / 2 + MOUSE.radius)) return false;
		if (dist.y > (this.height / 2 + MOUSE.radius)) return false;

		if (dist.x <= (this.width / 2)) return true;
		if (dist.y <= (this.height / 2)) return true;

		const cornerSq = Math.pow(dist.x - this.width / 2, 2) + Math.pow(dist.y - this.height / 2, 2);

		return cornerSq <= MOUSE.radius * MOUSE.radius;
	}

	renderTest() {
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}