import { useEffect, useRef, useState, useCallback } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.4);
  const fadeTimerRef = useRef<number | null>(null);
  // 使用 ref 追踪实际播放状态，避免闭包问题
  const playingRef = useRef(true);
  const volumeRef = useRef(0.4);

  // 同步 ref 与 state
  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  // 1. 组件挂载：初始化播放 + 监听循环事件
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 使用 ref 读取最新状态，避免闭包陷阱
    const handleEnded = () => {
      if (playingRef.current && !audio.paused) {
        // 使用 ref 中的最新音量
        fadeIn(audio, volumeRef.current);
      }
    };

    audio.addEventListener("ended", handleEnded);

    // 初始自动播放
    if (playingRef.current) {
      fadeIn(audio, volume);
    }

    return () => {
      audio.removeEventListener("ended", handleEnded);
      if (fadeTimerRef.current) {
        clearInterval(fadeTimerRef.current);
      }
    };
  }, []); // 空依赖，只绑定一次事件

  // 2. 音量变化时更新（非淡入淡出期间）
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && !fadeTimerRef.current) {
      audio.volume = volume;
    }
  }, [volume]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingRef.current) {
      // 先更新 ref，再执行淡出
      playingRef.current = false;
      setPlaying(false);
      fadeOut(audio);
    } else {
      playingRef.current = true;
      setPlaying(true);
      fadeIn(audio, volumeRef.current);
    }
  }, []);

  // 平滑淡入 - 接收目标音量参数，避免依赖闭包
  const fadeIn = (audio: HTMLAudioElement, targetVolume: number) => {
    if (fadeTimerRef.current) {
      clearInterval(fadeTimerRef.current);
    }

    audio.volume = 0;
    audio.currentTime = 0; // 从头开始播放
    audio.play().catch((err) => {
      console.warn("自动播放失败（浏览器策略限制）：", err);
      playingRef.current = false;
      setPlaying(false);
    });

    let v = 0;
    fadeTimerRef.current = setInterval(() => {
      v += 0.02;
      if (v >= targetVolume) {
        audio.volume = targetVolume;
        clearInterval(fadeTimerRef.current!);
        fadeTimerRef.current = null;
      } else {
        audio.volume = v;
      }
    }, 40);
  };

  // 平滑淡出
  const fadeOut = (audio: HTMLAudioElement) => {
    if (fadeTimerRef.current) {
      clearInterval(fadeTimerRef.current);
    }

    let v = audio.volume;
    fadeTimerRef.current = setInterval(() => {
      v -= 0.02;
      if (v <= 0) {
        audio.pause();
        audio.currentTime = 0;
        clearInterval(fadeTimerRef.current!);
        fadeTimerRef.current = null;
      } else {
        audio.volume = v;
      }
    }, 40);
  };

  return (
    <>
      <audio ref={audioRef} src="/background.mp3" preload="auto" />
      
      <div className="fixed bottom-6 right-6 bg-black/20 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl flex items-center justify-center gap-4 z-[9999]">
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
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
