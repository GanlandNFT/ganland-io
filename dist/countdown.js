// Bitcoin Halving Countdown
// Next halving estimated: April 2028 (Block 1,050,000)

// Bitcoin halving occurs every 210,000 blocks
// Current block time average: ~10 minutes
// Next halving estimated block: 1,050,000
// Estimated date: April 2028 (this is an approximation)

const NEXT_HALVING_DATE = new Date('2028-04-17T00:00:00Z'); // Approximate

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateCountdown() {
  const now = new Date();
  const diff = NEXT_HALVING_DATE - now;
  
  if (diff <= 0) {
    daysEl.textContent = '000';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  daysEl.textContent = String(days).padStart(3, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

// Update every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Add glitch effect to countdown occasionally
setInterval(() => {
  if (Math.random() > 0.9) {
    const elements = [daysEl, hoursEl, minutesEl, secondsEl];
    const randomEl = elements[Math.floor(Math.random() * elements.length)];
    
    const originalText = randomEl.textContent;
    const glitchChars = '!@#$%^&*';
    
    // Briefly show glitch characters
    randomEl.textContent = Array.from(originalText)
      .map(() => glitchChars[Math.floor(Math.random() * glitchChars.length)])
      .join('');
    
    setTimeout(() => {
      randomEl.textContent = originalText;
    }, 100);
  }
}, 2000);
