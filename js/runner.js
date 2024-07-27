(function() {
	//init game
	const BACKGROUND_COLOR_STRONG = "#281d42";
	const BACKGROUND_COLOR_WEAK = "#191229";

	STAGE_CACHE = {
		particles: [],
		bubbles: [new NaturalBubble(100, 600)],
		sea: new Sea(700)
	}

	function globalStep(time) {
		accTime += (time - lastTime) / 1000;

		while (accTime > deltaTime) {
			if (accTime > 1) {
				accTime = deltaTime;
			}

			globalUpdate();
			accTime -= deltaTime;
		}
		lastTime = time;
		globalRender();
		requestAnimationFrame(globalStep);
	}
	requestAnimationFrame(globalStep);

	function globalUpdate() {
		for (var i = 0; i < STAGE_CACHE.particles.length; i++) {
			const particle = STAGE_CACHE.particles[i];

			if (particle.delete) {
				STAGE_CACHE.particles.splice(i, 1);
				continue;
			}

			particle.update();
		}

		for (var i = 0; i < STAGE_CACHE.bubbles.length; i++) {
			const bubble = STAGE_CACHE.bubbles[i];

			if (bubble.delete) {
				STAGE_CACHE.bubbles.splice(i, 1);
				continue;
			}

			bubble.update();
		}

		STAGE_CACHE.sea.update();
	}

	function globalRender() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//background gradient
		var grd = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, CANVAS_WIDTH / 20, canvas.width / 2, canvas.height / 2, CANVAS_WIDTH);
		grd.addColorStop(0, BACKGROUND_COLOR_STRONG);
		grd.addColorStop(1, BACKGROUND_COLOR_WEAK);

		//RENDER BACKGROUND//
		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		//render particles
		for (var i = 0; i < STAGE_CACHE.particles.length; i++) {
			STAGE_CACHE.particles[i].render();
		}

		//render bubbles
		for (var i = 0; i < STAGE_CACHE.bubbles.length; i++) {
			STAGE_CACHE.bubbles[i].render();
		}

		//render sea
		STAGE_CACHE.sea.render();
	}

	canvas.addEventListener("mousedown", e => {
		updateMousePos(e.clientX, e.clientY);
		holding = true;
	});

	canvas.addEventListener("mouseup", () => {
		holding = false;
	});

	canvas.addEventListener("mousemove", e => {
		updateMousePos(e.clientX, e.clientY);
	});

	window.addEventListener("keydown", e => {
		KEYBINDS[e.keyCode || e.which] = true;
	});

	window.addEventListener("keyup", e => {
		delete KEYBINDS[e.keyCode || e.which];
	});
})();