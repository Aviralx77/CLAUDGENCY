import { useState, useEffect, useCallback } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

export function useCursorGlow() {
  const [position, setPosition] = useState<CursorPosition>({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = ((e.clientY + window.scrollY) / document.body.scrollHeight) * 100;
    setPosition({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return position;
}
