// Matrix Code Rain Effect
// Yellow and red typewriter characters with neon glow

const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');

let width, height, columns, drops;

// Characters to use (typewriter/terminal style)
const chars = 'GANLAND01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}';
const charArray = chars.split('');

// Colors - mostly yellow with occasional red
const colors = ['#ffcc00', '#ffcc00', '#ffcc00', '#ffcc00', '#ff3333', '#ffcc00', '#ffcc00', '#ff9900'];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  
  const fontSize = 14;
  columns = Math.floor(width / fontSize);
  drops = Array(columns).fill(1);
}

function draw() {
  // Semi-transparent black to create trail effect
  ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
  ctx.fillRect(0, 0, width, height);
  
  ctx.font = '14px "Share Tech Mono", monospace';
  
  for (let i = 0; i < drops.length; i++) {
    // Random character
    const char = charArray[Math.floor(Math.random() * charArray.length)];
    
    // Random color from palette
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Calculate position
    const x = i * 14;
    const y = drops[i] * 14;
    
    // Draw with glow effect for brighter characters
    if (Math.random() > 0.95) {
      // Bright character with glow
      ctx.shadowBlur = 15;
      ctx.shadowColor = color;
      ctx.fillStyle = '#fff';
    } else {
      // Normal character
      ctx.shadowBlur = 0;
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.3 + Math.random() * 0.5;
    }
    
    ctx.fillText(char, x, y);
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    
    // Reset drop randomly or when it goes off screen
    if (y > height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    
    drops[i]++;
  }
  
  requestAnimationFrame(draw);
}

// Initialize
resize();
window.addEventListener('resize', resize);
draw();
