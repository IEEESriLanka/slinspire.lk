import { useState, useEffect, useCallback } from "react";
import { APP_CONFIG } from "@/config/constants";

export function useRegistrationCount() {
  const [count, setCount] = useState(0);
  const [remaining, setRemaining] = useState(200);
  const [isFull, setIsFull] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCount = useCallback(async () => {
    try {
      const res = await fetch(
        `${APP_CONFIG.ENDPOINTS.STEP_UP_GOOGLE_SCRIPT}?t=${Date.now()}`
      );
      const data = await res.json();
      setCount(data.count || 0);
      setRemaining(data.remaining ?? (110 - (data.count || 0)));
      setIsFull(data.isFull ?? (data.count >= 110));
    } catch (err) {
      console.error("Failed to fetch registration count", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCount();
    const interval = setInterval(fetchCount, 10000);
    return () => clearInterval(interval);
  }, [fetchCount]);

  return { count, remaining, isFull, loading, refetch: fetchCount };
}
