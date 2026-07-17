import {
  VIEW_HEIGHT,
  VIEW_WIDTH,
  X_SCALE,
  dayColors,
  routeArrows,
  routeNodes,
  routeSegments,
} from "../lib/route-map-data";
import { Landmark } from "./LandmarkIcons";

const DAY_LABEL = ["DAY 1 上山", "DAY 2 登頂", "DAY 3 下山"];

/**
 * 路徑被壓縮成 scale(X_SCALE, 1) 後，方向向量會從 (cos a, sin a) 變成 (cos a * X_SCALE, sin a)，
 * 箭頭本身不壓縮，所以角度要照著換算，否則箭頭會偏離線的方向。
 */
function compressAngle(angle: number) {
  const radians = (angle * Math.PI) / 180;
  return (Math.atan2(Math.sin(radians), Math.cos(radians) * X_SCALE) * 180) / Math.PI;
}

export function RouteOverview({ day }: { day: number }) {
  const label =
    `奇萊南華三日相對路線圖，目前聚焦 ${DAY_LABEL[day]}。` +
    "路線依序為雲天宮登山口、3K 接回古道、雲海保線所、崩塌路段、7K、8K 木炭窯、10K、天池山莊，" +
    "再由天池山莊經天池岔路前往奇萊南峰，折返後接南華山、光被八表返回天池山莊。";

  return (
    <div className="overview-scroll">
      <svg
        className="overview-svg"
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        role="img"
        aria-label={label}
      >
        <defs>
          <pattern id="fieldGrid" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.1" fill="#123c2f" opacity="0.09" />
          </pattern>
        </defs>

        <rect x="0" y="0" width={VIEW_WIDTH} height={VIEW_HEIGHT} fill="url(#fieldGrid)" />

        {/* 路徑整組橫向壓縮；non-scaling-stroke 讓線寬不受壓縮影響 */}
        <g transform={`scale(${X_SCALE} 1)`}>
          {/* 先畫所有外框，再畫顏色，確保 Day 1 與 Day 3 的平行線互相不被蓋掉 */}
          {routeSegments.map((segment, i) => (
            <path
              key={`casing-${i}`}
              d={segment.d}
              transform={segment.offsetY ? `translate(0 ${segment.offsetY})` : undefined}
              fill="none"
              stroke="#fffdf7"
              strokeWidth={day === segment.day ? 11 : 8}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={day === segment.day ? 1 : 0.75}
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {routeSegments.map((segment, i) => {
            const active = day === segment.day;
            return (
              <path
                key={`line-${i}`}
                className="overview-line"
                d={segment.d}
                transform={segment.offsetY ? `translate(0 ${segment.offsetY})` : undefined}
                fill="none"
                stroke={dayColors[segment.day]}
                strokeWidth={active ? 5.4 : 3.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={active ? 1 : 0.42}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </g>

        {/* 只在選到當天時顯示行進方向，避免三天的箭頭疊在一起 */}
        {routeArrows
          .filter(arrow => arrow.day === day)
          .map((arrow, i) => (
            <g
              key={`arrow-${i}`}
              transform={`translate(${arrow.x * X_SCALE} ${arrow.y}) rotate(${compressAngle(arrow.angle)})`}
            >
              <path
                d="M -4.2 -5 L 6 0 L -4.2 5 L -2.4 0 Z"
                fill={dayColors[arrow.day]}
                stroke="#fffdf7"
                strokeWidth={1.3}
                strokeLinejoin="round"
              />
            </g>
          ))}

        {routeNodes.map(node => {
          const active = node.days.includes(day);
          return (
            <g
              key={node.id}
              className={`overview-node ${active ? "is-active" : "is-muted"}`}
              transform={`translate(${node.x * X_SCALE} ${node.y})`}
            >
              <Landmark kind={node.icon} />
              <text
                className="overview-label"
                x={node.label.dx}
                y={node.label.dy}
                textAnchor={node.label.anchor}
              >
                {node.place}
              </text>
              <text
                className="overview-meta"
                x={node.label.dx}
                y={node.label.dy + 13}
                textAnchor={node.label.anchor}
              >
                {node.meta}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
