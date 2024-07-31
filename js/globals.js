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

//MUSIC SYNTH
const bubbleToneSynth = new Tone.Synth().toDestination();