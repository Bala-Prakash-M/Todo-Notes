import { useLayoutEffect } from "react";
import Lenis from "lenis";
import { Outlet } from "react-router-dom";
import "lenis/dist/lenis.css";

export function SmoothScrollLayout() {
  useLayoutEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      autoRaf: false,
    });

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    lenis.resize();
    lenis.scrollTo(window.scrollY, { immediate: true });
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <Outlet />;
}
