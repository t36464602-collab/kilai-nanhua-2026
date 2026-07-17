/**
 * 暫用識別：隊徽尚未定案，這裡只用中性山形。
 * 未來換正式 Logo 時只需改這個檔案（把 <svg> 換成 <img src="logo.svg" alt="" />），
 * 外框尺寸與圓角由 CSS 的 .brand-mark 控制；app icon 則重跑舊專案 build/make-icons.mjs。
 */
export function BrandMark({ size = 38 }: { size?: number }) {
  return (
    <span className="brand-mark" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 32 32" width={size * 0.62} height={size * 0.62}>
        <path d="M3 25 L11.5 9 L16 17 L20.5 6 L29 25 Z" fill="currentColor" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
