import { NavLink } from "react-router-dom";
import { Backpack, CalendarDays, Home, NotebookTabs } from "lucide-react";
import { BrandMark } from "./BrandMark";

export function TopBar() {
  return (
    <header className="topbar">
      <div className="brand">
        <BrandMark />
        <span className="brand-text">
          <strong>奇萊南華行動手冊</strong>
          <small>PTYMA · 2026</small>
        </span>
      </div>
    </header>
  );
}

const TABS = [
  { to: "/", label: "首頁", Icon: Home, end: true },
  { to: "/trip", label: "行程", Icon: CalendarDays, end: false },
  { to: "/gear", label: "裝備", Icon: Backpack, end: true },
  { to: "/info", label: "資訊", Icon: NotebookTabs, end: true },
];

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="主要導覽">
      {TABS.map(({ to, label, Icon, end }) => (
        <NavLink key={to} to={to} end={end} className={({ isActive }) => (isActive ? "is-active" : "")}>
          <Icon size={21} strokeWidth={1.9} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export function PageHead({ kicker, title, intro }: { kicker: string; title: string; intro: string }) {
  return (
    <div className="page-head">
      <span className="kicker">{kicker}</span>
      <h1>{title}</h1>
      <p>{intro}</p>
    </div>
  );
}
