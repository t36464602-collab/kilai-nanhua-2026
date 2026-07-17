import { useEffect, useRef, useState } from "react";
import { LocateFixed, LoaderCircle } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { allPlaces, dayPlaces, gpxFacts } from "../lib/trip-data";

type LocateState = "off" | "locating" | "on" | "error";

/**
 * 2026/05/01 實走 GPX 的完整軌跡。GPX 檔本身由 service worker 快取，離線可讀；
 * OpenTopoMap 的地形圖磚未預載，離線時不保證顯示。
 * 「顯示我的位置」用瀏覽器 Geolocation（GPS 不需網路），藍點＋精度圈疊在軌跡上。
 * 不傳 day 時顯示全程主要航點（行程頁單一地圖模式）。
 */
export function GpxMap({ day }: { day?: number }) {
  const element = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const watchRef = useRef<number | null>(null);
  const dotRef = useRef<import("leaflet").CircleMarker | null>(null);
  const ringRef = useRef<import("leaflet").Circle | null>(null);
  const centeredRef = useRef(false);
  const [locate, setLocate] = useState<LocateState>("off");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!element.current) return;
    let disposed = false;

    import("leaflet").then(async L => {
      if (disposed || !element.current) return;
      leafletRef.current = L;
      // 站台部署在 GitHub Pages 子路徑下，須用 BASE_URL 解析，寫死 /xxx 會 404
      const response = await fetch(import.meta.env.BASE_URL + gpxFacts.file);
      const xml = new DOMParser().parseFromString(await response.text(), "application/xml");
      const track = Array.from(xml.querySelectorAll("trkpt")).map(
        point => [Number(point.getAttribute("lat")), Number(point.getAttribute("lon"))] as [number, number],
      );
      const waypoints = Array.from(xml.querySelectorAll("wpt")).map(point => ({
        name: point.querySelector("name")?.textContent || "路線點",
        lat: Number(point.getAttribute("lat")),
        lon: Number(point.getAttribute("lon")),
      }));
      if (!track.length || disposed) return;

      const map = L.map(element.current, { zoomControl: true, scrollWheelZoom: false, attributionControl: true });
      mapRef.current = map;
      L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution:
          '地圖 © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://opentopomap.org">OpenTopoMap</a>',
      }).addTo(map);

      const line = L.polyline(track, { color: "#dc4e2f", weight: 5, opacity: 0.92 }).addTo(map);
      const wanted = day === undefined ? allPlaces : dayPlaces[day];
      waypoints
        .filter(point => wanted.some(name => point.name.includes(name.replace("登山口", ""))))
        .forEach(point => {
          L.circleMarker([point.lat, point.lon], {
            radius: 7,
            color: "#fffdf7",
            weight: 3,
            fillColor: "#123c2f",
            fillOpacity: 1,
          })
            .bindTooltip(point.name, { permanent: true, direction: "top", className: "route-tooltip" })
            .addTo(map);
        });
      map.fitBounds(line.getBounds(), { padding: [22, 22] });
    });

    return () => {
      disposed = true;
      if (watchRef.current !== null) navigator.geolocation.clearWatch(watchRef.current);
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [day]);

  const stopLocate = () => {
    if (watchRef.current !== null) {
      navigator.geolocation.clearWatch(watchRef.current);
      watchRef.current = null;
    }
    dotRef.current?.remove();
    ringRef.current?.remove();
    dotRef.current = null;
    ringRef.current = null;
    centeredRef.current = false;
    setLocate("off");
    setStatus(null);
  };

  const startLocate = () => {
    if (!("geolocation" in navigator)) {
      setLocate("error");
      setStatus("這台裝置不支援定位。");
      return;
    }
    setLocate("locating");
    setStatus("定位中…（首次使用請允許位置權限）");
    watchRef.current = navigator.geolocation.watchPosition(
      position => {
        const L = leafletRef.current;
        const map = mapRef.current;
        if (!L || !map) return;
        const { latitude, longitude, accuracy } = position.coords;
        if (!dotRef.current) {
          ringRef.current = L.circle([latitude, longitude], {
            radius: accuracy,
            color: "#1687d5",
            weight: 1,
            fillColor: "#1687d5",
            fillOpacity: 0.12,
          }).addTo(map);
          dotRef.current = L.circleMarker([latitude, longitude], {
            radius: 8,
            color: "#fffdf7",
            weight: 3,
            fillColor: "#1687d5",
            fillOpacity: 1,
          }).addTo(map);
        } else {
          dotRef.current.setLatLng([latitude, longitude]);
          ringRef.current?.setLatLng([latitude, longitude]);
          ringRef.current?.setRadius(accuracy);
        }
        // 只在第一次定位成功時把視角帶過去，之後不搶使用者的地圖操作
        if (!centeredRef.current) {
          centeredRef.current = true;
          map.setView([latitude, longitude], Math.max(map.getZoom(), 15));
        }
        setLocate("on");
        setStatus(`定位中：精度約 ${Math.round(accuracy)} m`);
      },
      error => {
        stopLocate();
        setLocate("error");
        setStatus(
          error.code === error.PERMISSION_DENIED
            ? "未取得位置權限。請至瀏覽器設定允許本網站使用位置。"
            : "目前取不到定位訊號，請移至開闊處再試。",
        );
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 20000 },
    );
  };

  return (
    <div className="gpx-map-wrap">
      <div ref={element} className="gpx-map" aria-label="奇萊南華實際 GPX 軌跡地圖" />
      <button
        className={`map-locate-btn ${locate === "on" || locate === "locating" ? "is-active" : ""}`}
        onClick={() => (locate === "on" || locate === "locating" ? stopLocate() : startLocate())}
        aria-pressed={locate === "on" || locate === "locating"}
      >
        {locate === "locating" ? <LoaderCircle className="spin" size={15} /> : <LocateFixed size={15} />}
        {locate === "on" || locate === "locating" ? "停止定位" : "顯示我的位置"}
      </button>
      {status && <p className="map-status">{status}</p>}
    </div>
  );
}
