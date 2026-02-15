import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current!;
    const cross = crossRef.current!;

    let x = 0;
    let y = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;

      // 外环（带惯性）
      gsap.to(ring, {
        x,
        y,
        duration: 0.25,
        ease: "power3.out",
      });

      // 十字准星（快速跟随）
      gsap.to(cross, {
        x,
        y,
        duration: 0.08,
      });
    };

    window.addEventListener("mousemove", move);

    // hover 放大（交互提示）
    const targets = document.querySelectorAll("a, button");

    targets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(ring, {
          scale: 1.8,
          opacity: 1,
          duration: 0.25,
        });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(ring, {
          scale: 1,
          opacity: 0.6,
          duration: 0.25,
        });
      });
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      {/* 线条外环 */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 36,
          height: 36,
          border: "1px solid rgba(255,255,255,0.6)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 12px rgba(255,255,255,0.15)", // 微 glow
          mixBlendMode: "difference", // 不遮挡文字关键！
        }}
      />

      {/* 十字准星 */}
      <div
        ref={crossRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 10,
          height: 10,
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: 1,
            background: "#fff",
            top: "50%",
            left: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 1,
            height: "100%",
            background: "#fff",
            left: "50%",
            top: 0,
          }}
        />
      </div>
    </>
  );
}