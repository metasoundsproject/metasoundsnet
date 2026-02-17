import { useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Brands() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const redLaboRef = useRef<HTMLDivElement>(null);
  const bitVibeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      // Red LABO animation
      const redTrigger = ScrollTrigger.create({
        trigger: redLaboRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            redLaboRef.current,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggers.push(redTrigger);

      // Bit Vibe animation
      const bitTrigger = ScrollTrigger.create({
        trigger: bitVibeRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            bitVibeRef.current,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggers.push(bitTrigger);
    }, sectionRef);

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="brands"
      ref={sectionRef}
      className="relative py-32 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="font-mono text-sm text-black/40 tracking-widest uppercase mb-4">
            Our Brands
          </p>
          <h2 className="text-display text-black">
            Two Lines. One Vision.
          </h2>
        </div>

        {/* RED LABO */}
        <div
          ref={redLaboRef}
          className="
            relative
            grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-32
            bg-gradient-to-t
            from-gray-50
            to-red-30/30
            rounded-3xl
            p-6 lg:p-12
          "
          style={{
            opacity: 0,
            background: 'linear-gradient(to top, rgba(255,0,0,0.025), #f9fafb)',
            boxShadow: `
              0 10px 30px rgba(0,0,0,0.04),
              0 30px 80px rgba(0,0,0,0.06)
            `,
          }}
        >
          <div className="relative order-1 lg:order-1">
            {/* 移动端：自适应高度，不强制正方形 */}
            <div className="
              w-full 
              h-auto min-h-[200px] sm:min-h-[280px] lg:min-h-[400px]
              rounded-2xl lg:rounded-3xl 
              overflow-hidden 
              flex items-center justify-center
              p-4 lg:p-0
            ">
              <img
                src="./redlabologo.png"
                alt="RED LABO"
                className="
                  w-full max-w-[200px] sm:max-w-[280px] lg:max-w-none lg:w-3/4
                  h-auto max-h-[200px] sm:max-h-[280px] lg:max-h-none lg:h-3/4
                  object-contain
                  [filter:drop-shadow(0_15px_25px_rgba(0,0,0,0.2))]
                  lg:[filter:drop-shadow(0_20px_30px_rgba(0,0,0,0.2))]
                  hover:[filter:drop-shadow(0_25px_40px_rgba(0,0,0,0.35))]
                  lg:hover:[filter:drop-shadow(0_35px_50px_rgba(0,0,0,0.35))]
                  transition-all duration-500 ease-out
                  hover:-translate-y-3 lg:hover:-translate-y-4 
                  hover:scale-105 lg:hover:scale-110
                  cursor-pointer
                  will-change-transform
                "
                style={{
                  mixBlendMode: 'multiply',
                }}
              />
            </div>
            {/* Red accent */}
            <div className="absolute -bottom-4 -right-4 w-16 h-16 lg:w-24 lg:h-24 bg-red-500 rounded-full opacity-20 blur-2xl" />
          </div>
          
          <div className="lg:pl-8 order-2 lg:order-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="font-mono text-sm text-red-500 tracking-wider uppercase">
                {t.brands.redLabo.tagline}
              </span>
            </div>
            <h3 className="text-brand text-black mb-4">
              {t.brands.redLabo.name}
            </h3>
            <p className="text-lg text-black/60 leading-relaxed mb-8">
              {t.brands.redLabo.description}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <span className="px-4 py-2 bg-black/5 rounded-full text-sm font-mono">
                AI-Powered
              </span>
              <span className="px-4 py-2 bg-black/5 rounded-full text-sm font-mono">
                Interactive
              </span>
              <span className="px-4 py-2 bg-black/5 rounded-full text-sm font-mono">
                Audio-Visual
              </span>
            </div>
          </div>
        </div>

        {/* BitVibe */}
        <div
          ref={bitVibeRef}
          className="
            relative
            grid lg:grid-cols-2 gap-8 lg:gap-12 items-center
            bg-gradient-to-t
            from-gray-50
            to-blue-50/60
            rounded-3xl
            p-6 lg:p-12
          "
          style={{
            opacity: 0,
            background: 'linear-gradient(to top, rgba(59,130,246,0.05), #f9fafb)',
            boxShadow: `
              0 10px 30px rgba(0,0,0,0.04),
              0 30px 80px rgba(0,0,0,0.06)
            `,
          }}
        >
          <div className="order-2 lg:order-1 lg:pr-8 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="font-mono text-sm text-blue-500 tracking-wider uppercase">
                {t.brands.bitVibe.tagline}
              </span>
            </div>
            <h3 className="text-brand text-black mb-4">
              {t.brands.bitVibe.name}
            </h3>
            <p className="text-lg text-black/60 leading-relaxed mb-8">
              {t.brands.bitVibe.description}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <span className="px-4 py-2 bg-black/5 rounded-full text-sm font-mono">
                Audio Devices
              </span>
              <span className="px-4 py-2 bg-black/5 rounded-full text-sm font-mono">
                PC/Gaming Peripheral
              </span>
              <span className="px-4 py-2 bg-black/5 rounded-full text-sm font-mono">
                Portable
              </span>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            {/* 移动端：自适应高度，不强制正方形 */}
            <div className="
              w-full 
              h-auto min-h-[200px] sm:min-h-[280px] lg:min-h-[400px]
              rounded-2xl lg:rounded-3xl 
              overflow-hidden 
              flex items-center justify-center
              p-4 lg:p-0
            ">
              <img
                src="./bitvibelogo.png"
                alt="BitVibe"
                className="
                  w-full max-w-[200px] sm:max-w-[280px] lg:max-w-none lg:w-3/4
                  h-auto max-h-[200px] sm:max-h-[280px] lg:max-h-none lg:h-3/4
                  object-contain
                  [filter:drop-shadow(0_15px_25px_rgba(0,0,0,0.2))]
                  lg:[filter:drop-shadow(0_20px_30px_rgba(0,0,0,0.2))]
                  hover:[filter:drop-shadow(0_25px_40px_rgba(0,0,0,0.35))]
                  lg:hover:[filter:drop-shadow(0_35px_50px_rgba(0,0,0,0.35))]
                  transition-all duration-500 ease-out
                  hover:-translate-y-3 lg:hover:-translate-y-4 
                  hover:scale-105 lg:hover:scale-110
                  cursor-pointer
                  will-change-transform
                "
                style={{
                  mixBlendMode: 'multiply',
                }}
              />
            </div>
            {/* Blue accent */}
            <div className="absolute -bottom-4 -left-4 w-16 h-16 lg:w-24 lg:h-24 bg-blue-500 rounded-full opacity-20 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
