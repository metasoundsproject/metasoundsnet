import { useEffect, useRef, useState, useCallback } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.4);
  const playingRef = useRef(true);
  const volumeRef = useRef(0.4);
  // 用于静音淡出（极快，但避免爆音）
  const muteTimerRef = useRef<number | null>(null);
  // 记录暂停时的播放位置
  const currentTimeRef = useRef(0);

  // 同步 ref 与 state
  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  // 初始化播放
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 监听音频播放结束事件，实现循环播放
    const handleEnded = () => {
      if (playingRef.current) {
        audio.currentTime = 0;
        audio.play().catch((err) => {
          console.warn("循环播放失败：", err);
          playingRef.current = false;
          setPlaying(false);
        });
      }
    };

    audio.addEventListener("ended", handleEnded);
    audio.volume = volume;
    audio.loop = false; // 使用 ended 事件手动控制循环，更可靠

    if (playingRef.current) {
      audio.play().catch((err) => {
        console.warn("自动播放失败：", err);
        playingRef.current = false;
        setPlaying(false);
      });
    }

    return () => {
      audio.removeEventListener("ended", handleEnded);
      if (muteTimerRef.current) {
        clearInterval(muteTimerRef.current);
      }
    };
  }, []);

  // 音量变化时更新
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && !muteTimerRef.current) {
      audio.volume = volume;
    }
  }, [volume]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingRef.current) {
      // 暂停：记录当前播放位置，然后静音停止
      currentTimeRef.current = audio.currentTime;
      playingRef.current = false;
      setPlaying(false);
      
      // 清除之前的定时器
      if (muteTimerRef.current) {
        clearInterval(muteTimerRef.current);
      }
      
      // 极快淡出到0（避免爆音）
      const startVolume = audio.volume;
      const steps = 3;
      const stepDuration = 8;
      let currentStep = 0;
      
      muteTimerRef.current = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          audio.volume = 0;
          audio.pause();
          clearInterval(muteTimerRef.current!);
          muteTimerRef.current = null;
          // 恢复音量设置（为下次播放准备）
          audio.volume = volumeRef.current;
        } else {
          audio.volume = startVolume * Math.pow(1 - currentStep / steps, 2);
        }
      }, stepDuration);
      
    } else {
      // 播放：从记录的位置继续播放
      playingRef.current = true;
      setPlaying(true);
      audio.volume = volumeRef.current;
      audio.currentTime = currentTimeRef.current;
      audio.play().catch((err) => {
        console.warn("播放失败：", err);
        playingRef.current = false;
        setPlaying(false);
      });
    }
  }, []);

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
