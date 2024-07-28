(function() {
	//init game
	const BACKGROUND_COLOR_STRONG = "#281d42";
	const BACKGROUND_COLOR_WEAK = "#191229";

	STAGE_CACHE = {
		particles: [],
		touchedBubble: 0,
		touchFound: false,
		bubbles: [new NaturalBubble(100, 300), new NaturalBubble(400, 50), new NaturalBubble(500, 100), new NaturalBubble(200, 350)],
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
		STAGE_CACHE.touchFound = false;

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
				if (bubble.playing) {
					synth.triggerRelease(Tone.now());
				}

				STAGE_CACHE.bubbles.splice(i, 1);
				continue;
			}

			if (!STAGE_CACHE.touchFound) {
				if (bubble.isTouching()) {
					STAGE_CACHE.touchedBubble = bubble.id;
					STAGE_CACHE.touchFound = true;
				}
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