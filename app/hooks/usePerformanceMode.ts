"use client";

import { useEffect, useMemo, useState } from "react";

type PerformanceMode = "high" | "balanced" | "low";

function detectInitialMode(): PerformanceMode {
  if (typeof window === "undefined") {
    return "high";
  }

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
    mozConnection?: { saveData?: boolean };
    webkitConnection?: { saveData?: boolean };
  };

  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
  const saveData = connection?.saveData;
  const cores = typeof navigator.hardwareConcurrency === "number" ? navigator.hardwareConcurrency : undefined;
  const memory = typeof nav.deviceMemory === "number" ? nav.deviceMemory : undefined;
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const isSmallViewport = window.matchMedia?.("(max-width: 640px)").matches;
  const isLowPixelRatio = window.devicePixelRatio && window.devicePixelRatio > 0 ? window.devicePixelRatio >= 2.5 : false;

  if (saveData || prefersReducedMotion) {
    return "low";
  }

  if (isSmallViewport) {
    return "low";
  }

  if (cores && cores <= 4) {
    return "low";
  }

  if (memory && memory <= 4) {
    return "low";
  }

  if (isLowPixelRatio && (cores && cores <= 6)) {
    return "low";
  }

  if (cores && cores <= 6) {
    return "balanced";
  }

  return "high";
}

export function usePerformanceMode(): PerformanceMode {
  const [mode, setMode] = useState<PerformanceMode>(() => detectInitialMode());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleChange = () => {
      const nextMode = detectInitialMode();
      setMode((current) => (current === nextMode ? current : nextMode));
    };

    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    media?.addEventListener?.("change", handleChange);
    window.addEventListener("resize", handleChange);
    window.addEventListener("orientationchange", handleChange);

    handleChange();

    return () => {
      media?.removeEventListener?.("change", handleChange);
      window.removeEventListener("resize", handleChange);
      window.removeEventListener("orientationchange", handleChange);
    };
  }, []);

  return mode;
}

export function useIsLowPerformance(): boolean {
  const mode = usePerformanceMode();
  return useMemo(() => mode === "low", [mode]);
}
