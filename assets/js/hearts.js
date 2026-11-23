/**
 * Floating Romantic Canvas Particles
 * Renders delicate floating hearts, rose petals, and stardust particles in the background
 */
(function() {
  const canvas = document.createElement('canvas');
  canvas.id = 'hearts-canvas';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const maxParticles = 38;

  const colors = [
    'rgba(255, 182, 193, ', // Light Pink
    'rgba(255, 192, 203, ', // Pink
    'rgba(219, 112, 147, ', // Pale Violet Red
    'rgba(197, 137, 136, ', // Rose Gold
    'rgba(247, 225, 220, ', // Blush
    'rgba(230, 57, 70, '    // Subtle Red
  ];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.size = Math.random() * 14 + 10;
      this.speedY = Math.random() * 0.8 + 0.4;
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.5 - 0.25;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.colorBase = colors[Math.floor(Math.random() * colors.length)];
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      this.type = Math.random() > 0.4 ? 'heart' : 'petal';
      this.oscillationSpeed = Math.random() * 0.02 + 0.01;
      this.oscillationOffset = Math.random() * Math.PI * 2;
    }

    update() {
      this.y -= this.speedY;
      this.x += Math.sin(this.y * this.oscillationSpeed + this.oscillationOffset) * 0.6 + this.speedX;
      this.rotation += this.rotationSpeed;

      if (this.y < -30 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.colorBase + this.opacity + ')';

      if (this.type === 'heart') {
        const s = this.size / 16;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-s * 5, -s * 5, -s * 10, s * 2, 0, s * 10);
        ctx.bezierCurveTo(s * 10, s * 2, s * 5, -s * 5, 0, 0);
        ctx.fill();
      } else {
        // Petal shape
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 0.4, this.size * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }
  animate();

  // Gentle sparkle on click or tap
  window.addEventListener('click', (e) => {
    for (let i = 0; i < 5; i++) {
      const p = new Particle();
      p.x = e.clientX + (Math.random() - 0.5) * 30;
      p.y = e.clientY + (Math.random() - 0.5) * 30;
      p.speedY = Math.random() * 1.5 + 0.5;
      particles.push(p);
      if (particles.length > maxParticles + 15) particles.shift();
    }
  });
})();
