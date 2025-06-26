const f0 = 110;
const maxN = 31;

function playTone(frequency, duration = 500) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();

  gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration / 1000);

  oscillator.stop(audioCtx.currentTime + duration / 1000);

  return audioCtx;
}

async function playScale() {
  for (let n = 0; n <= maxN; n++) {
    const freq = f0 * Math.pow(5, n / maxN);
    const ctx = playTone(freq, 300);
    await new Promise(r => setTimeout(r, 350)); // 音の間隔
    ctx.close(); // AudioContextを閉じる
  }
}

playScale();
