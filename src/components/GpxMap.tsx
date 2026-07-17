import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { allPlaces, dayPlaces, gpxFacts } from "../lib/trip-data";

/**
 * 2026/05/01 實走 GPX 的完整軌跡。GPX 檔本身由 service worker 快取，離線可讀；
 * OpenTopoMap 的地形圖磚未預載，離線時不保證顯示。
 * 不傳 day 時顯示全程主要航點（行程頁單一地圖模式）。
 */
export function GpxMap({ day }: { day?: number }) {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!element.current) return;
    let disposed = false;
    let map: import("leaflet").Map | undefined;

    import("leaflet").then(async L => {
      if (disposed || !element.current) return;
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

      map = L.map(element.current, { zoomControl: true, scrollWheelZoom: false, attributionControl: true });
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
            .addTo(map!);
        });
      map.fitBounds(line.getBounds(), { padding: [22, 22] });
    });

    return () => {
      disposed = true;
      map?.remove();
    };
  }, [day]);

  return <div ref={element} className="gpx-map" aria-label="奇萊南華實際 GPX 軌跡地圖" />;
}
