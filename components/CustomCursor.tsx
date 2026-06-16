"use client";

import { useEffect } from "react";

/**
 * Cinematic custom cursor — event-delegated so it works with React-rendered
 * nodes. Ported 1:1 from the prototype's vanilla IIFE. Disabled on
 * touch / small screens (see the `fine` check and the CSS media query).
 */
export function CustomCursor() {
  useEffect(() => {
    const fine =
      window.matchMedia("(hover: hover)").matches &&
      window.matchMedia("(min-width: 769px)").matches;
    if (!fine) return;

    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    document.body.appendChild(dot);
    document.body.classList.add("cursor-on");

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let seen = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        seen = true;
        x = tx;
        y = ty;
        dot.classList.add("is-visible");
      }
    };
    const onLeave = () => dot.classList.remove("is-visible");
    const onEnter = () => {
      if (seen) dot.classList.add("is-visible");
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const hit = target?.closest?.("[data-cursor]");
      if (hit) {
        dot.setAttribute("data-label", hit.getAttribute("data-cursor") || "");
        dot.classList.add("is-hover");
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const hit = target?.closest?.("[data-cursor]");
      if (!hit) return;
      const related = e.relatedTarget as Element | null;
      const to = related?.closest ? related.closest("[data-cursor]") : null;
      if (!to) dot.classList.remove("is-hover");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    const loop = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      dot.style.transform = "translate(" + x + "px," + y + "px)";
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      dot.remove();
      document.body.classList.remove("cursor-on");
    };
  }, []);

  return null;
}
