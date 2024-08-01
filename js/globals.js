const html = document.querySelector("html");
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const VERSION = "1.0.0";

//essential delta time info//
const deltaTime = 1 / 60;
var accTime = 0;
var lastTime = 0;

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 750;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

//CURRENT STAGE
var STAGE_CACHE;

var holding = false;
const KEYBINDS = {};
var MOUSE_POS = {
	x: 0,
	y: 0
}

function updateMousePos(clientX, clientY) {
	const rect = canvas.getBoundingClientRect();
	MOUSE_POS = {
		x: clientX - rect.left,
		y: clientY - rect.top
	};
}

const DANGER_COLOR = "#EE4B2B";

//AUDIO STUFFS//

//MUSIC SYNTH
const bubbleToneSynth = new Tone.Synth().toDestination();

//SOUND FX
const incorrectPitch = new Audio("soundFx/incorrectPitch.wav");
const switchTone = new Audio("soundFx/switchTone.mp3");
const pop = new Audio("soundFx/pop.wav");
const popGood = new Audio("soundFx/popGood.wav");
const popBad = new Audio("soundFx/popBad.wav");
const wobbleIn = new Audio("soundFx/wobbleIn.wav");
const popIn = new Audio("soundFx/popIn.wav");
const levelBeat = new Audio("soundFx/levelBeat.wav");
const waveBeat = new Audio("soundFx/waveBeat.wav");
const gameFinish = new Audio("soundFx/gameFinish.wav");
const gameFail = new Audio("soundFx/gameFail.wav");

function playSound(sound) {
	sound.currentTime = 0;
	sound.play();
}

//OTHER CONSTANTS
const NATURAL_BUBBLE_RADIUS = 60;