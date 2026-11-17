// Procedural Web Audio Synthesizer for Ethereal Celestial Chimes (Zero External Assets)

let audioCtx: AudioContext | null = null;
let soundEnabled = false;

export const toggleCosmicSound = (): boolean => {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    playStardustChime(440); // Welcome chime
  }
  return soundEnabled;
};

export const isCosmicSoundEnabled = (): boolean => soundEnabled;

export const playStardustChime = (freq = 880) => {
  if (!soundEnabled) return;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (!audioCtx) return;

  try {
    const now = audioCtx.currentTime;

    // Dual-tone harmonic crystal chime
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);
    osc1.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.5);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 1.5, now);
    osc2.frequency.exponentialRampToValueAtTime(freq * 2, now + 0.6);

    gainNode.gain.setValueAtTime(0.06, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.7);
    osc2.stop(now + 0.7);
  } catch {
    // Ignore audio context autoplay edge-cases
  }
};
