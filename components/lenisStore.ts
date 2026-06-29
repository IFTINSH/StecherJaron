// Tiny pub/sub so scroll-driven components (e.g. ParallaxImage) update reliably
// from Lenis' smooth scroll on desktop — where Framer's useScroll doesn't pick up
// Lenis' programmatic scroll. SmoothScroll forwards Lenis' scroll events here.
const subscribers = new Set<() => void>();

export function onLenisScroll(cb: () => void) {
  subscribers.add(cb);
  return () => subscribers.delete(cb);
}

export function emitLenisScroll() {
  subscribers.forEach((cb) => cb());
}
