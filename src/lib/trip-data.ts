// 行程規劃值（時間、距離、費用）為行前規劃資料，UI 工作不得改寫。
// 來源：2026奇萊南華行前資料.md、2024 屏東旋風青年登山隊奇萊南華行前須知.pdf

export const TRIP = {
  start: "2026-08-07T06:00:00+08:00",
  dateLabel: "2026 / 08 / 07 — 08 / 09",
  members: 11,
  nights: 2,
  version: "2026.07.17",
} as const;

export type TripPoint = {
  time: string;
  title: string;
  note: string;
  /**
   * 「本站 → 下一站」的估計路程與時間，不是「前一站 → 本站」。
   *
   * 這組值原本就是照這個語意寫的：每一站的 legDuration 都等於它到下一站的時間差
   * （例如 Day 1 的 06:30 準時出發標 2.5 小時，06:30 → 09:00 剛好 2.5 小時），
   * 且每日各段距離相加等於當日總長。舊版 UI 卻標成「前一站 → 本站」而顯示錯位，已修正。
   */
  legDistance: string;
  legDuration: string;
};

export type TripDay = {
  date: string;
  weekday: string;
  title: string;
  subtitle: string;
  distance: string;
  time: string;
  points: TripPoint[];
};

export const tripDays: TripDay[] = [
  {
    date: "8/7",
    weekday: "週五",
    title: "雲天宮 → 天池山莊",
    subtitle: "上山日",
    distance: "約 13 km",
    time: "約 10 小時",
    points: [
      // 原本 09:00 有一站「台上地區」，經與 2024 行前須知比對應為「尾上山」之誤植，
      // 而尾上山屬於步道封閉期間的高繞路線，2026 整建後的雲天宮線不經過，故整站移除。
      // 移除後把原本 06:30（約 3 km／2.5 小時）與 09:00（約 4.5 km／2 小時）兩段合併為
      // 約 7.5 km／4.5 小時，總長仍為約 13 km，未新增任何未經確認的數字。
      { time: "06:00", title: "雲天宮集合", note: "報到、裝備與人員確認；須先至登山口服務站報到", legDistance: "集合點", legDuration: "30 分" },
      { time: "06:30", title: "準時出發", note: "前 3 km 陡升約 350 m，於 3K 接回能高越嶺道", legDistance: "約 7.5 km", legDuration: "4.5 小時" },
      { time: "11:00", title: "雲海保線所（5K）", note: "預計 11:30 午餐", legDistance: "約 5.5 km", legDuration: "5.5 小時" },
      { time: "16:30", title: "抵達天池營地（13K）", note: "領取帳篷、分配營位", legDistance: "營地內", legDuration: "1 小時" },
      { time: "17:30", title: "晚餐", note: "天池廚房（待最終確認）", legDistance: "營地內", legDuration: "3.5 小時" },
      { time: "21:00", title: "就寢", note: "頭燈與攻頂包先備妥", legDistance: "—", legDuration: "—" },
    ],
  },
  {
    date: "8/8",
    weekday: "週六",
    title: "奇萊南峰・南華山",
    subtitle: "登頂日",
    distance: "依現場調整",
    time: "約 9 小時",
    points: [
      // 10:00「光被八表」依 2024 行前須知（09:00-10:00 光被八表碑、10:00-12:00 返回天池山莊）補上。
      // 原本 09:00 南華山標的「約 5.5 km／3 小時」是南華山直接返回營地的合計值；
      // 補入光被八表後時間依 2024 版拆成 1 小時＋2 小時（合計仍為 3 小時），
      // 但這兩段各自的距離沒有可靠來源（2026/05/01 實走 GPX 沒有繞經光被八表），故標為待確認。
      { time: "02:00", title: "起床整裝", note: "早餐、飲水與頭燈確認", legDistance: "營地內", legDuration: "1.5 小時" },
      { time: "03:30", title: "輕裝出發", note: "先往天池岔路口，全隊依領隊指示前進", legDistance: "約 4.5 km", legDuration: "2.5 小時" },
      { time: "06:00", title: "奇萊南峰", note: "2024 行前須知記錄日出 05:26；拍照後依天候決定停留時間", legDistance: "約 3.5 km", legDuration: "2 小時" },
      { time: "08:00", title: "天池岔路", note: "稜線風大，注意保暖", legDistance: "約 1.5 km", legDuration: "1 小時" },
      { time: "09:00", title: "南華山", note: "折返前再次清點人數", legDistance: "待確認", legDuration: "1 小時" },
      { time: "10:00", title: "光被八表", note: "依 2024 行前須知安排；碑體位於能高越嶺道 15.5K", legDistance: "待確認", legDuration: "2 小時" },
      // 14:00 能高瀑布為選擇性行程，依台灣 368 三天兩夜行程加入；
      // 原 12:00 → 17:00 的 5 小時拆成 2 小時（午休）＋ 3 小時（瀑布往返），合計不變。
      { time: "12:00", title: "返回天池營地", note: "午餐、休息與裝備整理", legDistance: "營地內", legDuration: "2 小時" },
      { time: "14:00", title: "能高瀑布（選擇性）", note: "視體力與天候決定參加，自天池山莊往返，由領隊帶隊", legDistance: "山莊往返", legDuration: "3 小時" },
      { time: "17:00", title: "晚餐", note: "隔日下山行李預先收整", legDistance: "—", legDuration: "—" },
    ],
  },
  {
    date: "8/9",
    weekday: "週日",
    title: "天池山莊 → 雲天宮",
    subtitle: "下山日",
    distance: "約 13 km",
    time: "約 6.5 小時",
    points: [
      { time: "05:30", title: "起床早餐", note: "帳篷與營地復原", legDistance: "營地內", legDuration: "2 小時" },
      { time: "07:30", title: "營地總檢", note: "垃圾、裝備、人數確認", legDistance: "營地內", legDuration: "30 分" },
      { time: "08:00", title: "出發下山", note: "慢行通過崩塌地形", legDistance: "約 5.5 km", legDuration: "2.5 小時" },
      { time: "10:30", title: "雲海保線所（5K）", note: "預計 11:30 午餐", legDistance: "約 7.5 km", legDuration: "4 小時" },
      { time: "14:30", title: "抵達雲天宮", note: "全員清點後解散", legDistance: "—", legDuration: "—" },
    ],
  },
];

/** GPX 地圖上要標出的地點（依日期） */
export const dayPlaces = [
  ["雲天宮登山口", "雲海保線所", "天池山莊"],
  ["天池山莊", "奇萊南峰", "南華山"],
  ["天池山莊", "雲海保線所", "雲天宮登山口"],
];

/**
 * 每段「前一站 → 本站」的 GPX 實走里程與時間。
 * 目前的 UI 沒有顯示這組數字（舊版 page.tsx 也只是宣告未使用），先原樣保留，
 * 之後若要在路線圖上標分段數據可直接取用。
 */
export const illustratedLegs = [
  [
    { time: "06:30", place: "雲天宮登山口", leg: "出發" },
    { time: "09:25", place: "3K 接回古道", leg: "3.2 km・約 2 小時 55 分" },
    { time: "11:00", place: "雲海保線所", leg: "1.7 km・行走約 55 分" },
    { time: "16:30", place: "天池山莊", leg: "9.3 km・行走約 4 小時 20 分" },
  ],
  [
    { time: "03:30", place: "天池山莊", leg: "輕裝出發" },
    { time: "06:00", place: "奇萊南峰", leg: "3.1 km・行走約 2 小時 20 分" },
    { time: "08:00", place: "天池岔路", leg: "2.0 km・行走約 55 分＋停留" },
    { time: "09:00", place: "南華山", leg: "1.5 km・行走約 40 分" },
    { time: "12:00", place: "返回天池山莊", leg: "2.6 km・行走約 1 小時 10 分" },
  ],
  [
    { time: "08:00", place: "天池山莊", leg: "下山出發" },
    { time: "10:30", place: "雲海保線所", leg: "9.3 km・行走約 3 小時 20 分" },
    { time: "12:00", place: "3K 雲天宮岔路", leg: "1.7 km・行走約 45 分" },
    { time: "14:30", place: "雲天宮登山口", leg: "3.2 km・行走約 2 小時 30 分" },
  ],
];

export const gpxFacts = {
  // 檔名不含路徑：由 GpxMap 以 import.meta.env.BASE_URL 解析（GitHub Pages 子路徑）
  file: "kilai-nanhua-2026.gpx",
  distance: "36.04 km",
  ascent: "2,267.53 m",
  sourceLabel: "健行筆記・奇萊南華（雲天宮登山口），記錄日期 2026/05/01",
  sourceUrl: "https://hiking.biji.co/index.php?act=gpx_detail&id=5552331&q=trail",
  entryLabel: "林業保育署南投分署・雲天宮入口路線 GPX",
  entryUrl: "https://tconline.forest.gov.tw/ifa/?parent_id=252",
} as const;

export type Notice = {
  level: "urgent" | "warn" | "info";
  tag: string;
  title: string;
  body: string;
};

export const notices: Notice[] = [
  {
    level: "urgent",
    tag: "待確認",
    title: "餐食與帳篷仍待供應商最終確認",
    body: "天池廚房目前公開服務資訊尚未涵蓋本次日期，請勿視為已完成訂購。",
  },
  {
    level: "warn",
    tag: "路線",
    title: "改走雲天宮線",
    body: "前段約 3 km 陡升，通訊可能不穩；請事先下載離線手冊與地圖。",
  },
  {
    level: "info",
    tag: "營地",
    title: "11 人、每晚 4 個小營地",
    body: "8/7、8/8 均已中籤；預估兩晚營地費合計 NT$4,800。",
  },
];

export type GearGroup = {
  group: string;
  hint: string;
  items: { item: string; purpose: string }[];
};

// 裝備清單依台灣 368「奇萊南華三天兩夜」裝備說明重整為三大類，
// 並保留原清單的安全項目（哨子、急救毯、離線地圖、緊急聯絡資料、入園核准資料）。
// 帳篷、睡袋是否由天池山莊租借仍待確認，故睡袋、睡墊先列自備。
export const gearGroups: GearGroup[] = [
  {
    group: "登山裝備類",
    hint: "背負系統與過夜核心；輕裝總重建議控制在 8 kg 以下",
    items: [
      { item: "登山大背包（45-60 L）", purpose: "背負系統把重量分散到腰部；打包前先在包內套一層大塑膠袋才是真防水" },
      { item: "背包防雨套", purpose: "防雨套沒有包住整個背包，內層塑膠袋不可省略" },
      { item: "攻頂包（15-20 L）", purpose: "第二天輕裝用：保暖衣物、頭燈、雨衣、行動糧與飲水" },
      { item: "登山杖", purpose: "可減輕約 30% 身體負擔，陡上陡下時保護膝蓋" },
      { item: "頭燈（120 流明以上）", purpose: "凌晨登頂與營地照明，不可用手電筒代替" },
      { item: "備用電池", purpose: "確保頭燈全程有電" },
      { item: "睡袋", purpose: "高山夜間保暖，須符合預估低溫（山莊租借仍待確認，先列自備）" },
      { item: "睡墊", purpose: "隔絕地面寒氣，營位必備；沒睡墊再暖的睡袋都會冷" },
    ],
  },
  {
    group: "衣物類",
    hint: "洋蔥式穿法，避免純棉",
    items: [
      { item: "排汗短袖（底層）", purpose: "避免純棉材質，汗濕不易乾容易失溫" },
      { item: "保暖中層", purpose: "刷毛／化纖／羽絨；羽絨怕水，行進間勿穿，抵達營地再穿上" },
      { item: "防水防風外套", purpose: "防潑水不等於防水，仍須另備雨衣" },
      { item: "登山褲", purpose: "耐磨長褲避免刮傷，禁牛仔褲與厚棉褲" },
      { item: "高筒登山鞋", purpose: "保護腳踝；出發前幾天先常穿讓腳適應" },
      { item: "羊毛登山襪（2 雙）", purpose: "羊毛纖維抑菌抗臭，長天數行程不易有異味" },
      { item: "遮陽帽", purpose: "高山紫外線強烈，時常有人曬傷" },
      { item: "毛帽", purpose: "高山頭部保暖非常關鍵，夜間與日出時使用" },
      { item: "頭巾", purpose: "白天吸汗透氣，夜間可替代毛帽、也可當圍脖" },
      { item: "保暖手套", purpose: "夜間行走及日出時的手部保暖" },
      { item: "備用衣物", purpose: "穿一備一即可，濕到可能失溫才更換，勿多帶增重" },
      { item: "兩截式雨衣", purpose: "必備；不可用輕便雨衣，不建議斗篷式" },
    ],
  },
  {
    group: "其他個人用品",
    hint: "證件、飲食與救命小物",
    items: [
      { item: "飲用水 1,000 cc 以上＋保溫瓶", purpose: "山屋熱水僅供飲用，不可洗碗刷牙；保溫瓶裝熱水隔日使用" },
      { item: "環保碗筷", purpose: "建議帶容量大一點的碗" },
      { item: "個人藥品", purpose: "藥事法規定領隊不可提供藥物，請務必自備" },
      { item: "身分證＋健保卡", purpose: "入園身分查驗與緊急就醫使用" },
      { item: "入園核准資料", purpose: "供管制或查驗時出示" },
      { item: "行動電源", purpose: "山上不能充電；離線地圖與 GPX 全靠手機" },
      { item: "個人盥洗用品", purpose: "山上不可使用清潔劑，刷牙以乾刷或粗鹽為主" },
      { item: "衛生紙與個人衛生用品", purpose: "備而不用，用過的自行帶下山" },
      { item: "個人午餐（3 日）", purpose: "三天午餐皆自理，建議麵包、三明治或飯糰" },
      { item: "行動糧", purpose: "巧克力、餅乾、堅果、肉乾等高熱量食品" },
      { item: "拖鞋", purpose: "抵達營地換上，讓走了一整天的腳放鬆" },
      { item: "垃圾袋", purpose: "垃圾全部帶下山，也可隔離濕衣物" },
      { item: "求生毯", purpose: "鋁箔材質反射熱能，失溫或等待救援時保命" },
      { item: "哨子", purpose: "迷途或緊急狀況發出求救訊號" },
      { item: "離線地圖", purpose: "出發前先下載，無訊號時確認位置與路線" },
      { item: "緊急聯絡資料", purpose: "手機無法操作時仍可取得聯絡方式" },
    ],
  },
];

export const totalGear = gearGroups.reduce((n, g) => n + g.items.length, 0);

export type InfoCard = {
  icon: "shield" | "team" | "tent" | "meal" | "checkin" | "bear" | "offline";
  title: string;
  body: string;
  status?: { label: string; tone: "ok" | "pending" };
};

export const infoCards: InfoCard[] = [
  {
    icon: "shield",
    title: "安全原則",
    body: "不脫隊、不超越領隊；身體不適立即回報。稜線風強或天候惡化時，依領隊指示撤退。",
  },
  {
    icon: "team",
    title: "隊伍資訊",
    body: "共 11 人。兩晚各 4 個小營地（3 × 3 m），入園與營位均已中籤。",
    status: { label: "已中籤", tone: "ok" },
  },
  {
    icon: "tent",
    title: "住宿安排",
    body: "帳篷預計向天池山莊租用；最終數量、領取方式與費用仍須確認。",
    status: { label: "待確認", tone: "pending" },
  },
  {
    icon: "meal",
    title: "餐食安排",
    body: "預計向天池廚房訂購 11 人、兩晚餐食；目前標記為「待供應商確認」。",
    status: { label: "待確認", tone: "pending" },
  },
  {
    icon: "checkin",
    title: "登山口報到",
    body: "全員須先至雲天宮登山口服務站完成報到（原屯原服務站已移設至此）；車輛請停放林業保育署設置之停車場。",
  },
  {
    icon: "bear",
    title: "台灣黑熊出沒",
    body: "仁愛鄉山區陸續有黑熊目擊紀錄。食物與廚餘妥善收納、落實無痕山林，可視需要配戴熊鈴，隨時提高警覺。",
  },
];
