import { useEffect, useRef, useState, useCallback } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.4);
  const playingRef = useRef(true);

  // 同步 ref 与 state
  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  // 初始化播放 + 监听循环事件
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (playingRef.current && !audio.paused) {
        audio.currentTime = 0;
        audio.play().catch((err) => {
          console.warn("自动播放失败：", err);
          playingRef.current = false;
          setPlaying(false);
        });
      }
    };

    audio.addEventListener("ended", handleEnded);
    audio.volume = volume;

    // 初始自动播放
    if (playingRef.current) {
      audio.play().catch((err) => {
        console.warn("自动播放失败：", err);
        playingRef.current = false;
        setPlaying(false);
      });
    }

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // 音量变化时更新
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingRef.current) {
      // 暂停：立即停止
      playingRef.current = false;
      setPlaying(false);
      audio.pause();
      audio.currentTime = 0;
    } else {
      // 播放：立即开始
      playingRef.current = true;
      setPlaying(true);
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
