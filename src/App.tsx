import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { BottomNav, TopBar } from "./components/Chrome";
import { HomePage } from "./pages/HomePage";
import { TripPage } from "./pages/TripPage";
import { GearPage } from "./pages/GearPage";
import { InfoPage } from "./pages/InfoPage";

/** 三日時間軸已內嵌在行程頁；舊的 /trip/:day 分享連結導回行程頁並捲到當日 */
function TripDayRedirect() {
  const { day } = useParams();
  const index = Number(day) - 1;
  const valid = Number.isInteger(index) && index >= 0 && index <= 2;
  return <Navigate to="/trip" replace state={valid ? { day: index } : undefined} />;
}

export default function App() {
  const location = useLocation();

  // 換頁等於換章節，捲動位置回到最上面
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <TopBar />
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trip" element={<TripPage />} />
          <Route path="/trip/:day" element={<TripDayRedirect />} />
          <Route path="/gear" element={<GearPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}
