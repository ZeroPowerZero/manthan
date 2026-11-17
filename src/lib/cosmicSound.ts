// Procedural Ethereal Ambient Celestial Soundscape Engine (Web Audio API)
// Generates continuous meditative cosmic drone pads + generative celestial bells + interactive click chimes.
// Zero external audio assets, infinite non-repeating generative ambient music.

let audioCtx: AudioContext | null = null;
let soundEnabled = false;
let masterGain: GainNode | null = null;
let droneGains: GainNode[] = [];
let droneOscs: OscillatorNode[] = [];
let lfoOsc: OscillatorNode | null = null;
let lfoGain: GainNode | null = null;
let delayNodeL: DelayNode | null = null;
let delayNodeR: DelayNode | null = null;
let delayFeedback: GainNode | null = null;
let musicIntervalId: number | null = null;

const PENTATONIC_SCALE = [
  293.66, // D4
  329.63, // E4
  369.99, // F#4
  440.00, // A4
  493.88, // B4
  587.33, // D5
  659.25, // E5
  739.99, // F#5
  880.00, // A5
  987.77, // B5
];

const initAudioContext = () => {
  if (audioCtx) return;
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  audioCtx = new AudioContextClass();

  // Master Gain for smooth fade-ins and fade-outs
  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0, audioCtx.currentTime);

  // Ethereal Space Delay / Echo network
  delayNodeL = audioCtx.createDelay(1.5);
  delayNodeR = audioCtx.createDelay(1.5);
  delayNodeL.delayTime.value = 0.48; // Left delay tap
  delayNodeR.delayTime.value = 0.72; // Right delay tap

  delayFeedback = audioCtx.createGain();
  delayFeedback.gain.value = 0.35;

  const delayFilter = audioCtx.createBiquadFilter();
  delayFilter.type = 'lowpass';
  delayFilter.frequency.value = 1400; // Soften delay repeats

  // Cross-feedback network
  delayNodeL.connect(delayFilter);
  delayNodeR.connect(delayFilter);
  delayFilter.connect(delayFeedback);
  delayFeedback.connect(delayNodeL);
  delayFeedback.connect(delayNodeR);

  // Connect delay to master
  const delayOutGain = audioCtx.createGain();
  delayOutGain.gain.value = 0.45;
  delayFilter.connect(delayOutGain);
  delayOutGain.connect(masterGain);

  masterGain.connect(audioCtx.destination);
};

const startAmbientDrone = () => {
  if (!audioCtx || !masterGain) return;

  stopAmbientDrone(); // Clear existing if any

  const now = audioCtx.currentTime;

  // LFO (Low Frequency Oscillator) for gentle breathing drone sweep
  lfoOsc = audioCtx.createOscillator();
  lfoGain = audioCtx.createGain();
  lfoOsc.type = 'sine';
  lfoOsc.frequency.value = 0.08; // 12-second breath cycle
  lfoGain.gain.value = 140; // Filter modulation depth

  const droneFilter = audioCtx.createBiquadFilter();
  droneFilter.type = 'lowpass';
  droneFilter.frequency.setValueAtTime(320, now);
  lfoOsc.connect(lfoGain);
  lfoGain.connect(droneFilter.frequency);
  lfoOsc.start(now);

  // Harmonic chord frequencies for deep space meditative drone
  // D2 (73.42Hz), A2 (110Hz), D3 (146.83Hz), F#3 (185Hz), C#4 (277.18Hz - celestial 7th)
  const droneFrequencies = [73.42, 110.0, 146.83, 185.0, 277.18];
  droneGains = [];
  droneOscs = [];

  droneFrequencies.forEach((freq, idx) => {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();

    // Alternate sine and warm triangle waveforms
    osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle detune for rich celestial chorusing
    osc.detune.setValueAtTime((idx - 2) * 3.5, now);

    // Soft individual volume
    const vol = idx === 0 ? 0.12 : idx === 1 ? 0.09 : 0.05;
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(vol, now + 3);

    osc.connect(g);
    g.connect(droneFilter);

    osc.start(now);
    droneOscs.push(osc);
    droneGains.push(g);
  });

  droneFilter.connect(masterGain);
};

const stopAmbientDrone = () => {
  try {
    droneOscs.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    droneOscs = [];
    droneGains = [];

    if (lfoOsc) {
      try {
        lfoOsc.stop();
        lfoOsc.disconnect();
      } catch {
        // ignore
      }
      lfoOsc = null;
    }
  } catch {
    // ignore
  }
};

const playGenerativeBellNote = () => {
  if (!soundEnabled || !audioCtx || !masterGain) return;

  try {
    const now = audioCtx.currentTime;
    const freq = PENTATONIC_SCALE[Math.floor(Math.random() * PENTATONIC_SCALE.length)];

    // Dual-harmonic crystal bell
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const bellGain = audioCtx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.76, now); // Metallic celestial harmonic

    // Bell envelope: sharp attack, long gentle ringing decay
    bellGain.gain.setValueAtTime(0.0001, now);
    bellGain.gain.linearRampToValueAtTime(0.045, now + 0.05);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

    osc1.connect(bellGain);
    osc2.connect(bellGain);

    // Send to master and delay echo
    bellGain.connect(masterGain);
    if (delayNodeL && delayNodeR) {
      bellGain.connect(delayNodeL);
      bellGain.connect(delayNodeR);
    }

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 3.5);
    osc2.stop(now + 3.5);
  } catch {
    // ignore
  }
};

const scheduleNextGenerativeBell = () => {
  if (!soundEnabled) return;
  // Play note, then schedule next one with random humanized timing (every 2.8s - 5.5s)
  playGenerativeBellNote();
  const nextDelayMs = 2800 + Math.random() * 2700;
  musicIntervalId = window.setTimeout(() => {
    scheduleNextGenerativeBell();
  }, nextDelayMs);
};

export const toggleCosmicSound = (): boolean => {
  initAudioContext();
  if (!audioCtx || !masterGain) return false;

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  soundEnabled = !soundEnabled;

  const now = audioCtx.currentTime;

  if (soundEnabled) {
    // Smooth Fade In background music (1.5s)
    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.setValueAtTime(masterGain.gain.value, now);
    masterGain.gain.linearRampToValueAtTime(0.18, now + 1.5);

    // Start deep meditative drone & celestial bell melody generator
    startAmbientDrone();
    scheduleNextGenerativeBell();

    // Trigger an initial warm welcome chime
    playStardustChime(440);
  } else {
    // Smooth Fade Out (1.2s)
    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.setValueAtTime(masterGain.gain.value, now);
    masterGain.gain.linearRampToValueAtTime(0.0001, now + 1.2);

    if (musicIntervalId) {
      clearTimeout(musicIntervalId);
      musicIntervalId = null;
    }

    setTimeout(() => {
      if (!soundEnabled) {
        stopAmbientDrone();
      }
    }, 1300);
  }

  return soundEnabled;
};

export const isCosmicSoundEnabled = (): boolean => soundEnabled;

// Melodious Stardust Pentatonic Chime Scale (Warm, harmonious glass harp tones)
const STARDUST_NOTES = [587.33, 739.99, 880.00, 987.77, 1174.66, 1318.51];
let stardustIndex = 0;

export const playStardustChime = (customFreq?: number) => {
  if (!soundEnabled || !audioCtx || !masterGain) return;

  try {
    const now = audioCtx.currentTime;

    // Cycle harmoniously through the pentatonic scale for gentle melodious progressions
    const freq = customFreq || STARDUST_NOTES[stardustIndex % STARDUST_NOTES.length];
    stardustIndex++;

    // Soft crystalline bell tone using pure sine waves
    const oscMain = audioCtx.createOscillator();
    const oscOvertone = audioCtx.createOscillator();
    const chimeGain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    // Soft lowpass filter to remove harshness and create a velvety, round sound
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, now);
    filter.Q.setValueAtTime(0.7, now);

    oscMain.type = 'sine';
    oscMain.frequency.setValueAtTime(freq, now);

    // Warm, delicate octave overtone (pure crystal resonance)
    oscOvertone.type = 'sine';
    oscOvertone.frequency.setValueAtTime(freq * 2, now);

    // Ultra-soft, delicate gain envelope (reduced duration and gentle whispering intensity)
    chimeGain.gain.setValueAtTime(0.0001, now);
    chimeGain.gain.linearRampToValueAtTime(0.024, now + 0.015); // Soft gentle attack (no clicks)
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38); // Short, soft decay (0.38s)

    oscMain.connect(filter);
    oscOvertone.connect(filter);
    filter.connect(chimeGain);

    chimeGain.connect(masterGain);
    if (delayNodeL && delayNodeR) {
      // Gentle send to space delay for an ethereal, dreamy tail
      const sendGain = audioCtx.createGain();
      sendGain.gain.value = 0.35;
      chimeGain.connect(sendGain);
      sendGain.connect(delayNodeL);
      sendGain.connect(delayNodeR);
    }

    oscMain.start(now);
    oscOvertone.start(now);
    oscMain.stop(now + 0.42);
    oscOvertone.stop(now + 0.42);
  } catch {
    // Ignore audio context autoplay edge-cases
  }
};
