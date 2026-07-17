import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Compass, Move } from "lucide-react";
import { PageHead } from "../components/Chrome";
import { RouteOverview } from "../components/RouteOverview";
import { gpxFacts, tripDays } from "../lib/trip-data";
import { dayColors, dayLegend } from "../lib/route-map-data";

export function TripPage() {
  const [focusDay, setFocusDay] = useState(0);

  return (
    <>
      <PageHead
        kicker="3 DAYS ON THE TRAIL"
        title="三日行程"
        intro="時間為行前規劃，實際行動以領隊依天候與隊伍狀況宣布為準。點任一天看完整時間軸與地圖。"
      />

      <section className="section">
        <ul className="day-card-list">
          {tripDays.map((day, i) => (
            <li key={day.date}>
              <Link
                className="day-card"
                to={`/trip/${i + 1}`}
                style={{ "--day-color": dayColors[i] } as React.CSSProperties}
              >
                <span className="day-card-tile">
                  <small>DAY {i + 1}</small>
                  <b>{day.date}</b>
                  <span>{day.weekday}</span>
                </span>
                <span className="day-card-body">
                  <span className="day-card-tag">{day.subtitle}</span>
                  <strong>{day.title}</strong>
                  <small>
                    {day.distance} · {day.time} · {day.points.length} 站
                  </small>
                </span>
                <ChevronRight className="day-card-chevron" size={18} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <span className="kicker">3-DAY ROUTE OVERVIEW</span>
            <h2>三日路線總覽</h2>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-legend">
            {dayLegend.map((entry, i) => (
              <button
                key={entry.label}
                className={`legend-chip ${focusDay === i ? "is-active" : ""}`}
                style={{ "--day-color": dayColors[i] } as React.CSSProperties}
                onClick={() => setFocusDay(i)}
                aria-pressed={focusDay === i}
              >
                <i />
                <b>{entry.label}</b>
                <span>{entry.note}</span>
              </button>
            ))}
          </div>

          <RouteOverview day={focusDay} />

          <p className="overview-swipe">
            <Move size={13} /> 左右滑動看完整路線・點日期切換突顯的那一天
          </p>
          <p className="overview-note">
            路徑骨架依隊上提供的參考圖重繪，起點更新為雲天宮線。示意圖非導航比例尺，Day 1 與 Day 3
            走同一條廊道，圖上以兩條平行線表示。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <span className="kicker">GPX SOURCE</span>
            <h2>軌跡資料</h2>
          </div>
        </div>
        <div className="gpx-facts-card">
          <Compass size={16} />
          <div>
            <b>2026 實走 GPX</b>
            <small>
              {gpxFacts.distance} · 爬升 {gpxFacts.ascent}・完整軌跡在各日頁面
            </small>
          </div>
        </div>
        <p className="source-note">
          軌跡來源：
          <a href={gpxFacts.sourceUrl} target="_blank" rel="noreferrer">
            {gpxFacts.sourceLabel}
          </a>
          <br />
          入口核對：
          <a href={gpxFacts.entryUrl} target="_blank" rel="noreferrer">
            {gpxFacts.entryLabel}
          </a>
          <br />
          地形圖磚需連線載入，未瀏覽過的區域離線時可能空白。
        </p>
      </section>
    </>
  );
}
