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


const App: React.FC = () => {
  // 核心：监听右键事件，阻止默认行为
  useEffect(() => {
    // 定义禁止右键的处理函数
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault(); // 阻止右键菜单弹出
      // 可选：添加提示（比如弹窗提醒）
      // alert('本站禁止右键操作，感谢理解！');
    };

    // 给整个文档添加右键监听
    document.addEventListener('contextmenu', handleContextMenu);

    // 可选：禁止图片拖拽（防止偷图）
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };
    document.addEventListener('dragstart', handleDragStart);

    // 可选：禁止复制（Ctrl+C）
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        // alert('禁止复制文本！');
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // 组件卸载时移除监听（避免内存泄漏）
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // 空依赖：仅组件挂载时执行一次

  return (
    <div className="app-container">
      {/* 你的页面内容 */}
      <h1>React 禁止右键示例</h1>
      <p>右键点击页面任意位置，菜单不会弹出</p>
      <img 
        src="/images/example.jpg" 
        alt="示例图片" 
        style={{ width: 300, marginTop: 20 }} 
      />
    </div>
  );
};

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
