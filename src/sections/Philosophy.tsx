import { useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      // Title color shift on scroll
      const titleTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        onUpdate: (self) => {
          const hue = Math.floor(self.progress * 360);
          if (titleRef.current) {
            titleRef.current.style.color = `hsl(${hue}, 80%, 50%)`;
          }
        },
      });
      triggers.push(titleTrigger);
      // subtitle parallax
gsap.to('.subtitle-shimmer', {
  y: -30,
  ease: 'none',
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
});
      // Text reveal animation
      const revealTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(
            '.philosophy-text',
            { y: 80, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', stagger: 0.2 }
          );
        },
        once: true,
      });
      triggers.push(revealTrigger);
    }, sectionRef);

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section id="philosophy"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating Color Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 lg:px-12 max-w-5xl mx-auto">
        <h2
          ref={titleRef}
          className="philosophy-text text-[12vw] lg:text-[10vw] font-bold leading-none tracking-tighter mb-8"
          style={{ opacity: 0 }}
        >
          {t.philosophy.title}
        </h2>
        
        <p
  className="philosophy-text subtitle-shimmer text-xl lg:text-2xl text-black/60 font-light max-w-2xl mx-auto relative overflow-hidden" 
>




  <span className="relative z-10">
    {t.philosophy.subtitle}
  </span>

  {/* shimmer light */}
  <span className="shimmer-light absolute inset-0 pointer-events-none" />
</p>

 <style>{`
  @keyframes slide-down {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(200%); }
  }

  /* shimmer animation */
  @keyframes shimmer {
    0% { transform: translateX(-120%); }
    100% { transform: translateX(120%); }
  }

  .subtitle-shimmer {
    position: relative;
  }

  .shimmer-light {
    background: linear-gradient(
      110deg,
      transparent 0%,
      rgba(255,255,255,0.6) 50%,
      transparent 100%
    );
    mix-blend-mode: overlay;
    opacity: 0.25;
    animation: shimmer 4s linear infinite;
    filter: blur(8px);
  }

  .subtitle-shimmer:hover .shimmer-light {
    opacity: 0.6;
  }
`}</style>

        {/* Decorative Elements */}
        <div className="philosophy-text mt-16 flex items-center justify-center gap-4" style={{ opacity: 0 }}>
          <div className="w-12 h-px bg-black/20" />
          <div className="w-2 h-2 bg-black rounded-full" />
          <div className="w-12 h-px bg-black/20" />
        </div>
      </div>

      {/* Corner Labels */}
      <div className="absolute top-8 left-8 font-mono text-xs text-black/30 tracking-widest uppercase">
        Philosophy
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-xs text-black/30 tracking-widest uppercase">
        Since 2024
      </div>
    </section>
  );
}
