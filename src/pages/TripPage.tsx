import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Compass, ExternalLink, Move, Navigation, Route } from "lucide-react";
import { PageHead } from "../components/Chrome";
import { GpxMap } from "../components/GpxMap";
import { RouteOverview } from "../components/RouteOverview";
import { gpxFacts, references, tripDays } from "../lib/trip-data";
import { dayColors, dayLegend } from "../lib/route-map-data";

// 瞬間跳轉：smooth 捲動會被路線圖聚焦切換的重繪取消，直接跳最可靠
function scrollToDay(index: number) {
  document.getElementById(`day-${index + 1}`)?.scrollIntoView({ block: "start" });
}

export function TripPage() {
  const [focusDay, setFocusDay] = useState(0);
  const location = useLocation();

  // 首頁「今日行程」卡與舊 /trip/:day 連結會帶 state.day，落地後捲到對應日
  useEffect(() => {
    const target = (location.state as { day?: number } | null)?.day;
    if (typeof target === "number" && target >= 0 && target <= 2) {
      setFocusDay(target);
      // 等版面（尤其地圖卡）先排好，再捲動
      const timer = setTimeout(() => scrollToDay(target), 120);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <>
      <PageHead
        kicker="3 DAYS ON THE TRAIL"
        title="三日行程"
        intro="行程時間依台灣 368 三天兩夜行程與實走時距推估，實際行動以領隊依天候與隊伍狀況宣布為準。"
      />

      <nav className="day-jump" aria-label="跳到某一天">
        {tripDays.map((day, i) => (
          <button
            key={day.date}
            style={{ "--day-color": dayColors[i] } as React.CSSProperties}
            onClick={() => {
              setFocusDay(i);
              // 先讓路線圖聚焦切換的重繪完成再捲動，否則 smooth scroll 會被版面變動中斷
              setTimeout(() => scrollToDay(i), 60);
            }}
          >
            <small>DAY {i + 1}</small>
            <b>{day.date}</b>
            <span>{day.subtitle}</span>
          </button>
        ))}
      </nav>

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
            <span className="kicker">ACTUAL GPX TRACK</span>
            <h2>實際軌跡地圖</h2>
          </div>
        </div>
        <div className="map-card">
          <GpxMap />
          <div className="map-facts">
            <span className="map-fact-main">
              <Compass size={15} />
              <span>
                <b>2026 實走 GPX</b>
                <small>
                  {gpxFacts.distance} · 爬升 {gpxFacts.ascent}
                </small>
              </span>
            </span>
            <span className="map-legend">
              <i /> 紅線為完整實際軌跡
            </span>
          </div>
        </div>
      </section>

      <p className="segment-hint">
        <Navigation size={14} /> 每站下方顯示「本站 → 下一站」的估計路程與時間
      </p>

      {tripDays.map((day, index) => (
        <section
          className="section day-section"
          id={`day-${index + 1}`}
          key={day.date}
          style={{ "--day-color": dayColors[index] } as React.CSSProperties}
        >
          <div className="day-summary">
            <span className="day-summary-tag">
              <Route size={14} /> DAY {index + 1} · {day.date} {day.weekday} · {day.subtitle}
            </span>
            <h2>{day.title}</h2>
            <dl>
              <div>
                <dt>路程</dt>
                <dd>{day.distance}</dd>
              </div>
              <div>
                <dt>預估時間</dt>
                <dd>{day.time}</dd>
              </div>
              <div>
                <dt>站點</dt>
                <dd>{day.points.length} 站</dd>
              </div>
            </dl>
          </div>

          <ol className="timeline">
            {day.points.map((point, i) => (
              <li className="timeline-row" key={point.time + point.title}>
                <time>{point.time}</time>
                <i className={i === 0 ? "is-first" : ""} />
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.note}</p>
                  {point.legDistance !== "—" && (
                    <span className="segment">
                      <b>{point.legDistance}</b>
                      <em>約 {point.legDuration}</em>
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}

      <section className="section">
        <div className="section-head">
          <div>
            <span className="kicker">REFERENCES</span>
            <h2>參考資料</h2>
          </div>
        </div>
        <ul className="reference-list">
          {references.map(ref => (
            <li key={ref.url}>
              <a href={ref.url} target="_blank" rel="noreferrer">
                <span>
                  <b>{ref.label}</b>
                  <small>{ref.note}</small>
                </span>
                <ExternalLink size={14} />
              </a>
            </li>
          ))}
        </ul>
        <p className="source-note">
          時間為行前規劃推估值，非即時路況。地形圖磚需連線載入，未瀏覽過的區域離線時可能空白；GPX
          紅線軌跡離線仍可查看。
        </p>
      </section>
    </>
  );
}
