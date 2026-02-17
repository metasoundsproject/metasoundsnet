import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.4);
  const fadeTimerRef = useRef<number | null>(null);

  // 1. 组件挂载：初始化播放 + 监听循环事件
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 监听音频播放结束事件，主动触发下一次播放（兜底循环）
    const handleEnded = () => {
      // 关键修复：同时校验 playing 状态和音频实际状态
      if (playing && !audio.paused) { 
        fadeIn(audio);
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
      // 暂停时：先停止ended事件的自动循环，再执行淡出
      setPlaying(false);
      fadeOut(audio);
    } else {
      setPlaying(true);
      fadeIn(audio);
    }
  };

  // 平滑淡入
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

  // 修复：确保淡出后彻底停止播放并同步状态
  const fadeOut = (audio: HTMLAudioElement) => {
    if (fadeTimerRef.current) {
      clearInterval(fadeTimerRef.current);
    }

    let v = audio.volume;
    fadeTimerRef.current = setInterval(() => {
      v -= 0.02;
      if (v <= 0) {
        audio.pause();
        audio.currentTime = 0; // 重置播放位置（可选）
        clearInterval(fadeTimerRef.current!);
        fadeTimerRef.current = null;
        // 双重保障：确保状态与实际播放状态一致
        setPlaying(false);
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
