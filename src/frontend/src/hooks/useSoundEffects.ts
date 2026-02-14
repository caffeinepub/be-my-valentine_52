import { useRef, useEffect } from 'react';

const HOVER_SOUND_URL = 'https://assets.mixkit.co/sfx/preview/mixkit-cartoon-voice-laugh-343.mp3';
const SUCCESS_SOUND_URL = 'https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3';

export function useSoundEffects() {
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);
  const successAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    hoverAudioRef.current = new Audio(HOVER_SOUND_URL);
    successAudioRef.current = new Audio(SUCCESS_SOUND_URL);

    return () => {
      if (hoverAudioRef.current) {
        hoverAudioRef.current.pause();
        hoverAudioRef.current = null;
      }
      if (successAudioRef.current) {
        successAudioRef.current.pause();
        successAudioRef.current = null;
      }
    };
  }, []);

  const playHoverSound = () => {
    if (hoverAudioRef.current) {
      hoverAudioRef.current.currentTime = 0;
      hoverAudioRef.current.play().catch((error) => {
        console.log('Audio playback prevented:', error);
      });
    }
  };

  const playSuccessSound = () => {
    if (successAudioRef.current) {
      successAudioRef.current.currentTime = 0;
      successAudioRef.current.play().catch((error) => {
        console.log('Audio playback prevented:', error);
      });
    }
  };

  return { playHoverSound, playSuccessSound };
}
