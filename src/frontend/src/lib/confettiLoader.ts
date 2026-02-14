declare global {
  interface Window {
    confetti?: (options: {
      particleCount: number;
      spread: number;
      origin: { y: number };
    }) => void;
  }
}

let confettiLoaded = false;
let confettiLoadPromise: Promise<void> | null = null;

function loadConfettiScript(): Promise<void> {
  if (confettiLoaded && window.confetti) {
    return Promise.resolve();
  }

  if (confettiLoadPromise) {
    return confettiLoadPromise;
  }

  confettiLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
    script.async = true;
    
    script.onload = () => {
      confettiLoaded = true;
      resolve();
    };
    
    script.onerror = () => {
      confettiLoadPromise = null;
      reject(new Error('Failed to load confetti script'));
    };
    
    document.head.appendChild(script);
  });

  return confettiLoadPromise;
}

export async function triggerConfetti() {
  try {
    await loadConfettiScript();
    
    if (window.confetti) {
      window.confetti({
        particleCount: 260,
        spread: 120,
        origin: { y: 0.65 },
      });
    }
  } catch (error) {
    console.error('Confetti error:', error);
  }
}
