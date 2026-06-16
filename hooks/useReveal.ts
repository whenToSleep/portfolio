import { useEffect } from "react";

/**
 * Scroll-reveal: slides `.reveal` elements into place as they enter the
 * viewport. Ported 1:1 from the prototype. Content is never hidden by
 * opacity (see globals.css), so it degrades gracefully without JS or with
 * reduced motion. `dep` re-runs the pass when the page/lang/filter changes.
 */
export function useReveal(dep?: unknown) {
  useEffect(() => {
    const motionOK =
      !window.matchMedia || !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (motionOK) document.body.classList.add("reveal-ready");
    const timers: ReturnType<typeof setTimeout>[] = [];
    function check() {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const els = document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)");
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.94 && r.bottom > -40) el.classList.add("is-in");
      });
    }
    // Multiple passes via setTimeout (fires even when rAF/IO are suppressed
    // in a backgrounded preview document).
    [0, 60, 160, 360].forEach((ms) => timers.push(setTimeout(check, ms)));
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [dep]);
}
