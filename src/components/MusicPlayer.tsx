import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  // 初始状态改为 true，默认播放
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.4);

  // 1. 组件挂载时自动播放（实现默认播放）
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && playing) {
      fadeIn(audio);
    }
  }, []);

  // 2. 音量变化时更新音频音量
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return; // 增加空值保护，避免报错

    if (playing) {
      fadeOut(audio);
    } else {
      fadeIn(audio);
    }
    setPlaying(!playing);
  };

  // 平滑淡入
  const fadeIn = (audio: HTMLAudioElement) => {
    audio.volume = 0;
    // 增加错误捕获的提示，方便调试
    audio.play().catch((err) => {
      console.warn("自动播放失败（浏览器策略限制）：", err);
      setPlaying(false); // 播放失败时重置状态
    });
    let v = 0;
    const fade = setInterval(() => {
      v += 0.02;
      if (v >= volume) {
        audio.volume = volume;
        clearInterval(fade);
      } else {
        audio.volume = v;
      }
    }, 40);
  };

  // 平滑淡出
  const fadeOut = (audio: HTMLAudioElement) => {
    let v = audio.volume;
    const fade = setInterval(() => {
      v -= 0.02;
      if (v <= 0) {
        audio.pause();
        audio.volume = volume;
        clearInterval(fade);
      } else {
        audio.volume = v;
      }
    }, 40);
  };

  return (
    <>
      {/* loop 属性保留，确保循环播放 */}
      <audio ref={audioRef} src="/background.mp3" loop />

      {/* 悬浮控制面板 */}
      <div className="
  fixed bottom-6 right-6
  bg-black/20 backdrop-blur-md
  px-5 py-3 rounded-2xl
  shadow-xl
  flex items-center gap-4
  z-[9999]
">
        {/* 播放按钮（初始显示暂停图标，因为默认播放） */}
        <button
          onClick={togglePlay}
          className="
      w-9 h-9 rounded-full
      border border-white/20
      flex items-center justify-center
      text-white
      hover:bg-white hover:text-black
      transition-all duration-300
    "
        >
          {playing ? "❚❚" : "▶"}
        </button>

        {/* 音量 slider */}
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-24 accent-white cursor-pointer"
        />
      </div>
    </>
  );
}
