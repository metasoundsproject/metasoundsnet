import { useEffect } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Brands from './sections/Brands';
import Products from './sections/Products';
import Philosophy from './sections/Philosophy';
import Footer from './sections/Footer';
import './App.css';

function App() {
  useEffect(() => {
    // Smooth scroll polyfill for older browsers
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="relative">
        <Navigation />
        <main>
          <Hero />
          <Philosophy />
          <Brands />
          
          <Products />
          
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
