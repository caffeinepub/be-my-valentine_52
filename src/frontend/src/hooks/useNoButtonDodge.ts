import { RefObject } from 'react';

export function useNoButtonDodge(
  cardRef: RefObject<HTMLDivElement | null>,
  buttonRef: RefObject<HTMLButtonElement | null>,
  onDodge?: () => void
) {
  const handleNoButtonInteraction = (e: React.MouseEvent | React.TouchEvent | React.PointerEvent) => {
    e.preventDefault();
    
    if (!cardRef.current || !buttonRef.current) return;

    const cardRect = cardRef.current.getBoundingClientRect();
    const btnRect = buttonRef.current.getBoundingClientRect();

    const maxX = cardRect.width - btnRect.width - 10;
    const maxY = cardRect.height - btnRect.height - 10;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    buttonRef.current.style.left = `${newX}px`;
    buttonRef.current.style.top = `${newY}px`;

    if (onDodge) {
      onDodge();
    }
  };

  return { handleNoButtonInteraction };
}
