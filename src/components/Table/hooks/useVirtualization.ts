// hooks/useVirtualization.ts
import { useState, useMemo } from "react";

interface VirtualizationConfig<T> {
  data: T[];
  containerHeight: number;
  rowHeight: number;
  overscan?: number; // extra rows for smooth scrolling
}

export function useVirtualization<T>({
  data,
  containerHeight,
  rowHeight,
  overscan = 2,
}: VirtualizationConfig<T>) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleRows = Math.max(1, Math.floor(containerHeight / rowHeight));
  const startIndex = Math.floor(scrollTop / rowHeight);
  const endIndex = Math.min(startIndex + visibleRows + overscan, data.length);

  const visibleData = useMemo(
    () => data.slice(startIndex, endIndex),
    [data, startIndex, endIndex]
  );
  const offsetY = startIndex * rowHeight;

  const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    setScrollTop((e.target as HTMLDivElement).scrollTop);
  };

  return {
    visibleData,
    offsetY,
    handleScroll,
    totalHeight: data.length * rowHeight,
  };
}
