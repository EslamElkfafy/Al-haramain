import { useState, useEffect } from "react";

export function useViewportBreakpoint(breakpoints, key) {
  const [count, setCount] = useState(getCount());

  function getCount() {
    const width = window.innerWidth;
    for (const breakpoint of breakpoints) {
      if (width >= breakpoint.minWidth) {
        return breakpoint[key];
      }
    }
    return 1;
  }

  useEffect(() => {
    function handleResize() {
      setCount(getCount());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return count;
}
