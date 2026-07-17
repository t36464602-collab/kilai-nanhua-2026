import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Navigation, Route } from "lucide-react";
import { GpxMap } from "../components/GpxMap";
import { tripDays } from "../lib/trip-data";
import { dayColors } from "../lib/route-map-data";

export function TripDayPage() {
  const { day } = useParams();
  const index = Number(day) - 1;
  if (!Number.isInteger(index) || index < 0 || index > 2) return <Navigate to="/trip" replace />;

  const current = tripDays[index];
  const dayStyle = { "--day-color": dayColors[index] } as React.CSSProperties;

  return (
    <>
      <nav className="day-switch" style={dayStyle} aria-label="切換日期">
        <Link className="day-switch-back" to="/trip">
          <ChevronLeft size={16} /> 行程
        </Link>
        <div className="day-switch-tabs">
          {tripDays.map((d, i) => (
            <Link
              key={d.date}
              to={`/trip/${i + 1}`}
              className={i === index ? "is-active" : ""}
              style={{ "--day-color": dayColors[i] } as React.CSSProperties}
              aria-current={i === index ? "page" : undefined}
            >
              {d.date}
            </Link>
          ))}
        </div>
      </nav>

      <section className="day-summary" style={dayStyle}>
        <span className="day-summary-tag">
          <Route size={14} /> DAY {index + 1} · {current.subtitle}
        </span>
        <h1>{current.title}</h1>
        <dl>
          <div>
            <dt>路程</dt>
            <dd>{current.distance}</dd>
          </div>
          <div>
            <dt>預估時間</dt>
            <dd>{current.time}</dd>
          </div>
          <div>
            <dt>站點</dt>
            <dd>{current.points.length} 站</dd>
          </div>
        </dl>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <span className="kicker">ACTUAL GPX TRACK</span>
            <h2>實際軌跡地圖</h2>
          </div>
        </div>
        <div className="map-card">
          <GpxMap day={index} />
          <div className="map-facts">
            <span className="map-legend">
              <i /> 紅線為完整實際軌跡，白點為本日重點
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <span className="kicker">TIMELINE</span>
            <h2>DAY {index + 1} 時間軸</h2>
          </div>
        </div>
        <p className="segment-hint">
          <Navigation size={14} /> 每站下方顯示「本站 → 下一站」的估計路程與時間
        </p>
        <ol className="timeline" style={dayStyle}>
          {current.points.map((point, i) => (
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

      <nav className="day-pager" aria-label="前後日">
        {index > 0 ? (
          <Link to={`/trip/${index}`} className="day-pager-link">
            <ChevronLeft size={16} />
            <span>
              <small>DAY {index}</small>
              <b>{tripDays[index - 1].title}</b>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {index < 2 ? (
          <Link to={`/trip/${index + 2}`} className="day-pager-link is-next">
            <span>
              <small>DAY {index + 2}</small>
              <b>{tripDays[index + 1].title}</b>
            </span>
            <ChevronRight size={16} />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </>
  );
}
