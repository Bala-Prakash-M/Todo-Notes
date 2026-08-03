// app/layouts/SmoothScrollLayout.tsx
import { ReactLenis } from "lenis/react";
import { Outlet } from "react-router-dom";
import "lenis/dist/lenis.css";

export function SmoothScrollLayout() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      <Outlet />
    </ReactLenis>
  );
}