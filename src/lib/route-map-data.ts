// 三日路線總覽圖的骨架資料。
//
// 路徑相對位置依使用者提供的參考圖（800_ab754b5b5159c54261fcc9bf13312b9a.jpg）逐段量測後重繪，
// viewBox 與參考圖同為 800 × 400。與參考圖的唯一差異：起點由屯原登山口改為本次實走的雲天宮線，
// 因此左段畫成雲天宮登山口向上的之字陡升，於 3K 接回能高越嶺道；參考圖的浮水印與品牌一律不重製。
//
// 這是示意圖，不是導航比例尺。

export type LandmarkIcon =
  | "trailhead"
  | "junction"
  | "hut"
  | "lodge"
  | "cliff"
  | "milestone"
  | "kiln"
  | "lake"
  | "peak"
  | "monument";

export type RouteNode = {
  id: string;
  place: string;
  meta: string;
  icon: LandmarkIcon;
  /** 圖上座標（viewBox 800 × 400） */
  x: number;
  y: number;
  /** 標籤相對節點的位移與對齊 */
  label: { dx: number; dy: number; anchor: "start" | "middle" | "end" };
  /** 這個點屬於哪幾天（0-based） */
  days: number[];
};

export const routeNodes: RouteNode[] = [
  {
    id: "start", place: "雲天宮登山口", meta: "本次起點", icon: "trailhead",
    x: 44, y: 292, label: { dx: 0, dy: 30, anchor: "middle" }, days: [0, 2],
  },
  {
    id: "join", place: "3K 接回古道", meta: "陡升約 350 m", icon: "junction",
    x: 184, y: 128, label: { dx: 0, dy: -30, anchor: "middle" }, days: [0, 2],
  },
  {
    id: "yunhai", place: "雲海保線所", meta: "約 2,360 m", icon: "hut",
    x: 243, y: 178, label: { dx: -2, dy: 32, anchor: "middle" }, days: [0, 2],
  },
  {
    // 橫向壓縮後這一段站點很密，標籤改放正上方才不會和 7K 疊在一起
    id: "cliff", place: "崩塌路段", meta: "依序通過", icon: "cliff",
    x: 318, y: 106, label: { dx: 0, dy: -26, anchor: "middle" }, days: [0, 2],
  },
  {
    id: "k7", place: "7K", meta: "里程點", icon: "milestone",
    x: 371, y: 172, label: { dx: -14, dy: 4, anchor: "end" }, days: [0, 2],
  },
  {
    id: "charcoal", place: "8K 木炭窯", meta: "遺址", icon: "kiln",
    x: 418, y: 201, label: { dx: 6, dy: 30, anchor: "start" }, days: [0, 2],
  },
  {
    id: "k10", place: "10K", meta: "里程點", icon: "milestone",
    x: 502, y: 146, label: { dx: -13, dy: -14, anchor: "end" }, days: [0, 2],
  },
  {
    id: "lodge", place: "天池山莊", meta: "約 2,860 m", icon: "lodge",
    x: 650, y: 191, label: { dx: -20, dy: 24, anchor: "end" }, days: [0, 1, 2],
  },
  {
    id: "fork", place: "天池岔路", meta: "約 3,100 m", icon: "lake",
    x: 688, y: 140, label: { dx: 20, dy: -2, anchor: "start" }, days: [1],
  },
  {
    id: "south", place: "奇萊南峰", meta: "3,358 m", icon: "peak",
    x: 650, y: 32, label: { dx: -20, dy: 6, anchor: "end" }, days: [1],
  },
  {
    id: "nanhua", place: "南華山", meta: "3,184 m", icon: "peak",
    x: 716, y: 258, label: { dx: 22, dy: 4, anchor: "start" }, days: [1],
  },
  {
    id: "monument", place: "光被八表", meta: "約 2,798 m", icon: "monument",
    x: 658, y: 360, label: { dx: -18, dy: 0, anchor: "end" }, days: [1],
  },
];

/** 雲天宮登山口 → 3K 接回古道：之字陡升 */
const CLIMB =
  "M 44 292 C 60 288 74 282 82 270 C 90 258 76 250 66 242 C 54 233 58 222 72 216 " +
  "C 88 209 96 200 92 190 C 88 179 96 170 110 166 C 126 161 134 152 132 143 " +
  "C 130 133 142 126 158 125 C 170 124 178 126 184 128";

/** 3K → 雲海保線所 → 崩塌路段 → 7K → 8K → 10K → 天池山莊：能高越嶺道主線 */
const TRAIL =
  "M 184 128 C 192 140 196 152 204 160 C 214 170 228 174 243 178 " +
  "C 256 180 264 176 270 168 C 278 156 282 138 291 122 C 297 112 306 107 318 106 " +
  "C 328 106 336 112 344 124 C 352 136 360 152 366 164 C 368 168 370 170 371 172 " +
  "C 376 182 384 194 394 201 C 402 207 412 206 418 201 " +
  "C 424 190 430 176 440 168 C 448 162 458 166 466 174 C 472 179 480 175 486 164 " +
  "C 492 154 496 148 502 146 " +
  "C 510 146 517 160 521 178 C 525 196 530 206 540 216 C 550 224 563 229 577 227 " +
  "C 592 225 605 216 619 199 C 628 188 637 180 650 191";

/*
 * 登頂日環線：五段都用單一大弧線，整體讀起來是一顆飽滿的水滴形——
 * 山莊順接上岔路，向左上大弧至奇萊南峰（原路折返），向右下鼓出經南華山、
 * 光被八表，再沿左側近垂直回收到山莊。控制點刻意向外撐，補償 X_SCALE 壓縮。
 */

/** 天池山莊 → 天池岔路 */
const TO_FORK = "M 650 191 C 662 174 675 158 688 140";

/** 天池岔路 → 奇萊南峰 */
const TO_SOUTH = "M 688 140 C 698 102 682 60 650 32";

/** 天池岔路 → 南華山 */
const TO_NANHUA = "M 688 140 C 710 172 722 214 716 258";

/** 南華山 → 光被八表 */
const TO_MONUMENT = "M 716 258 C 710 298 686 334 658 360";

/** 光被八表 → 天池山莊 */
const BACK_TO_LODGE = "M 658 360 C 641 312 640 242 650 191";

/**
 * 橫向壓縮倍率：參考圖是 2:1 的寬扁比例，直接照搬在手機上要滑很久。
 * 這裡只壓縮「座標與路徑」，landmark icon 與文字不套用，才不會被壓扁。
 * 節點放在 x * X_SCALE，路徑則整組套 scale(X_SCALE, 1) 並用 non-scaling-stroke 維持線寬一致。
 */
export const X_SCALE = 0.72;
export const VIEW_WIDTH = 800 * X_SCALE;
export const VIEW_HEIGHT = 400;

export type RouteSegment = { d: string; day: number; offsetY?: number };

/**
 * Day 1 與 Day 3 走同一條廊道，因此共用同一段 path；
 * Day 3 整體向下平移，讓共同路段仍然一眼看得出是兩條線。
 */
export const routeSegments: RouteSegment[] = [
  { d: CLIMB, day: 0 },
  { d: TRAIL, day: 0 },
  { d: TO_FORK, day: 1 },
  { d: TO_SOUTH, day: 1 },
  { d: TO_NANHUA, day: 1 },
  { d: TO_MONUMENT, day: 1 },
  { d: BACK_TO_LODGE, day: 1 },
  { d: CLIMB, day: 2, offsetY: 4.5 },
  { d: TRAIL, day: 2, offsetY: 4.5 },
];

/**
 * Day 2 的行進方向箭頭。
 *
 * 座標與角度都用「未壓縮」的原始空間表示，交給元件換算成壓縮後的角度，
 * 這樣調整 X_SCALE 時不必重算。角度 0 為指向右方，順時鐘為正。
 *
 * 依行程順序：天池山莊 → 天池岔路 → 奇萊南峰（原路折返）→ 天池岔路 →
 * 南華山 → 光被八表 → 天池山莊。
 */
export type RouteArrow = { x: number; y: number; angle: number; day: number };

export const routeArrows: RouteArrow[] = [
  { x: 669, y: 165, angle: -52, day: 1 }, // 天池山莊 → 天池岔路
  { x: 684, y: 84, angle: -123, day: 1 }, // 天池岔路 → 奇萊南峰
  { x: 712, y: 200, angle: 81, day: 1 }, // 天池岔路 → 南華山
  { x: 694, y: 314, angle: 125, day: 1 }, // 南華山 → 光被八表
  { x: 643, y: 276, angle: -88, day: 1 }, // 光被八表 → 天池山莊
];

export const dayColors = ["#1687d5", "#249b58", "#ef8a2f"];

export const dayLegend = [
  { label: "DAY 1", note: "上山" },
  { label: "DAY 2", note: "登頂" },
  { label: "DAY 3", note: "下山" },
];
