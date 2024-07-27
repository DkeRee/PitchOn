class Particle {
	constructor(x, y, side) {
		this.x = x;
		this.y = y;
		this.side = side;
		this.delete = false;

		if (side) {
			this.centerX = this.x + this.side / 2;
			this.centerY = this.y + this.side / 2;
		}
	}
}