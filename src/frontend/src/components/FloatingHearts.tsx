import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  emoji: string;
  left: string;
  fontSize: string;
  duration: string;
  opacity: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    let heartId = 0;
    
    const createHeart = () => {
      const newHeart: Heart = {
        id: heartId++,
        emoji: Math.random() > 0.5 ? '❤️' : '💗',
        left: `${Math.random() * 100}vw`,
        fontSize: `${Math.random() * 22 + 14}px`,
        duration: `${Math.random() * 3 + 4}s`,
        opacity: Math.random() * 0.5 + 0.4,
      };

      setHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 8000);
    };

    const interval = setInterval(createHeart, 380);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-[-20px] animate-float-up"
          style={{
            left: heart.left,
            fontSize: heart.fontSize,
            opacity: heart.opacity,
            animationDuration: heart.duration,
            filter: 'blur(0.3px)',
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
}
