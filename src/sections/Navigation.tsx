import { useState, useEffect } from 'react';
import { useLanguage, type Language } from '../i18n/LanguageContext';
import { Globe, Menu, X } from 'lucide-react';

const languages: { code: Language; label: string; native: string }[] = [
  { code: 'en', label: 'EN', native: 'English' },
  { code: 'zh', label: '中', native: '中文' },
  { code: 'ja', label: '日', native: '日本語' },
  { code: 'ko', label: '한', native: '한국어' },
];

export default function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass rounded-full px-6 py-3 shadow-lg'
            : 'bg-transparent px-6 py-4'
        }`}
      >
        <div className="flex items-center gap-8">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('philosophy ')}
            className="text-lg font-bold tracking-tight hover:opacity-70 transition-opacity"
          >
            MetaSounds
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-sm font-medium link-underline opacity-70 hover:opacity-100 transition-opacity"
            >
              {t.nav.products}
            </button>
            <button
              onClick={() => scrollToSection('brands')}
              className="text-sm font-medium link-underline opacity-70 hover:opacity-100 transition-opacity"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => scrollToSection('footer')}
              className="text-sm font-medium link-underline opacity-70 hover:opacity-100 transition-opacity"
            >
              {t.nav.support}
            </button>
          </div>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{languages.find(l => l.code === language)?.label}</span>
            </button>

            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 glass rounded-xl overflow-hidden shadow-xl min-w-[120px]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                      language === lang.code
                        ? 'bg-black text-white'
                        : 'hover:bg-black/5'
                    }`}
                  >
                    <span className="font-medium">{lang.label}</span>
                    <span className="ml-2 opacity-60">{lang.native}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 -mr-2"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 md:hidden">
          <button
            onClick={() => scrollToSection('products')}
            className="text-2xl font-medium"
          >
            {t.nav.products}
          </button>
          <button
            onClick={() => scrollToSection('brands')}
            className="text-2xl font-medium"
          >
            {t.nav.about}
          </button>
          <button
            onClick={() => scrollToSection('footer')}
            className="text-2xl font-medium"
          >
            {t.nav.support}
          </button>
        </div>
      )}
    </>
  );
}
