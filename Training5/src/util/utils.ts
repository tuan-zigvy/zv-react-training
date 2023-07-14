export function throttle<Params extends any[]>(
  fun: (...args: Params) => any,
  delay: number
): (...args: Params) => void {
  let inThrottle = false;
  return (...args: Params) => {
    if (!inThrottle) {
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, delay);
      fun(...args);
    }
  };
}

export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  delay: number
): (...args: Params) => void {
  let timer: NodeJS.Timeout;

  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
