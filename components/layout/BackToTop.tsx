'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed top-[150px] right-6 md:top-32 md:right-8 z-50 w-14 h-14 bg-rose/90 backdrop-blur-md hover:bg-rose text-white rounded-2xl shadow-[0_10px_30px_rgba(244,184,184,0.3)] border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </>
  );
}
