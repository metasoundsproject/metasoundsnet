import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.4);
  // 🔥 修复：将 NodeJS.Timeout 改为 number 类型
  const fadeTimerRef = useRef<number | null>(null);

  // 1. 组件挂载：初始化播放 + 监听循环事件
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 监听音频播放结束事件，主动触发下一次播放（兜底循环）
    const handleEnded = () => {
      if (playing) { // 只有播放状态下才循环
        fadeIn(audio); // 循环时重新淡入
      }
    };
    audio.addEventListener("ended", handleEnded);

    // 初始自动播放
    if (playing) {
      fadeIn(audio);
    }

    // 清理副作用
    return () => {
      audio.removeEventListener("ended", handleEnded);
      if (fadeTimerRef.current) {
        clearInterval(fadeTimerRef.current);
      }
    };
  }, [playing, volume]);

  // 2. 音量变化时更新
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && !fadeTimerRef.current) { // 淡入淡出中不更新音量
      audio.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      fadeOut(audio);
    } else {
      fadeIn(audio);
    }
    setPlaying(!playing);
  };

  // 修复：平滑淡入（清空旧定时器 + 不干扰循环）
  const fadeIn = (audio: HTMLAudioElement) => {
    // 先清空旧的定时器，避免多个定时器叠加
    if (fadeTimerRef.current) {
      clearInterval(fadeTimerRef.current);
    }

    audio.volume = 0;
    audio.play().catch((err) => {
      console.warn("自动播放失败（浏览器策略限制）：", err);
      setPlaying(false);
    });

    let v = 0;
    fadeTimerRef.current = setInterval(() => {
      v += 0.02;
      if (v >= volume) {
        audio.volume = volume;
        clearInterval(fadeTimerRef.current!);
        fadeTimerRef.current = null; // 标记淡入完成
      } else {
        audio.volume = v;
      }
    }, 40);
  };

  // 修复：平滑淡出（清空旧定时器 + 不重置音量）
  const fadeOut = (audio: HTMLAudioElement) => {
    if (fadeTimerRef.current) {
      clearInterval(fadeTimerRef.current);
    }

    let v = audio.volume;
    fadeTimerRef.current = setInterval(() => {
      v -= 0.02;
      if (v <= 0) {
        audio.pause();
        clearInterval(fadeTimerRef.current!);
        fadeTimerRef.current = null; // 标记淡出完成
        // 不再重置 volume！避免干扰下一次循环
      } else {
        audio.volume = v;
      }
    }, 40);
  };

  return (
    <>
      {/* 保留 loop 属性，配合 ended 事件双重保障循环 */}
      <audio ref={audioRef} src="/background.mp3" loop preload="auto" />

      {/* 悬浮控制面板 */}
      <div className="
  fixed bottom-6 right-6
  bg-black/20 backdrop-blur-md
  px-5 py-3 rounded-2xl
  shadow-xl
  flex items-center justify-center gap-4
  z-[9999]
">
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
