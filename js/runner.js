(function() {
	//init game
	const BACKGROUND_COLOR_STRONG = "#281d42";
	const BACKGROUND_COLOR_WEAK = "#191229";

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
		if (STAGE_CACHE)
			STAGE_CACHE.update();
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

		if (STAGE_CACHE)
			STAGE_CACHE.render();
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

		var create = false;

		//temp
		if (KEYBINDS[82]) {
			if (!STAGE_CACHE) {
				create = true;
			} else {
				if (!STAGE_CACHE.ongoing)
					create = true;
			}
		}

		if (create) {
			STAGE_CACHE = new RoundManager({
				fallingSpeed: 0.5,
				wantOctave: false,
				maxLives: 3,
				toneRange: ["C4", "D4", "E4"],
				waveCount: 3,
				levelCount: 6,
				minBubbles: 15,
				maxBubbles: 20,
				minSpawnDelay: 4,
				maxSpawnDelay: 40,
				minSpawnReach: 100,
				maxSpawnReach: 300
			});
		}
	});

	window.addEventListener("keyup", e => {
		delete KEYBINDS[e.keyCode || e.which];
	});
})();