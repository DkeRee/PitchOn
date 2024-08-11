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

const KEYBINDS = {};

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
const switchAccidental = new Audio("soundFx/switchAccidental.wav");
const gameStart = new Audio("soundFx/gameStart.wav");

//slight tweaks
wobbleIn.volume = 0.6;
switchAccidental.volume = 0.5;

function playSound(sound) {
	sound.currentTime = 0;
	sound.play();
}

//OTHER CONSTANTS
const NATURAL_BUBBLE_RADIUS = 75;
const ACCIDENTAL_BUBBLE_RADIUS = 35;
const OPENING = 0;
const MENU = 1;
const EDITOR = 2;
const GAME = 3;
const NEXT_STAGE = OPENING;
var ROUND_PRESET = {};