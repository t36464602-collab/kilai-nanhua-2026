import { Navigate, useParams } from "react-router-dom";
import { PageHead } from "../components/Chrome";

export function TripDayPage() {
  const { day } = useParams();
  const index = Number(day) - 1;
  if (!Number.isInteger(index) || index < 0 || index > 2) return <Navigate to="/trip" replace />;
  return <PageHead kicker="COMING SOON" title={`DAY ${index + 1}`} intro="內容搬遷中，部署管線驗證用佔位頁。" />;
}
