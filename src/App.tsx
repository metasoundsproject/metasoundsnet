import { useEffect } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Brands from './sections/Brands';
import Products from './sections/Products';
import Philosophy from './sections/Philosophy';
import Footer from './sections/Footer';
import './App.css';
import Cursor from "./components/Cursor";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  useEffect(() => {
    // Smooth scroll polyfill for older browsers
    document.documentElement.style.scrollBehavior = 'smooth';

    // ========== 修复：给所有事件参数声明明确类型 ==========
    // 1. 禁止右键菜单（声明 MouseEvent 类型）
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault(); // 阻止右键菜单弹出
      // 可选：添加提示弹窗，注释掉则无提示
      // alert('本站禁止右键操作，感谢理解！');
    };

    // 2. 禁止图片拖拽（声明 DragEvent 类型）
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // 3. 禁止Ctrl+C复制（声明 KeyboardEvent 类型）
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
      }
    };

    // 绑定事件监听
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      // 移除事件监听
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="relative">
        <Navigation />
        <main>
          <Cursor />
          <MusicPlayer />
          {/* 你的 routes / sections */}
          <Philosophy />
          <Brands />
          <Hero />
          <Products />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
