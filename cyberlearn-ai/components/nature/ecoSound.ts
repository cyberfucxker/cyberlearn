// Tiny synthesized nature SFX (no audio assets) via Web Audio API.
let ctx: AudioContext | null = null;
let enabled = false;

const getCtx = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return null;
    ctx = new Ctx();
  }
  return ctx;
};

const noiseBurst = (duration: number, filterFreq: number, gainPeak: number) => {
  const audio = getCtx();
  if (!audio) return;
  if (audio.state === 'suspended') audio.resume();

  const bufferSize = Math.floor(audio.sampleRate * duration);
  const buffer = audio.createBuffer(1, bufferSize, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }

  const source = audio.createBufferSource();
  source.buffer = buffer;

  const filter = audio.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = filterFreq;
  filter.Q.value = 0.7;

  const gain = audio.createGain();
  gain.gain.setValueAtTime(0, audio.currentTime);
  gain.gain.linearRampToValueAtTime(gainPeak, audio.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(audio.destination);
  source.start();
  source.stop(audio.currentTime + duration);
};

const droplet = () => {
  const audio = getCtx();
  if (!audio) return;
  if (audio.state === 'suspended') audio.resume();

  const osc = audio.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, audio.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, audio.currentTime + 0.25);

  const gain = audio.createGain();
  gain.gain.setValueAtTime(0.2, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.3);

  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start();
  osc.stop(audio.currentTime + 0.3);
};

export const ecoSound = {
  setEnabled: (value: boolean) => {
    enabled = value;
  },
  isEnabled: () => enabled,
  rustle: () => enabled && noiseBurst(0.25, 3200, 0.08),
  droplet,
  bloom: () => enabled && noiseBurst(0.6, 900, 0.06),
};
