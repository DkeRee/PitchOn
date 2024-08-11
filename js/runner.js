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
		/*
		if (!STAGE_CACHE || (STAGE_CACHE && !STAGE_CACHE.ongoing)) {
			switch (NEXT_STAGE) {
				case OPENING:
					STAGE_CACHE; //new TitleScreen();//set opening
					break;
				case MENU:
					STAGE_CACHE;//set menu
					break;
				case EDITOR:
					STAGE_CACHE;//editor
					break;
				case GAME:
					STAGE_CACHE;//round manager
					break;
			}
		}
		*/

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

		if (STAGE_CACHE)
			STAGE_CACHE.render();

		MOUSE.render();
	}

	canvas.addEventListener("mousedown", e => {
		MOUSE.updateMouseGoal(e.clientX, e.clientY);
		MOUSE.holding = true;
	});

	canvas.addEventListener("mouseup", () => {
		MOUSE.holding = false;
	});

	canvas.addEventListener("mousemove", e => {
		MOUSE.updateMouseGoal(e.clientX, e.clientY);
	});

	window.addEventListener("keydown", e => {
		KEYBINDS[e.keyCode || e.which] = true;

		//avoid space bar from scrolling down
		if (e.keyCode == 32) {
			e.preventDefault();
		}

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
				difficultyProgression: {
					bubbleAmp: 0,
					fallAmp: 0,
					punishAmp: 0
				},
				blind: false,
				fallingSpeed: 0.2,
				punishOffset: 11,
				wantOctave: false,
				maxLives: 3,
				toneRange: ["C", "Gb", "A#", "B"],
				octaveUpRange: 0,
				octaveDownRange: 0,
				waveCount: 2,
				levelCount: 3,
				minBubbles: 1,
				maxBubbles: 1,
				minSpawnDelay: 4,
				maxSpawnDelay: 40,
				minSpawnReach: 100,
				maxSpawnReach: 300
			});
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