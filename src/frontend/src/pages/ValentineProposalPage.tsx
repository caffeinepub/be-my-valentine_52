import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FloatingHearts from '@/components/FloatingHearts';
import { useNoButtonDodge } from '@/hooks/useNoButtonDodge';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { triggerConfetti } from '@/lib/confettiLoader';

export default function ValentineProposalPage() {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  
  const { playHoverSound, playSuccessSound } = useSoundEffects();
  const { handleNoButtonInteraction } = useNoButtonDodge(cardRef, noButtonRef, playHoverSound);

  const handleYesClick = () => {
    playSuccessSound();
    triggerConfetti();
    setTimeout(() => {
      setShowSuccessDialog(true);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative animated-gradient">
      <FloatingHearts />
      
      <div 
        ref={cardRef}
        className="glass-card w-[min(92%,420px)] px-[30px] py-[40px] pb-[45px] text-center relative z-10 animate-card-in"
      >
        <div className="text-[68px] mb-3 animate-heartbeat">
          🐱❤️
        </div>
        
        <h2 className="font-playfair text-[28px] text-valentine-dark mb-[30px] leading-[1.35] font-semibold">
          Hina,<br />will you be my Valentine?
        </h2>

        <div className="relative h-[78px]">
          <Button
            onClick={handleYesClick}
            className="absolute left-[12%] px-9 py-3.5 rounded-[40px] text-base font-medium bg-gradient-to-br from-valentine-primary to-valentine-primary-light text-white shadow-valentine-yes hover:shadow-valentine-yes-hover hover:-translate-y-1 transition-all duration-250 active:scale-[0.94]"
          >
            Yes 💖
          </Button>
          
          <Button
            ref={noButtonRef}
            onMouseEnter={handleNoButtonInteraction}
            onTouchStart={handleNoButtonInteraction}
            onPointerDown={(e) => {
              if (e.pointerType === 'touch') {
                handleNoButtonInteraction(e);
              }
            }}
            className="absolute left-[55%] px-9 py-3.5 rounded-[40px] text-base font-medium bg-white/90 text-gray-500 shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:bg-white/90 active:scale-[0.94] transition-all duration-250"
          >
            No 🙈
          </Button>
        </div>

        <div className="mt-7 text-[13px] text-gray-600 italic">
          Some love stories don't allow "no" ✨
        </div>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-xl border-valentine-primary/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair text-valentine-dark text-center">
              YAY 💕
            </DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              I can't wait for Valentine's Day with you!
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
