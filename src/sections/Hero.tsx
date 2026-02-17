import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.4, ease: 'back.out(1.7)' }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { rotateX: 90, opacity: 0 },
        { rotateX: 0, opacity: 1, duration: 1.8, delay: 0.2, ease: 'expo.out' }
      );

      // Subtitle and description
      gsap.fromTo(
        '.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.8, ease: 'expo.out' }
      );

      gsap.fromTo(
        '.hero-desc',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.0, ease: 'expo.out' }
      );

      gsap.fromTo(
        '.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.2, ease: 'expo.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 删除了未使用的 scrollToProducts 函数

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0 animate-gradient"
          style={{
            background: 'linear-gradient(135deg, #ff000020, #0000ff20, #ffff0020, #00ff0020)',
            backgroundSize: '400% 400%',
          }}
        />
      </div>

      {/* Brand Tag */}
      <div className="absolute top-8 left-6 lg:left-12">
        <p className="font-mono text-xs text-black/40 tracking-widest uppercase">
          Red LABO — Flagship Series
        </p>
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Product Image */}
          <div
            ref={imageRef}
            className="relative order-2 lg:order-1"
            style={{
              perspective: '1000px',
              transform: `rotateY(${mousePos.x * 10}deg) rotateX(${-mousePos.y * 10}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <div className="relative animate-float">
              <img
                src="./oto.jpg"
                alt="OTO Synthesizer"
                className="w-full max-w-lg mx-auto drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h1
              ref={titleRef}
              className="text-hero text-black mb-4"
              style={{ opacity: 0 }}
            >
              {t.hero.title}
            </h1>
            
            <p className="hero-subtitle text-display text-black/80 mb-6" style={{ opacity: 0 }}>
              {t.hero.subtitle}
            </p>
            
            <p className="hero-desc text-lg text-black/60 max-w-md mx-auto lg:mx-0 mb-8" style={{ opacity: 0 }}>
              {t.hero.description}
            </p>
            
            <button
              onClick={() => window.open('https://www.redlabo.com/oto', '_blank')}
              className="hero-cta magnetic-btn inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-medium text-lg hover:bg-black/80 transition-colors group"
              style={{ opacity: 0 }}
            >
              {t.hero.cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-down {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
