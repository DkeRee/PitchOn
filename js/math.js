function dist(dX, dY) {
	return Math.sqrt(dX * dX + dY * dY);
}

function degToRad(deg) {
	return deg * Math.PI / 180;
}

function randRange(a, b) {
	return Math.floor(Math.random() * (b - a) + 1) + a;
}