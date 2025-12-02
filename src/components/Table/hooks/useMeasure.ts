import { useState, useCallback, useLayoutEffect, useEffect } from "react";

export interface Rect {
  width: number;
  height: number;
  top: number;
  left: number;
  x: number;
  y: number;
}

export function useMeasure<T extends HTMLElement>(): [
  (node: T | null) => void,
  Rect
] {
  const [rect, setRect] = useState<Rect>({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    x: 0,
    y: 0,
  });

  const [node, setNode] = useState<T | null>(null);

  const ref = useCallback((el: T | null) => {
    setNode(el);
  }, []);

  useEffect(() => {
    if (!node) return;

    const observer = new ResizeObserver(() => {
      const domRect = node.getBoundingClientRect();
      setRect({
        width: domRect.width,
        height: domRect.height,
        top: domRect.top,
        left: domRect.left,
        x: domRect.x,
        y: domRect.y,
      });
    });

    observer.observe(node);

    // Initial measure
    const domRect = node.getBoundingClientRect();
    setRect({
      width: domRect.width,
      height: domRect.height,
      top: domRect.top,
      left: domRect.left,
      x: domRect.x,
      y: domRect.y,
    });

    return () => observer.disconnect();
  }, [node]);

  return [ref, rect];
}
