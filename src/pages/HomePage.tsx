import { Link } from "react-router-dom";
import { AlertTriangle, Backpack, BellRing, ChevronRight, MapPin, TentTree } from "lucide-react";
import { TRIP, notices, totalGear, tripDays } from "../lib/trip-data";
import { useDaysUntil, useGear, useTripDayIndex } from "../lib/hooks";

const NOTICE_ICON = { urgent: BellRing, warn: AlertTriangle, info: TentTree };

function Ridge() {
  return (
    <svg className="hero-ridge" viewBox="0 0 400 90" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 90 L0 58 L38 30 L70 52 L104 18 L146 56 L188 26 L226 60 L268 34 L312 62 L352 40 L400 66 L400 90 Z" />
    </svg>
  );
}

export function HomePage() {
  const days = useDaysUntil(TRIP.start);
  const todayIndex = useTripDayIndex();
  const { checked } = useGear();
  const focusIndex = todayIndex ?? 0;
  const day = tripDays[focusIndex];
  const percent = Math.round((checked.length / totalGear) * 100);

  return (
    <>
      <section className="hero">
        <Ridge />
        <span className="hero-eyebrow">{TRIP.dateLabel}</span>
        <h1 className="hero-title">
          屏東旋風青年登山隊
          <br />
          2026 奇萊南華登山手冊
        </h1>

        <div className="countdown" aria-live="polite">
          {todayIndex === null ? (
            <>
              <b>{days ?? "—"}</b>
              <span>
                天後
                <br />
                出發
              </span>
            </>
          ) : (
            <>
              <b>{todayIndex + 1}</b>
              <span>
                行程
                <br />第 {todayIndex + 1} 天
              </span>
            </>
          )}
        </div>

        <dl className="hero-stats">
          <div>
            <dt>隊員</dt>
            <dd>{TRIP.members} 人</dd>
          </div>
          <div>
            <dt>行程</dt>
            <dd>3 天 2 夜</dd>
          </div>
          <div>
            <dt>營地</dt>
            <dd>每晚 4 個</dd>
          </div>
        </dl>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <span className="kicker">{todayIndex === null ? "DEPARTURE DAY" : "TODAY ON THE TRAIL"}</span>
            <h2>{todayIndex === null ? "出發日行程" : "今日行程"}</h2>
          </div>
          <Link className="text-link" to="/trip">
            完整行程 <ChevronRight size={15} />
          </Link>
        </div>

        <Link className="today-card" to="/trip" state={{ day: focusIndex }}>
          <span className="date-tile">
            <b>{day.date.split("/")[1]}</b>
            <small>AUG</small>
          </span>
          <span className="today-body">
            <span className={`day-pill day-${focusIndex + 1}`}>
              DAY {focusIndex + 1} · {day.subtitle}
            </span>
            <strong>{day.title}</strong>
            <span className="today-meta">
              <MapPin size={13} />
              {day.points[0].time} {day.points[0].title}・{day.distance}・{day.time}
            </span>
          </span>
          <ChevronRight className="today-chevron" size={18} />
        </Link>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <span className="kicker">FIELD ALERTS</span>
            <h2>重要提醒</h2>
          </div>
        </div>
        <ul className="notice-list">
          {notices.map(notice => {
            const Icon = NOTICE_ICON[notice.level];
            return (
              <li className={`notice notice-${notice.level}`} key={notice.title}>
                <span className="notice-icon">
                  <Icon size={17} />
                </span>
                <div>
                  <span className="notice-tag">{notice.tag}</span>
                  <h3>{notice.title}</h3>
                  <p>{notice.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <span className="kicker">PRE-DEPARTURE</span>
            <h2>行前準備</h2>
          </div>
          <Link className="text-link" to="/gear">
            查看裝備 <ChevronRight size={15} />
          </Link>
        </div>

        <Link className="progress-card" to="/gear">
          <span className="progress-head">
            <span className="progress-icon">
              <Backpack size={18} />
            </span>
            <span className="progress-text">
              <strong>裝備完成度</strong>
              <small>
                {checked.length} / {totalGear} 項已備妥
              </small>
            </span>
            <b className="progress-value">{percent}%</b>
          </span>
          <span className="progress-bar">
            <i style={{ width: `${percent}%` }} />
          </span>
        </Link>
      </section>
    </>
  );
}
