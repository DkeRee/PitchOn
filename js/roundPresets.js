const BEGINNER = {	
	title: "BEGINNER",
	difficultyProgression: {
		bubbleAmp: 0,
		fallAmp: 0,
		punishAmp: 0
	},
	blind: false,
	fallingSpeed: 0.4,
	punishOffset: 8,
	wantOctave: false,
	maxLives: 6,
	toneRange: ["C", "D", "E"],
	octaveUpRange: 0,
	octaveDownRange: 0,
	waveCount: 2,
	levelCount: 3,
	minBubbles: 4,
	maxBubbles: 2,
	minSpawnDelay: 20,
	maxSpawnDelay: 30,
	minSpawnReach: 50,
	maxSpawnReach: 100
};

const CDE_AMATEUR = { 
	title: "AMATEUR #1",
	difficultyProgression: {
		bubbleAmp: 0,
		fallAmp: 0,
		punishAmp: 0
	},
	blind: false,
	fallingSpeed: 0.6,
	punishOffset: 10,
	wantOctave: false,
	maxLives: 3,
	toneRange: ["C", "D", "E"],
	octaveUpRange: 0,
	octaveDownRange: 0,
	waveCount: 2,
	levelCount: 3,
	minBubbles: 4,
	maxBubbles: 5,
	minSpawnDelay: 4,
	maxSpawnDelay: 40,
	minSpawnReach: 50,
	maxSpawnReach: 150
};

const FGAB_AMATEUR = { 
	title: "AMATEUR #2",
	difficultyProgression: {
		bubbleAmp: 0,
		fallAmp: 0,
		punishAmp: 0
	},
	blind: false,
	fallingSpeed: 0.6,
	punishOffset: 10,
	wantOctave: false,
	maxLives: 3,
	toneRange: ["F", "G", "A", "B"],
	octaveUpRange: 0,
	octaveDownRange: 0,
	waveCount: 2,
	levelCount: 3,
	minBubbles: 4,
	maxBubbles: 5,
	minSpawnDelay: 4,
	maxSpawnDelay: 40,
	minSpawnReach: 50,
	maxSpawnReach: 150
};

const FULL_NATURAL = { 
	title: "FULL NATURAL",
	difficultyProgression: {
		bubbleAmp: 0,
		fallAmp: 0,
		punishAmp: 0
	},
	blind: false,
	fallingSpeed: 0.65,
	punishOffset: 11,
	wantOctave: false,
	maxLives: 3,
	toneRange: ["C", "D", "E", "F", "G", "A", "B"],
	octaveUpRange: 0,
	octaveDownRange: 0,
	waveCount: 3,
	levelCount: 5,
	minBubbles: 4,
	maxBubbles: 7,
	minSpawnDelay: 4,
	maxSpawnDelay: 40,
	minSpawnReach: 50,
	maxSpawnReach: 150
};

const CD_ACCIDENTAL = { 
	title: "ACCIDENTAL #1",
	difficultyProgression: {
		bubbleAmp: 0,
		fallAmp: 0,
		punishAmp: 0
	},
	blind: false,
	fallingSpeed: 0.5,
	punishOffset: 8,
	wantOctave: false,
	maxLives: 3,
	toneRange: ["C#", "D#"],
	octaveUpRange: 0,
	octaveDownRange: 0,
	waveCount: 2,
	levelCount: 3,
	minBubbles: 3,
	maxBubbles: 5,
	minSpawnDelay: 4,
	maxSpawnDelay: 40,
	minSpawnReach: 50,
	maxSpawnReach: 150
};

const FGA_ACCIDENTAL = { 
	title: "ACCIDENTAL #2",
	difficultyProgression: {
		bubbleAmp: 0,
		fallAmp: 0,
		punishAmp: 0
	},
	blind: false,
	fallingSpeed: 0.5,
	punishOffset: 8,
	wantOctave: false,
	maxLives: 3,
	toneRange: ["F#", "G#", "A#"],
	octaveUpRange: 0,
	octaveDownRange: 0,
	waveCount: 2,
	levelCount: 3,
	minBubbles: 3,
	maxBubbles: 5,
	minSpawnDelay: 4,
	maxSpawnDelay: 40,
	minSpawnReach: 50,
	maxSpawnReach: 150
};

const FULL_ACCIDENTAL_1 = { 
	title: "FULL ACC #1",
	difficultyProgression: {
		bubbleAmp: 0,
		fallAmp: 0,
		punishAmp: 0
	},
	blind: false,
	fallingSpeed: 0.65,
	punishOffset: 8,
	wantOctave: false,
	maxLives: 5,
	toneRange: ["C#", "D#", "F#", "G#", "A#"],
	octaveUpRange: 0,
	octaveDownRange: 0,
	waveCount: 2,
	levelCount: 3,
	minBubbles: 3,
	maxBubbles: 5,
	minSpawnDelay: 4,
	maxSpawnDelay: 40,
	minSpawnReach: 50,
	maxSpawnReach: 150
};

const FULL_ACCIDENTAL_2 = { 
	title: "FULL ACC #2",
	difficultyProgression: {
		bubbleAmp: 0,
		fallAmp: 0,
		punishAmp: 0
	},
	blind: false,
	fallingSpeed: 0.65,
	punishOffset: 11,
	wantOctave: false,
	maxLives: 3,
	toneRange: ["C#", "D#", "F#", "G#", "A#"],
	octaveUpRange: 0,
	octaveDownRange: 0,
	waveCount: 3,
	levelCount: 5,
	minBubbles: 7,
	maxBubbles: 10,
	minSpawnDelay: 4,
	maxSpawnDelay: 40,
	minSpawnReach: 50,
	maxSpawnReach: 150
};

const FULL_CHROMATIC = { 
	title: "CHROMATIC",
	difficultyProgression: {
		bubbleAmp: 0,
		fallAmp: 0,
		punishAmp: 0
	},
	blind: false,
	fallingSpeed: 0.65,
	punishOffset: 11,
	wantOctave: false,
	maxLives: 3,
	toneRange: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
	octaveUpRange: 0,
	octaveDownRange: 0,
	waveCount: 3,
	levelCount: 5,
	minBubbles: 4,
	maxBubbles: 6,
	minSpawnDelay: 4,
	maxSpawnDelay: 40,
	minSpawnReach: 50,
	maxSpawnReach: 150
};

const OCTAVE_FULL_NAT = { 
	title: "OCTAVE #1",
	difficultyProgression: {
		bubbleAmp: 0,
		fallAmp: 0,
		punishAmp: 0
	},
	blind: false,
	fallingSpeed: 0.65,
	punishOffset: 11,
	wantOctave: false,
	maxLives: 3,
	toneRange: ["C", "D", "E", "F", "G", "A", "B"],
	octaveUpRange: 1,
	octaveDownRange: 1,
	waveCount: 3,
	levelCount: 5,
	minBubbles: 7,
	maxBubbles: 10,
	minSpawnDelay: 4,
	maxSpawnDelay: 40,
	minSpawnReach: 50,
	maxSpawnReach: 150
};

const OCTAVE_FULL_ACC = { 
	title: "OCTAVE #2",
	difficultyProgression: {
		bubbleAmp: 0,
		fallAmp: 0,
		punishAmp: 0
	},
	blind: false,
	fallingSpeed: 0.65,
	punishOffset: 11,
	wantOctave: false,
	maxLives: 3,
	toneRange: ["C#", "D#", "F#", "G#", "A#"],
	octaveUpRange: 1,
	octaveDownRange: 1,
	waveCount: 3,
	levelCount: 5,
	minBubbles: 7,
	maxBubbles: 10,
	minSpawnDelay: 4,
	maxSpawnDelay: 40,
	minSpawnReach: 50,
	maxSpawnReach: 150
};

const OCTAVE_FULL_CHROMATIC = {
	title: "OCTAVE #2",
	difficultyProgression: {
		bubbleAmp: 0,
		fallAmp: 0,
		punishAmp: 0
	},
	blind: false,
	fallingSpeed: 0.65,
	punishOffset: 11,
	wantOctave: false,
	maxLives: 3,
	toneRange: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
	octaveUpRange: 1,
	octaveDownRange: 1,
	waveCount: 3,
	levelCount: 5,
	minBubbles: 7,
	maxBubbles: 10,
	minSpawnDelay: 4,
	maxSpawnDelay: 40,
	minSpawnReach: 50,
	maxSpawnReach: 150
}

const CHROMATIC_BLIND_1 = {
	title: "BLIND #1",
	difficultyProgression: {
		bubbleAmp: 0,
		fallAmp: 0,
		punishAmp: 0
	},
	blind: true,
	fallingSpeed: 0.65,
	punishOffset: 11,
	wantOctave: false,
	maxLives: 3,
	toneRange: ["C", "C#", "D", "D#", "E", "F"],
	octaveUpRange: 0,
	octaveDownRange: 0,
	waveCount: 3,
	levelCount: 5,
	minBubbles: 4,
	maxBubbles: 6,
	minSpawnDelay: 4,
	maxSpawnDelay: 40,
	minSpawnReach: 50,
	maxSpawnReach: 150
};

const CHROMATIC_BLIND_2 = {
	title: "BLIND #2",
	difficultyProgression: {
		bubbleAmp: 0,
		fallAmp: 0,
		punishAmp: 0
	},
	blind: true,
	fallingSpeed: 0.65,
	punishOffset: 11,
	wantOctave: false,
	maxLives: 3,
	toneRange: ["F#", "G", "G#", "A", "A#", "B"],
	octaveUpRange: 0,
	octaveDownRange: 0,
	waveCount: 3,
	levelCount: 5,
	minBubbles: 4,
	maxBubbles: 6,
	minSpawnDelay: 4,
	maxSpawnDelay: 40,
	minSpawnReach: 50,
	maxSpawnReach: 150
}

const FULL_CHROMATIC_BLIND = { 
	title: "BLIND #3",
	difficultyProgression: {
		bubbleAmp: 0,
		fallAmp: 0,
		punishAmp: 0
	},
	blind: true,
	fallingSpeed: 0.65,
	punishOffset: 11,
	wantOctave: false,
	maxLives: 3,
	toneRange: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
	octaveUpRange: 0,
	octaveDownRange: 0,
	waveCount: 3,
	levelCount: 5,
	minBubbles: 4,
	maxBubbles: 6,
	minSpawnDelay: 4,
	maxSpawnDelay: 40,
	minSpawnReach: 50,
	maxSpawnReach: 150
};