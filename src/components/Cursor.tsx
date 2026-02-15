import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current!;
    const inner = innerRef.current!;

    let mouseX = 0;
    let mouseY = 0;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(inner, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
      });

      gsap.to(outer, {
        x: mouseX,
        y: mouseY,
        duration: 0.25,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);

    // hover effects
    const hoverTargets = document.querySelectorAll("a, button");

    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(outer, {
          scale: 1.8,
          opacity: 0.6,
          duration: 0.3,
        });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(outer, {
          scale: 1,
          opacity: 0.3,
          duration: 0.3,
        });
      });
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999]"
        style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div
        ref={innerRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999]"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}