// 行程與裝備資料。
//
// 行程時間骨架依台灣 368「奇萊南華三天兩夜」行程排定（集合改為隊上決定的
// 07:00 台中高鐵站），沿途小路標（3K、5.5K 大崩壁、8K 木炭窯、10K 崩壁等）
// 依里程與台灣 368 的行走時距內插推估。時間為行前規劃值，實際以領隊宣布為準。
// 裝備敘述完整取自台灣 368 裝備說明（商家租借資訊不帶入），
// 非台灣 368 清單的安全項目（睡袋、哨子、離線地圖等）為自寫敘述。
// 參考資料連結見檔尾 references。

export const TRIP = {
  start: "2026-08-07T07:00:00+08:00",
  dateLabel: "2026 / 08 / 07 — 08 / 09",
  members: 11,
  nights: 2,
  version: "2026.07.18",
} as const;

export type TripPoint = {
  time: string;
  title: string;
  note: string;
  /**
   * 「本站 → 下一站」的估計路程與時間（legDuration 恆等於與下一站的時間差）。
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
    title: "台中高鐵 → 雲天宮 → 天池山莊",
    subtitle: "上山日",
    distance: "約 13 km",
    time: "行走約 6.5 小時",
    points: [
      { time: "07:00", title: "台中高鐵站集合", note: "包車前往雲天宮登山口，車程約 2.5 小時", legDistance: "車程", legDuration: "2.5 小時" },
      { time: "09:30", title: "雲天宮入口起登", note: "先至登山口服務站完成報到；前 3 km 陡升約 350 m", legDistance: "約 3.2 km", legDuration: "1.5 小時" },
      { time: "11:00", title: "3K 接回能高越嶺道", note: "陡升結束，接上古道緩上", legDistance: "約 1.7 km", legDuration: "1 小時" },
      { time: "12:00", title: "雲海保線所（5K）", note: "午餐自理，約 12:30 續行", legDistance: "約 0.5 km", legDuration: "1 小時" },
      { time: "13:00", title: "大崩壁（5.5K）", note: "依序快速通過，勿停留", legDistance: "約 2.5 km", legDuration: "1 小時 15 分" },
      { time: "14:15", title: "8K 木炭窯", note: "遺址短休；7K 里程點在本段中途", legDistance: "約 2 km", legDuration: "45 分" },
      { time: "15:00", title: "10K 崩壁", note: "官方公告崩塌點，停看聽確認後快速通過", legDistance: "約 3 km", legDuration: "1 小時" },
      { time: "16:00", title: "天池山莊（13K）", note: "領取帳篷、分配營位", legDistance: "營地內", legDuration: "1.5 小時" },
      { time: "17:30", title: "晚餐時間", note: "預計由天池山莊食堂供餐（訂購仍待最終確認）", legDistance: "營地內", legDuration: "3.5 小時" },
      { time: "21:00", title: "就寢", note: "頭燈與登頂包先備妥", legDistance: "—", legDuration: "—" },
    ],
  },
  {
    date: "8/8",
    weekday: "週六",
    title: "奇萊南峰・南華山・光被八表",
    subtitle: "登頂日",
    distance: "依現場調整",
    time: "行走約 7.5 小時",
    points: [
      { time: "02:00", title: "起床吃早餐", note: "早餐預計由山莊食堂供應（待確認）；頭燈與保暖確認", legDistance: "營地內", legDuration: "1 小時" },
      { time: "03:00", title: "出發往奇萊南峰", note: "輕裝、全隊依領隊指示前進；經天池岔路後稜線風大，注意保暖", legDistance: "約 4.5 km", legDuration: "2.5 小時" },
      { time: "05:30", title: "奇萊南峰（3,358 m）", note: "在山頂看日出；拍照後依天候決定停留時間", legDistance: "約 5 km", legDuration: "3 小時" },
      { time: "08:30", title: "南華山（3,184 m）", note: "黃金大草原；折返前再次清點人數", legDistance: "約 1.5 km", legDuration: "1 小時" },
      { time: "09:30", title: "光被八表碑", note: "能高越嶺道 15.5K，紀念台灣東西向輸電線工程", legDistance: "約 2.5 km", legDuration: "1 小時" },
      { time: "10:30", title: "返回天池山莊", note: "午餐自理、補眠休息", legDistance: "營地內", legDuration: "3.5 小時" },
      { time: "14:00", title: "能高瀑布（選擇性）", note: "視體力與天候決定參加，自天池山莊往返，由領隊帶隊", legDistance: "山莊往返", legDuration: "3.5 小時" },
      { time: "17:30", title: "晚餐", note: "隔日下山行李預先收整（供餐待確認）", legDistance: "—", legDuration: "—" },
    ],
  },
  {
    date: "8/9",
    weekday: "週日",
    title: "天池山莊 → 雲天宮 → 台中高鐵",
    subtitle: "下山日",
    distance: "約 13 km",
    time: "行走約 6 小時",
    points: [
      { time: "06:00", title: "起床早餐・營地撤收", note: "帳篷與營地復原、垃圾與人數清點（早餐供應待確認）", legDistance: "營地內", legDuration: "1 小時" },
      { time: "07:00", title: "出發下山", note: "下坡濕滑，放慢速度", legDistance: "約 3 km", legDuration: "2 小時" },
      { time: "09:00", title: "10K 崩壁", note: "停看聽確認後快速通過", legDistance: "約 4.5 km", legDuration: "1.5 小時" },
      { time: "10:30", title: "大崩壁（5.5K）", note: "依序通過", legDistance: "約 0.5 km", legDuration: "30 分" },
      { time: "11:00", title: "雲海保線所（5K）", note: "午餐自理，約 11:30 續行", legDistance: "約 1.7 km", legDuration: "1 小時" },
      { time: "12:00", title: "3K 雲天宮岔路", note: "轉入雲天宮線陡下段，注意腳步", legDistance: "約 3.2 km", legDuration: "1 小時" },
      { time: "13:00", title: "雲天宮登山口", note: "全員清點後搭包車返程", legDistance: "車程", legDuration: "3 小時" },
      { time: "16:00", title: "台中高鐵站", note: "賦歸，解散後各自返程", legDistance: "—", legDuration: "—" },
    ],
  },
];

/** GPX 地圖上要標出的地點（依日期；index 3 為全程模式用的聯集） */
export const dayPlaces = [
  ["雲天宮登山口", "雲海保線所", "天池山莊"],
  ["天池山莊", "奇萊南峰", "南華山"],
  ["天池山莊", "雲海保線所", "雲天宮登山口"],
];

/** 全程模式（行程頁單一地圖）要標出的地點 */
export const allPlaces = ["雲天宮登山口", "雲海保線所", "天池山莊", "奇萊南峰", "南華山"];

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

export type Reference = { label: string; note: string; url: string };

/** 行程與裝備的參考資料，顯示於行程頁 */
export const references: Reference[] = [
  {
    label: "台灣 368「奇萊南華三天兩夜」",
    note: "行程時間與裝備說明的主要參考",
    url: "https://www.taiwan368368.com.tw/item/4206697733d552e93",
  },
  {
    label: "健行筆記・奇萊南華實走 GPX",
    note: "2026/05/01 雲天宮線實走軌跡與時距",
    url: "https://hiking.biji.co/index.php?act=gpx_detail&id=5552331&q=trail",
  },
  {
    label: "林業保育署南投分署・雲天宮線開放公告",
    note: "登山口改線說明與 0-1K／3.2-4K／6K／10K 崩塌點",
    url: "https://nantou.forest.gov.tw/news/0077654",
  },
  {
    label: "天池山莊官網",
    note: "住宿、餐飲與臨時公告",
    url: "https://tconline.forest.gov.tw/",
  },
  {
    label: "林業保育署南投分署・雲天宮入口路線 GPX",
    note: "入口路線核對",
    url: "https://tconline.forest.gov.tw/ifa/?parent_id=252",
  },
];

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
    body: "天池山莊食堂試營運至 7/31，8 月是否續營未公告；請勿視為已完成訂購。",
  },
  {
    level: "warn",
    tag: "路線",
    title: "走雲天宮線，前段陡升",
    body: "前 3 km 陡升約 350 m 後接回古道；通訊可能不穩，請事先下載離線手冊與地圖。",
  },
  {
    level: "info",
    tag: "營地",
    title: "11 人、每晚 4 個小營地",
    body: "8/7、8/8 均已中籤；預估兩晚營地費合計 NT$4,800。",
  },
];

export type GearItem = {
  item: string;
  /** 列表上顯示的一句關鍵提示 */
  brief: string;
  /** 展開後的完整敘述（主要取自台灣 368 裝備說明） */
  detail: string;
};

export type GearGroup = {
  group: string;
  hint: string;
  items: GearItem[];
};

export const gearGroups: GearGroup[] = [
  {
    group: "登山裝備類",
    hint: "背負系統與過夜核心；輕裝總重建議控制在 8 kg 以下",
    items: [
      {
        item: "登山大背包（45-60 L）",
        brief: "要有背負系統與腰帶",
        detail:
          "一般的後背包都是靠肩膀來支撐背包的重量；登山用後背包有背負系統與腰帶，會幫你把重量分散到腰和身體上、降低肩膀的受力，讓你在長時間負重下更舒適。",
      },
      {
        item: "背包防雨套",
        brief: "內層再套大塑膠袋才是真防水",
        detail:
          "不論有無下雨，登山背包都需要做好防水層。千萬不要認為有了背包防雨套就等於防水——它並沒有包住全部背包！整裝之前，先在空的登山背包裡套上一層大塑膠袋後再開始塞裝備，像套垃圾桶的垃圾袋一樣，才能達到更完善的防水功用。",
      },
      {
        item: "登頂包（15-20 L）",
        brief: "第二天輕裝上山用",
        detail: "第二天輕裝往奇萊南峰、南華山時使用，可裝保暖衣物、頭燈、求生毯、兩截式雨衣、行動糧和飲用水等。",
      },
      {
        item: "登山杖",
        brief: "減輕約 30% 負擔、保護膝蓋",
        detail:
          "登山杖有行進間平衡重心、並有效減輕身體約 30% 負擔的功用，尤其在陡上、陡下的地形可以更妥善地保護你的膝蓋。",
      },
      {
        item: "頭燈（120 流明以上）",
        brief: "務必要帶，不可用手電筒代替",
        detail:
          "頭燈請務必要帶！並不是帶支手電筒就好——晚餐時間很難一邊用手電筒照明、一邊使用筷子湯匙吃飯；第二天凌晨自天池山莊摸黑起登，沒有頭燈非常危險。",
      },
      {
        item: "備用電池",
        brief: "確保頭燈全程有電",
        detail: "凌晨登頂與兩晚營地照明都靠頭燈，請攜帶足夠的備用電池，確保全程有電。",
      },
      {
        item: "睡袋",
        brief: "山莊租借仍待確認，先列自備",
        detail:
          "高山夜間低溫，睡袋須符合預估低溫。帳篷與睡袋是否可向天池山莊租借仍待供應商最終確認，確認前請先當作需要自備。",
      },
      {
        item: "睡墊",
        brief: "沒睡墊再暖的睡袋都會冷",
        detail:
          "登山睡墊的主要功用在於隔絕地板的寒氣，如果不使用睡墊，睡袋再暖都可能會冷。切勿拿瑜珈墊、野餐墊等來充當登山睡墊——那不是為了睡舒服用的，別認為自己能睡硬床就不需要睡墊。",
      },
    ],
  },
  {
    group: "衣物類",
    hint: "洋蔥式穿法，避免純棉",
    items: [
      {
        item: "排汗短袖（底層）",
        brief: "避免純棉",
        detail: "請盡量避免穿著吸水力強且不易乾的純棉材質衣物，汗濕不乾容易失溫。",
      },
      {
        item: "保暖中層",
        brief: "羽絨行進間勿穿",
        detail:
          "羽絨衣比刷毛和化纖外套更保暖，但非常怕水（包含汗水和空氣中的霧氣）。如有攜帶羽絨衣，切勿於行走時穿著，請待抵達營地後再穿上。",
      },
      {
        item: "防水防風外套",
        brief: "防潑水不等於防水",
        detail: "標示防潑水或防水（Gore-tex）的外套通常不完全防水，請多準備一套兩截式雨衣以備不時之需。",
      },
      {
        item: "登山褲",
        brief: "耐磨長褲，禁牛仔褲",
        detail: "請準備耐磨的材質，並儘量選用長褲以避免刮傷；牛仔褲與厚棉褲類型吸水難乾，請勿穿著。",
      },
      {
        item: "高筒登山鞋",
        brief: "出發前幾天先穿讓腳適應",
        detail:
          "出發前幾天建議時常穿著該鞋，讓自己的腳提前適應；盡可能以高筒登山鞋搭配厚長登山襪，才能達到保護腳踝與保暖的效果。",
      },
      {
        item: "羊毛登山襪（2 雙）",
        brief: "抑菌抗臭",
        detail:
          "建議選用羊毛襪為主。羊毛纖維富含角蛋白、能有效抑制細菌滋生達到抗臭效果，長天數行程也不容易有異味。",
      },
      {
        item: "遮陽帽",
        brief: "高山紫外線強",
        detail: "山上紫外線很強烈，時常有人被曬傷，白天行進請確實遮陽。",
      },
      {
        item: "毛帽",
        brief: "夜間與日出頭部保暖",
        detail: "在高山時的頭部保暖佔了很重要的角色，凌晨登頂與夜間營地活動必備。",
      },
      {
        item: "頭巾",
        brief: "吸汗透氣，可當圍脖",
        detail:
          "白天使用可吸取大量頭部汗水，比帽子更吸濕排汗、透氣快乾；晚上行走時毛帽太熱也可替代做頭部保暖，多帶一條還可當圍脖使用。",
      },
      {
        item: "保暖手套",
        brief: "夜間行走及日出必備",
        detail: "夜間行走及日出時同樣需要做好手部保暖，才不會覺得寒冷。",
      },
      {
        item: "備用衣物",
        brief: "穿一備一就好",
        detail:
          "登山通常以「穿一備一」的形式出發，可以的話一套穿到底，請勿天天換新增加不必要的重量；除非濕到可能導致失溫，才換上備用衣物。",
      },
      {
        item: "兩截式雨衣",
        brief: "不可用輕便雨衣",
        detail:
          "請務必攜帶雨衣，且必須為兩件式雨衣，不可使用輕便雨衣，亦不建議斗篷式雨衣；最簡單的方式是買機車用的兩件式雨衣，機車部品行即可購得。",
      },
    ],
  },
  {
    group: "其他個人用品",
    hint: "證件、飲食與救命小物",
    items: [
      {
        item: "飲用水 1,000 cc 以上＋保溫瓶",
        brief: "山屋熱水僅供飲用",
        detail:
          "建議攜帶水量最少 1,000 cc（依個人習慣斟酌）。山屋及營地大多僅提供熱水，除了水袋務必攜帶保溫瓶或耐高溫可密封的容器盛裝熱水以便隔日使用。特別注意：山屋的熱水僅供飲用，不可洗碗及刷牙洗臉。",
      },
      {
        item: "環保碗筷",
        brief: "碗建議大一點",
        detail: "建議攜帶容量大一點的碗，才不會沒吃到飯就被搶光了，但也請適量盛裝。",
      },
      {
        item: "個人藥品",
        brief: "領隊依法不可提供藥物",
        detail: "按照藥事法規定，領隊不可提供藥物，請自行妥善準備個人藥品（自身病史、過敏與日常用藥）。",
      },
      {
        item: "身分證＋健保卡",
        brief: "入園查驗與就醫",
        detail: "請務必攜帶可證明個人身份的證件，以便核對入山人員身份；健保卡供緊急就醫使用。",
      },
      {
        item: "入園核准資料",
        brief: "查驗時出示",
        detail: "入園與入山核准資料請隨身攜帶，供管制站或查驗時出示。",
      },
      {
        item: "行動電源",
        brief: "山上不能充電",
        detail: "山上不能充電，離線地圖與 GPX 也很重要，當迷路的時候會很需要手機電源！",
      },
      {
        item: "個人盥洗用品",
        brief: "山上不可用清潔劑",
        detail:
          "山上不可使用人工清潔劑如洗面乳、牙膏、洗碗精等；刷牙以乾刷或使用粗鹽為主，難得有機會就好好體驗當個野孩子吧。",
      },
      {
        item: "衛生紙與個人衛生用品",
        brief: "備而不用",
        detail:
          "上山上廁所時的必備品；女性生理用品請記得備而不用。用過的衛生紙、濕紙巾請自行帶下山，勿棄置山林。",
      },
      {
        item: "個人午餐（3 日）",
        brief: "三天午餐皆自理",
        detail: "三日行程的午餐皆自理，建議以麵包、三明治或飯糰為選擇。",
      },
      {
        item: "行動糧",
        brief: "高熱量為主",
        detail: "建議以巧克力、餅乾、堅果、肉乾、粗鹽等高熱量食品為主，行進間快速補充熱量與鹽分。",
      },
      {
        item: "拖鞋",
        brief: "營地放鬆用",
        detail: "走了一整天，抵達山莊營地後換上拖鞋，好好放鬆你的腳吧！",
      },
      {
        item: "垃圾袋",
        brief: "垃圾全部帶下山",
        detail:
          "請務必自備垃圾袋，將用過的衛生紙、濕紙巾自行帶走，切勿棄置山林破壞生態。行有餘力，也可在下山途中隨手撿起路上所見的其他垃圾。",
      },
      {
        item: "求生毯",
        brief: "失溫時保命",
        detail: "通常是鋁箔加工材質，可有效反射熱能、包覆全身達到快速保溫的效果，失溫或等待救援時使用。",
      },
      {
        item: "哨子",
        brief: "緊急求救",
        detail: "迷途或緊急狀況時發出求救訊號，比喊叫省力且傳得遠。",
      },
      {
        item: "離線地圖",
        brief: "出發前先下載",
        detail: "出發前先下載離線地圖與 GPX 軌跡，無訊號時仍可確認位置與路線；本手冊的地圖開啟過即可離線查看軌跡。",
      },
      {
        item: "緊急聯絡資料",
        brief: "手機沒電也拿得到",
        detail: "將緊急聯絡人與留守人資訊抄寫一份隨身攜帶，手機無法操作時仍可取得聯絡方式。",
      },
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
    body: "預計向天池山莊食堂訂購 11 人、兩晚餐食；食堂試營運至 7/31，8 月是否續營待確認。",
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
