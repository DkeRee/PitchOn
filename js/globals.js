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

const ROUND_WIDGET_WIDTH = 220;
const ROUND_WIDGET_HEIGHT = 220;

//CURRENT STAGE
var STAGE_CACHE;
const PARTICLES = [];

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
const enter = new Audio("soundFx/enter.wav");
const whoosh = new Audio("soundFx/whoosh.wav");
const whooshSmall = new Audio("soundFx/whooshSmall.wav");
const selectIn = new Audio("soundFx/selectIn.wav");
const selectedBack = new Audio("soundFx/selectedBack.wav");
const gameStartOne = new Audio("soundFx/gameStartOne.wav");
const gameStartTwo = new Audio("soundFx/gameStartTwo.mp3");

//slight tweaks
wobbleIn.volume = 0.6;
switchAccidental.volume = 0.5;

function playSound(sound) {
	sound.currentTime = 0;
	sound.play();
}

//OTHER CONSTANTS
var INTERACTED = false;
const INDEX_TOOL = "CDEFGAB";
const NATURAL_BUBBLE_RADIUS = 75;
const ACCIDENTAL_BUBBLE_RADIUS = 35;
const OPENING = 0;
const MENU = 1;
const EDITOR = 2;
const GAME = 3;
var NEXT_STAGE = OPENING;
var ROUND_PRESET = {};