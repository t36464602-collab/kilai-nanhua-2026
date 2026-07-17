import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { BottomNav, TopBar } from "./components/Chrome";
import { HomePage } from "./pages/HomePage";
import { TripPage } from "./pages/TripPage";
import { TripDayPage } from "./pages/TripDayPage";
import { GearPage } from "./pages/GearPage";
import { InfoPage } from "./pages/InfoPage";

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
          <Route path="/trip/:day" element={<TripDayPage />} />
          <Route path="/gear" element={<GearPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}
