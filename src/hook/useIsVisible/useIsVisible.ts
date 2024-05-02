import { useEffect, useState } from "react";

export function useIsVisible(ref: React.RefObject<HTMLElement>) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) {
        return setIntersecting(entry.isIntersecting);
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}
