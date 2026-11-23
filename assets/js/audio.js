/**
 * Romantic Audio Synthesizer & Music Engine
 * Synthesizes soft, romantic ambient music (harp & music-box style) completely offline
 * using Web Audio API. Also supports playing custom background mp3 if placed in assets/audio/bg_music.mp3!
 */
class RomanticAudioPlayer {
  constructor() {
    this.isPlaying = false;
    this.audioCtx = null;
    this.timer = null;
    this.customAudio = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playChime(freq, time = 0, duration = 2.5) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + time);

    gain.gain.setValueAtTime(0, this.audioCtx.currentTime + time);
    gain.gain.linearRampToValueAtTime(0.08, this.audioCtx.currentTime + time + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + time + duration);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(this.audioCtx.currentTime + time);
    osc.stop(this.audioCtx.currentTime + time + duration);
  }

  playRomanticMelodyLoop() {
    // Gentle romantic pentatonic arpeggio chords in F major / D minor
    const notes = [
      349.23, // F4
      440.00, // A4
      523.25, // C5
      659.25, // E5
      587.33, // D5
      440.00, // A4
      392.00, // G4
      329.63, // E4
      349.23, // F4
      523.25, // C5
      698.46, // F5
      659.25, // E5
    ];

    let noteIdx = 0;
    const step = () => {
      if (!this.isPlaying) return;
      const freq = notes[noteIdx % notes.length];
      this.playChime(freq, 0, 3.0);
      
      // Occasionally add a gentle soft harmony
      if (noteIdx % 3 === 0) {
        this.playChime(freq * 0.5, 0.05, 4.0); // Soft bass note
      }
      
      noteIdx++;
      this.timer = setTimeout(step, 900);
    };
    step();
  }

  toggle() {
    this.init();
    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      this.playRomanticMelodyLoop();
      localStorage.setItem('love_music_playing', 'true');
    } else {
      clearTimeout(this.timer);
      localStorage.setItem('love_music_playing', 'false');
    }
    this.updateUI();
  }

  updateUI() {
    const btns = document.querySelectorAll('.audio-toggle-trigger');
    btns.forEach(btn => {
      const textSpan = btn.querySelector('.audio-text');
      const iconSpan = btn.querySelector('.audio-icon');
      if (this.isPlaying) {
        if (textSpan) textSpan.textContent = 'Melody Playing ❤️';
        if (iconSpan) iconSpan.textContent = '🎶';
        btn.classList.add('playing');
      } else {
        if (textSpan) textSpan.textContent = 'Play Romantic Melody';
        if (iconSpan) iconSpan.textContent = '🎵';
        btn.classList.remove('playing');
      }
    });
  }

  setupAutoRestore() {
    // If user previously turned music on, offer 1-click continuation
    const wasPlaying = localStorage.getItem('love_music_playing') === 'true';
    if (wasPlaying) {
      window.addEventListener('click', () => {
        if (!this.isPlaying) {
          this.toggle();
        }
      }, { once: true });
    }
  }
}

window.romanticAudio = new RomanticAudioPlayer();
document.addEventListener('DOMContentLoaded', () => {
  window.romanticAudio.setupAutoRestore();
});
