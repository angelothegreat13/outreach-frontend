"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function TopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const startLoading = useCallback(() => {
    setLoading(true);
    setProgress(0);
  }, []);

  // Reset on route change
  useEffect(() => {
    setLoading(false);
    setProgress(100);
    const timeout = setTimeout(() => setProgress(0), 300);
    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  // Animate progress while loading
  useEffect(() => {
    if (!loading) return;

    setProgress(20);
    const t1 = setTimeout(() => setProgress(40), 100);
    const t2 = setTimeout(() => setProgress(60), 300);
    const t3 = setTimeout(() => setProgress(80), 600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [loading]);

  // Intercept link clicks to start loader
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#")) return;
      if (href === pathname) return;

      startLoading();
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname, startLoading]);

  if (progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-0.5">
      <div
        className={cn(
          "h-full bg-primary transition-all ease-out",
          loading ? "duration-[2000ms]" : "duration-300"
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
