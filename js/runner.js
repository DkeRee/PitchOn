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
		//Stage switcher
		if (!STAGE_CACHE || (STAGE_CACHE && !STAGE_CACHE.ongoing)) {
			switch (NEXT_STAGE) {
				case OPENING:
					STAGE_CACHE = new TitleScreen(); //set opening
					break;
				case MENU:
					STAGE_CACHE;//set menu
					break;
				case EDITOR:
					STAGE_CACHE;//editor
					break;
				case GAME:
					STAGE_CACHE = new RoundManager(ROUND_PRESET); //set new round
					break;
			}
		}

		for (var i = 0; i < PARTICLES.length; i++) {
			const particle = PARTICLES[i];

			if (particle.delete) {
				PARTICLES.splice(i, 1);
				continue;
			}

			particle.update();
		}

		if (STAGE_CACHE)
			STAGE_CACHE.update();

		MOUSE.update();
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
		for (var i = 0; i < PARTICLES.length; i++) {
			PARTICLES[i].render();
		}

		if (STAGE_CACHE)
			STAGE_CACHE.render();

		MOUSE.render();
	}

	canvas.addEventListener("mousedown", e => {
		MOUSE.updateMouseGoal(e.clientX, e.clientY);
		MOUSE.holding = true;
		INTERACTED = true;
	});

	canvas.addEventListener("mouseup", () => {
		MOUSE.holding = false;
	});

	canvas.addEventListener("mousemove", e => {
		MOUSE.updateMouseGoal(e.clientX, e.clientY);
	});

	window.addEventListener("keydown", e => {
		KEYBINDS[e.keyCode || e.which] = true;
		INTERACTED = true;

		//avoid space bar from scrolling down
		if (e.keyCode == 32) {
			e.preventDefault();
		}
	});

	window.addEventListener("keyup", e => {
		delete KEYBINDS[e.keyCode || e.which];

		//avoid space bar from scrolling down
		if (e.keyCode == 32) {
			e.preventDefault();
		}
	});
})();