/**
 * Celebration Confetti Cannon
 * Creates celebratory explosions of rose gold, pink, and gold foil confetti
 */
window.launchConfetti = function() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiCount = 180;
  const confetti = [];
  const palette = ['#e63946', '#ffd1dc', '#c58988', '#e0a96d', '#ffd700', '#ffffff', '#ff758f'];

  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      x: canvas.width / 2,
      y: canvas.height * 0.4,
      w: Math.random() * 12 + 6,
      h: Math.random() * 8 + 4,
      color: palette[Math.floor(Math.random() * palette.length)],
      vx: (Math.random() - 0.5) * 22,
      vy: (Math.random() - 0.8) * 24,
      gravity: 0.35,
      rotation: Math.random() * 360,
      vRotation: (Math.random() - 0.5) * 12,
      opacity: 1,
      decay: Math.random() * 0.008 + 0.004
    });
  }

  let animationId;
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;

    for (let c of confetti) {
      c.x += c.vx;
      c.y += c.vy;
      c.vy += c.gravity;
      c.vx *= 0.98;
      c.rotation += c.vRotation;
      c.opacity -= c.decay;

      if (c.opacity > 0) {
        active = true;
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, c.opacity);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
        ctx.restore();
      }
    }

    if (active) {
      animationId = requestAnimationFrame(update);
    } else {
      cancelAnimationFrame(animationId);
      canvas.remove();
    }
  }
  update();
};
