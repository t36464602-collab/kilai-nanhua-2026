import { useState } from "react";
import { Backpack, Check, Info } from "lucide-react";
import { PageHead } from "../components/Chrome";
import { gearGroups, totalGear } from "../lib/trip-data";
import { useGear } from "../lib/hooks";

export function GearPage() {
  const { checked, toggle } = useGear();
  const [expanded, setExpanded] = useState<string | null>(null);
  const percent = Math.round((checked.length / totalGear) * 100);

  return (
    <>
      <PageHead
        kicker="PACK SMART"
        title="裝備檢查表"
        intro="裝備依台灣 368 建議整理，點 ⓘ 看完整說明。勾選結果保留在這支手機，離線也能用；輕裝總重建議 8 kg 以下。"
      />

      <div className="gear-total">
        <span className="progress-icon">
          <Backpack size={18} />
        </span>
        <span className="progress-text">
          <strong>
            已完成 {checked.length} / {totalGear} 項
          </strong>
          <small>共 {gearGroups.length} 類</small>
        </span>
        <b className="progress-value">{percent}%</b>
        <span className="progress-bar">
          <i style={{ width: `${percent}%` }} />
        </span>
      </div>

      {gearGroups.map(group => {
        const done = group.items.filter(({ item }) => checked.includes(item)).length;
        const complete = done === group.items.length;
        return (
          <section className="gear-group" key={group.group}>
            <div className="gear-group-head">
              <div>
                <h2>{group.group}</h2>
                <small>{group.hint}</small>
              </div>
              <span className={`gear-count ${complete ? "is-complete" : ""}`}>
                {done}/{group.items.length}
              </span>
            </div>
            <ul className="check-list">
              {group.items.map(({ item, brief, detail }) => {
                const isChecked = checked.includes(item);
                const isExpanded = expanded === item;
                return (
                  <li className={`check-item ${isChecked ? "is-checked" : ""}`} key={item}>
                    <div className="check-row">
                      <button
                        className="check-main"
                        role="checkbox"
                        aria-checked={isChecked}
                        onClick={() => toggle(item)}
                      >
                        <i className="check-box">{isChecked && <Check size={13} strokeWidth={3.2} />}</i>
                        <span>
                          <b>{item}</b>
                          <small>{brief}</small>
                        </span>
                      </button>
                      <button
                        className="check-info-btn"
                        aria-label={`${item} 完整說明`}
                        aria-expanded={isExpanded}
                        onClick={() => setExpanded(isExpanded ? null : item)}
                      >
                        <Info size={17} />
                      </button>
                    </div>
                    {isExpanded && <p className="check-detail">{detail}</p>}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </>
  );
}
