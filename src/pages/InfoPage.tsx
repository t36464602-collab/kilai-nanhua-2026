import { ClipboardCheck, CloudOff, PawPrint, ShieldCheck, TentTree, UsersRound, Utensils, Wifi } from "lucide-react";
import { PageHead } from "../components/Chrome";
import { TRIP, infoCards } from "../lib/trip-data";
import { useOnline } from "../lib/hooks";

const INFO_ICON = {
  shield: ShieldCheck,
  team: UsersRound,
  tent: TentTree,
  meal: Utensils,
  checkin: ClipboardCheck,
  bear: PawPrint,
  offline: CloudOff,
};

export function InfoPage() {
  const online = useOnline();

  return (
    <>
      <PageHead
        kicker="FIELD INFORMATION"
        title="行前資訊"
        intro="把上山前與緊急時刻最需要的資訊集中在一起。"
      />

      <ul className="info-cards">
        {infoCards.map(card => {
          const Icon = INFO_ICON[card.icon];
          return (
            <li className="info-card" key={card.title}>
              <span className="info-icon">
                <Icon size={18} />
              </span>
              <div>
                <h2>
                  {card.title}
                  {card.status && <span className={`status-tag status-${card.status.tone}`}>{card.status.label}</span>}
                </h2>
                <p>{card.body}</p>
              </div>
            </li>
          );
        })}

        <li className={`info-card offline-card ${online ? "is-online" : "is-offline"}`}>
          <span className="info-icon">{online ? <Wifi size={18} /> : <CloudOff size={18} />}</span>
          <div>
            <h2>
              離線使用
              <span className={`status-tag ${online ? "status-ok" : "status-pending"}`}>
                {online ? "已連線" : "離線中"}
              </span>
            </h2>
            <p>
              {online
                ? "目前有網路。手冊內容與 GPX 軌跡已存進手機，離線可看；地形圖磚只保留滑過的區域，出發前請在 WiFi 下把三天地圖各滑一遍。"
                : "目前為離線狀態，已切換使用裝置內的手冊資料；GPX 紅線軌跡仍可查看。"}
            </p>
          </div>
        </li>
      </ul>

      <p className="source-note">
        版本：{TRIP.version} · 內容有更新時，重新開啟本手冊即自動套用新版；山上沒有訊號，出發後的臨時變更以領隊現場宣布為準。
        <br />
        本手冊由 2024 行前須知更新，行程與裝備參考台灣 368 三天兩夜行程整理。山區資訊可能臨時變動，出發前仍須由領隊複核。
      </p>
    </>
  );
}
