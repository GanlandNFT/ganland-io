// Generative Mountain Silhouettes
// Slowly morphing mountain/tree horizons with GAN-inspired aesthetic

const canvas = document.getElementById('mountains');
const ctx = canvas.getContext('2d');

let width, height;
let time = 0;
let seed = Date.now(); // Changes slowly over time

// Pseudo-random based on seed
function seededRandom(s) {
  const x = Math.sin(s) * 10000;
  return x - Math.floor(x);
}

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

// Generate mountain range using noise-like function
function generateMountain(baseY, amplitude, frequency, offset) {
  const points = [];
  for (let x = 0; x <= width; x += 5) {
    // Multiple sine waves for natural look
    let y = baseY;
    y += Math.sin((x * frequency + offset) * 0.01) * amplitude;
    y += Math.sin((x * frequency * 0.5 + offset * 1.3) * 0.02) * amplitude * 0.5;
    y += Math.sin((x * frequency * 0.25 + offset * 0.7) * 0.03) * amplitude * 0.3;
    
    // Add some jaggedness
    y += seededRandom(x + seed) * amplitude * 0.1;
    
    points.push({ x, y });
  }
  return points;
}

// Generate tree silhouettes
function drawTrees(baseY, count, maxHeight) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  
  for (let i = 0; i < count; i++) {
    const x = seededRandom(i * 100 + seed) * width;
    const treeHeight = seededRandom(i * 50 + seed * 0.5) * maxHeight + maxHeight * 0.3;
    const treeWidth = treeHeight * 0.3;
    
    // Simple triangle tree
    ctx.beginPath();
    ctx.moveTo(x, baseY);
    ctx.lineTo(x - treeWidth / 2, baseY);
    ctx.lineTo(x, baseY - treeHeight);
    ctx.lineTo(x + treeWidth / 2, baseY);
    ctx.closePath();
    ctx.fill();
  }
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  
  // Time-based offset for slow movement
  const offset = time * 0.1;
  
  // Layer 1: Far mountains (darkest, slowest)
  const far = generateMountain(height * 0.6, height * 0.15, 0.3, offset * 0.2);
  ctx.fillStyle = 'rgba(20, 20, 20, 0.8)';
  ctx.beginPath();
  ctx.moveTo(0, height);
  far.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fill();
  
  // Layer 2: Mid mountains
  const mid = generateMountain(height * 0.72, height * 0.12, 0.5, offset * 0.5);
  ctx.fillStyle = 'rgba(15, 15, 15, 0.9)';
  ctx.beginPath();
  ctx.moveTo(0, height);
  mid.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fill();
  
  // Layer 3: Near hills with trees
  const near = generateMountain(height * 0.85, height * 0.08, 0.8, offset);
  ctx.fillStyle = 'rgba(10, 10, 10, 1)';
  ctx.beginPath();
  ctx.moveTo(0, height);
  near.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fill();
  
  // Add scattered trees
  drawTrees(height * 0.88, 30, 40);
  drawTrees(height * 0.95, 20, 25);
  
  // Stars/particles in the sky
  ctx.fillStyle = 'rgba(255, 204, 0, 0.3)';
  for (let i = 0; i < 50; i++) {
    const x = seededRandom(i * 7 + seed * 0.001) * width;
    const y = seededRandom(i * 11 + seed * 0.001) * height * 0.5;
    const size = seededRandom(i * 13) * 2 + 0.5;
    const flicker = Math.sin(time * 0.02 + i) * 0.3 + 0.7;
    
    ctx.globalAlpha = flicker * 0.5;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  
  time++;
  
  // Very slowly change the seed (over the course of hours/days)
  if (time % 10000 === 0) {
    seed += 0.01;
  }
  
  requestAnimationFrame(draw);
}

resize();
window.addEventListener('resize', resize);
draw();
