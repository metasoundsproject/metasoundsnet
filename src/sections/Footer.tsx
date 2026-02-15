import { useLanguage } from '../i18n/LanguageContext';
import { Mail, Phone, MapPin, Instagram, X, Youtube} from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      id="footer"
      className="relative bg-black text-white"
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold mb-4">Support</h3>

         <div className="group relative inline-block mb-8">
  {/* glow layer */}
  <div className="absolute inset-0 rounded-lg bg-white/20 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

  {/* main badge */}
  <div className="relative bg-white/10 border border-white/20 rounded-lg px-4 py-2 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/15 group-hover:-translate-y-0.5">
    <p className="text-white/90 text-sm tracking-wide">
      1-Year Warranty · 30-Day Returns · Free Worldwide Shipping
    </p>
  </div>
</div>
             <p className="text-white/60 max-w-md mb-8">Redefining art creation through innovative technology. 
              Smart instruments, professional audio equipment, and PC/gaming peripherals.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>

            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-mono text-sm text-white/40 tracking-widest uppercase mb-6">
              {t.footer.links}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#hero" className="text-white/70 hover:text-white transition-colors link-underline">
                  {t.nav.products}
                </a>
              </li>
              <li>
                <a href="#brands" className="text-white/70 hover:text-white transition-colors link-underline">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#footer" className="text-white/70 hover:text-white transition-colors link-underline">
                  {t.nav.support}
                </a>
              </li>
              <li>
                <a href="/policy.html" className="text-white/70 hover:text-white transition-colors link-underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-sm text-white/40 tracking-widest uppercase mb-6">
              {t.footer.contact}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white/40" />
                <a
                  href={`mailto:${t.footer.email}`}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t.footer.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white/40" />
                <a
                  href={`tel:${t.footer.phone}`}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t.footer.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white/40 mt-1" />
                <span className="text-white/70">{t.footer.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              {t.footer.copyright}
            </p>
            <div className="flex items-center gap-6">

              <a
                href="https://www.redlabo.com"
                className="font-mono text-s text-white/30 hover:text-white/80 transition-colors duration-200"
                target="_blank"  
              >
                RED LABO
              </a>
              
              <span className="w-1 h-1 bg-white/30 rounded-full" />

              <a
                href="https://www.bitvibe.jp"
                className="font-mono text-s text-white/30 hover:text-white/80 transition-colors duration-200"
                target="_blank"  
              >
                BitVibe
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Large Background Text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <div className="text-[20vw] font-bold text-white/[0.02] leading-none text-center translate-y-1/3">
          MetaSounds
        </div>
      </div>
    </footer>
  );
}
