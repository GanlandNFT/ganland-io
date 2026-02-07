// 90s VHS/Cable TV Glitch Effects
// Random interference, tracking errors, and signal disruption

const overlay = document.querySelector('.vhs-overlay');
const glitchBar = document.querySelector('.glitch-bar');

// Random VHS tracking error
function triggerTrackingError() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: absolute;
    width: 100%;
    height: ${Math.random() * 10 + 2}px;
    top: ${Math.random() * 100}%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 51, 51, ${Math.random() * 0.5 + 0.2}),
      rgba(255, 204, 0, ${Math.random() * 0.3}),
      transparent
    );
    transform: translateX(${Math.random() * 20 - 10}px);
    pointer-events: none;
  `;
  overlay.appendChild(bar);
  
  setTimeout(() => bar.remove(), 100 + Math.random() * 200);
}

// RGB split / chromatic aberration burst
function triggerChromaSplit() {
  const content = document.querySelector('.content');
  content.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 2 - 1}px)`;
  
  setTimeout(() => {
    content.style.transform = '';
  }, 50 + Math.random() * 100);
}

// Full screen glitch burst
function triggerMajorGlitch() {
  const burst = document.createElement('div');
  burst.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      ${Math.random() * 180}deg,
      transparent,
      transparent 2px,
      rgba(255, 51, 51, 0.1) 2px,
      rgba(255, 51, 51, 0.1) 4px
    );
    pointer-events: none;
    z-index: 100;
  `;
  document.body.appendChild(burst);
  
  // Quick flash
  setTimeout(() => {
    burst.style.background = 'rgba(255, 204, 0, 0.05)';
  }, 30);
  
  setTimeout(() => burst.remove(), 80);
}

// Horizontal tear effect
function triggerTear() {
  const tearY = Math.random() * 100;
  const tearHeight = Math.random() * 30 + 10;
  const tearOffset = Math.random() * 20 - 10;
  
  const tear = document.createElement('div');
  tear.style.cssText = `
    position: fixed;
    left: 0;
    width: 100%;
    top: ${tearY}%;
    height: ${tearHeight}px;
    background: rgba(10, 10, 10, 0.9);
    transform: translateX(${tearOffset}px);
    pointer-events: none;
    z-index: 50;
    box-shadow: 
      0 -1px 0 rgba(255, 51, 51, 0.5),
      0 1px 0 rgba(0, 255, 255, 0.5);
  `;
  document.body.appendChild(tear);
  
  setTimeout(() => tear.remove(), 150);
}

// Random glitch scheduler
function scheduleGlitch() {
  const glitchTypes = [
    { fn: triggerTrackingError, weight: 5 },
    { fn: triggerChromaSplit, weight: 3 },
    { fn: triggerMajorGlitch, weight: 1 },
    { fn: triggerTear, weight: 2 }
  ];
  
  // Weighted random selection
  const totalWeight = glitchTypes.reduce((sum, g) => sum + g.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const glitch of glitchTypes) {
    random -= glitch.weight;
    if (random <= 0) {
      glitch.fn();
      break;
    }
  }
  
  // Schedule next glitch (random interval 2-10 seconds)
  const nextDelay = 2000 + Math.random() * 8000;
  setTimeout(scheduleGlitch, nextDelay);
}

// Start the glitch system
setTimeout(scheduleGlitch, 3000);

// Also add subtle continuous shake to the whole page
let shakeIntensity = 0;

function subtleShake() {
  if (Math.random() > 0.99) {
    shakeIntensity = Math.random() * 2;
  }
  
  if (shakeIntensity > 0) {
    document.body.style.transform = `translate(${Math.random() * shakeIntensity - shakeIntensity/2}px, ${Math.random() * shakeIntensity - shakeIntensity/2}px)`;
    shakeIntensity *= 0.9;
  } else {
    document.body.style.transform = '';
  }
  
  requestAnimationFrame(subtleShake);
}

subtleShake();
