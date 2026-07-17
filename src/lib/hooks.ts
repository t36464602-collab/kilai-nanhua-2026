import { useEffect, useState } from "react";

const GEAR_KEY = "ptyma-gear";

/** 裝備勾選是個人裝置狀態，離線可用且不需要登入，因此只存 localStorage。 */
function readGear(): string[] {
  const saved = localStorage.getItem(GEAR_KEY);
  if (!saved) return [];
  try {
    const parsed: unknown = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    // 舊資料損毀就當作未勾選，不清掉使用者的其他資料
    return [];
  }
}

export function useGear() {
  const [checked, setChecked] = useState<string[]>([]);

  // localStorage 只有瀏覽器才讀得到，所以在 mount 後才還原
  useEffect(() => {
    const restore = () => setChecked(readGear());
    restore();
  }, []);

  const toggle = (item: string) =>
    setChecked(prev => {
      const next = prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item];
      localStorage.setItem(GEAR_KEY, JSON.stringify(next));
      return next;
    });

  return { checked, toggle };
}

export function useOnline() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    sync();
    addEventListener("online", sync);
    addEventListener("offline", sync);
    return () => {
      removeEventListener("online", sync);
      removeEventListener("offline", sync);
    };
  }, []);

  return online;
}

/** 在瀏覽器算，避免 SSR 與 client 的時間不同造成 hydration 不一致。 */
export function useDaysUntil(iso: string) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const compute = () =>
      setDays(Math.max(0, Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000)));
    compute();
    const timer = setInterval(compute, 60_000);
    return () => clearInterval(timer);
  }, [iso]);

  return days;
}

const TRIP_DATES = ["2026-08-07", "2026-08-08", "2026-08-09"];

/**
 * 行程進行中回傳當天的 index，其他時候回傳 null（首頁改顯示出發日行程）。
 * 以台北時區判斷，並在瀏覽器計算避免 hydration 不一致。
 */
export function useTripDayIndex() {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const compute = () => {
      const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Taipei",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date());
      const found = TRIP_DATES.indexOf(today);
      setIndex(found === -1 ? null : found);
    };
    compute();
    const timer = setInterval(compute, 300_000);
    return () => clearInterval(timer);
  }, []);

  return index;
}
