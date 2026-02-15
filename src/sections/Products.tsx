import { useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProductInfo {
  name: string;
  category: string;
  description: string;
}

const products = [
  {
    id: 'oto',
    image: './oto-synthesizer.jpg',
    color: 'from-red-500/20 to-transparent',
    accent: 'bg-red-500',
  },
  {
    id: 'midi',
    image: './bitvibe-midi.jpg',
    color: 'from-blue-500/20 to-transparent',
    accent: 'bg-blue-500',
  },
  {
    id: 'sound',
    image: './sound-system.jpg',
    color: 'from-purple-500/20 to-transparent',
    accent: 'bg-purple-500',
  },
];

export default function Products() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      // Horizontal scroll animation
      const track = trackRef.current;
      if (!track) return;

      const scrollWidth = track.scrollWidth - window.innerWidth;

      const scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${scrollWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          gsap.set(track, {
            x: -scrollWidth * self.progress,
          });
        },
      });
      triggers.push(scrollTrigger);

      // Card entrance animations
      gsap.utils.toArray<HTMLElement>('.product-card-item').forEach((card, i) => {
        gsap.fromTo(
          card,
          { rotateY: 45, opacity: 0 },
          { 
            rotateY: 0, 
            opacity: 1, 
            duration: 0.8, 
            delay: 0.5 + i * 0.2, 
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        );
      });
    }, sectionRef);

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  const getProductInfo = (id: string): ProductInfo => {
    const productKey = id as keyof typeof t.products;
    const info = t.products[productKey];
    if (typeof info === 'object' && info !== null && 'name' in info) {
      return info as ProductInfo;
    }
    return { name: id, category: '', description: '' };
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6 lg:p-12">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-sm text-white/40 tracking-widest uppercase mb-2">
              Product Line
            </p>
            <h2 className="text-display text-white">
              {t.products.title}
            </h2>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-white/40">
            <span className="font-mono text-sm">Scroll to explore</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={trackRef}
        className="flex items-center h-screen gap-8 px-6 lg:px-12 pt-32"
        style={{ width: 'fit-content' }}
      >
        {products.map((product, index) => {
          const info = getProductInfo(product.id);
          return (
            <div
              key={product.id}
              className="product-card-item relative flex-shrink-0 w-[80vw] lg:w-[40vw] h-[70vh] group"
              style={{ perspective: '1000px', opacity: 0 }}
            >
              <div className="product-card relative w-full h-full rounded-3xl overflow-hidden bg-white/5 border border-white/10">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Product Image */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <img
                    src={product.image}
                    alt={info.name}
                    className="product-image max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Product Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-2 h-2 ${product.accent} rounded-full`} />
                    <span className="font-mono text-sm text-white/60 uppercase tracking-wider">
                      {info.category}
                    </span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                    {info.name}
                  </h3>
                  <p className="text-white/60 text-sm lg:text-base max-w-sm">
                    {info.description}
                  </p>
                </div>

                {/* Index Number */}
                <div className="absolute top-6 right-6 lg:top-8 lg:right-8">
                  <span className="font-mono text-6xl lg:text-8xl font-bold text-white/5">
                    0{index + 1}
                  </span>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-6 left-6 lg:top-8 lg:left-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-black" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* End Card */}
        <div className="flex-shrink-0 w-[40vw] h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <p className="font-mono text-sm text-white/40 tracking-widest uppercase mb-4">
              More Coming
            </p>
            <h3 className="text-2xl text-white font-bold">
              Stay Tuned
            </h3>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-8 left-6 lg:left-12 right-6 lg:right-12">
        <div className="h-px bg-white/10 relative overflow-hidden">
          <div className="progress-bar absolute top-0 left-0 h-full bg-white/40 w-0" />
        </div>
      </div>
    </section>
  );
}
