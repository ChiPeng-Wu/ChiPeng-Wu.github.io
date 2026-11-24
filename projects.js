/* =========================================================
   作品資料 —— 只要改這個檔案就能更新網站內容
   ---------------------------------------------------------
   video   : 完整影片。可填 YouTube / Vimeo 網址，或本機檔案
             例如 "https://www.youtube.com/watch?v=xxxxxxxxxxx"
                  "https://vimeo.com/123456789"
                  "videos/samurai.mp4"
   thumb   : 封面圖片路徑，例如 "images/samurai.jpg"
             （留空會用 colors 漸層當佔位圖）
   preview : 滑鼠移上去時播放的短片（無聲、循環），例如 "videos/samurai-preview.mp4"
             （可留空）
   type    : "3D" 或 "2D" —— 決定作品出現在網站的「3D 作品」還是「2D 作品」區
   vertical: 直式影片（例如 Reels 1080x1920）請設為 true
   colors  : 沒有封面圖時的漸層顏色
   新增作品：複製一整段 { ... }, 貼在下面再修改內容即可
   ========================================================= */

window.SITE = {
  // Showreel 影片（同 video 格式）
  showreel: "videos/showreel.mp4",
};

window.PROJECTS = [
  {
    title: "The Protector",
    type: "3D",
    category: "3D 動畫",
    year: 2026,
    client: "團隊合作短片（5 分鐘）",
    role: "Shot Design · LookDev · Lighting · Layout · QC",
    description: "畢業製作。以日本浮世繪風格打造的武士動畫短片。在 USD 製作流程中與團隊協作，負責資產整合、場景組裝、燈光與品質控管。使用 Houdini、Nuke、Maya。",
    thumb: "",
    preview: "",
    video: "videos/the-protector.mp4",
    frameAt: 245, // 沒有封面圖時，用影片第幾秒的畫面當封面
    colors: ["#c8442f", "#1d2a44"],
  },

  {
    title: "日光",
    type: "3D",
    category: "3D 動畫",
    year: 2026,
    client: "燈光練習 · Maya",
    role: "燈光 · LookDev",
    description: "午後陽光從窗邊灑進書房，照亮桌上的復古電話。練習自然光、體積光與室內氛圍營造。",
    video: "videos/desk-by-the-window.mp4",
    frameAt: 1.9,
    colors: ["#e8c98a", "#2a1f16"],
  },
  {
    title: "Light Sketches",
    type: "3D",
    category: "3D 動畫",
    year: 2025,
    client: "課程作業 · MDN431",
    role: "燈光 · 渲染（Houdini Karma）",
    description: "昏暗室內中，一道光線落在椅子上的白色物件，隨著鏡頭緩慢移動。練習以單一光源塑造明暗、氛圍與視線焦點，使用 Houdini Karma 渲染。",
    video: "videos/light-sketches.mp4",
    frameAt: 5.6,
    colors: ["#c9a46a", "#121010"],
  },
  {
    title: "The House in the Forest",
    type: "3D",
    category: "3D 動畫",
    year: 2026,
    client: "燈光練習 · Maya",
    role: "燈光 · LookDev",
    description: "森林大樹下的小屋，陽光穿過枝葉灑落。練習戶外自然光與場景氛圍營造。",
    video: "videos/tree-and-house.mp4",
    frameAt: 1,
    colors: ["#9cbf5a", "#1d2414"],
  },

  // ---------- 2D 作品 ----------
  {
    title: "汽車短影音 Demo",
    type: "2D",
    category: "剪輯",
    year: 2026,
    client: "30 秒直式 Reels",
    role: "分鏡 · 剪輯 · 卡點節奏 · 調色 · 動態字卡 · 音效設計",
    description: "以汽車形象片為參考的 30 秒直式短影音，剪接點全部對齊音樂小節，搭配冷色電影感調色與逐字淡入的動態字卡。素材：Pexels；配樂：Pixabay「HorsePower」by Elijah_K。",
    video: "videos/car-reels.mp4",
    vertical: true,
    frameAt: 23,
    colors: ["#e8823a", "#14161a"],
  },
  {
    title: "埃及紀錄片",
    type: "2D",
    category: "2D 動畫",
    year: 2026,
    client: "After Effects 練習",
    role: "獨立製作",
    description: "以剪紙插畫風格呈現古埃及歷史的 2D 動畫片段，包含阿努比斯、金字塔、尼羅河與戰車等場景。",
    video: "videos/egypt-documentary.mp4",
    frameAt: 4.2,
    colors: ["#e0a040", "#3a1e0c"],
  },
  {
    title: "森林",
    type: "2D",
    category: "2D 動畫",
    year: 2026,
    client: "After Effects 練習",
    role: "獨立製作",
    description: "2D 插畫秋日森林中奔跑的女孩，以旋轉運鏡與多層視差營造空間感。",
    video: "videos/forest-camera.mp4",
    frameAt: 5.6,
    colors: ["#c8562f", "#1d2a1a"],
  },

  // ---------- 3D 作品 ----------
  {
    title: "寶石鑰匙",
    type: "3D",
    category: "3D 動畫",
    year: 2025,
    client: "課程作業 · MDDN451",
    role: "建模 · 燈光 · 材質",
    description: "鑲嵌綠寶石的金色鑰匙道具動畫，以 Houdini Procedural Texture 製作材質。",
    video: "videos/mddn451-3c-animation.mp4",
    frameAt: 6,
    colors: ["#3fa86b", "#1a1408"],
  },
  {
    title: "盔甲",
    type: "3D",
    category: "3D 動畫",
    year: 2025,
    client: "課程作業 · MDDN",
    role: "建模 · 燈光 · 材質",
    description: "黑底金紋的盔甲，以 Houdini Procedural Modeling 建模。",
    video: "videos/mddn-2c.mp4",
    frameAt: 6.3,
    colors: ["#b8913a", "#202226"],
  },
  {
    title: "Spirit Train",
    type: "3D",
    category: "3D 動畫",
    year: 2025,
    client: "課程作業 · MDDN451",
    role: "建模 · 骨架",
    description: "練習 Animation 的動畫。",
    thumb: "images/spirit-train.jpg",
    video: "videos/spirit-train.mp4",
    colors: ["#c9a05a", "#16130f"],
  },
  {
    title: "貨櫃場 CG 合成",
    type: "3D",
    category: "CG 合成",
    year: 2025,
    client: "課程作業 · MDDN451",
    role: "拍攝 · CG 後製",
    description: "將 CG 元素合成進戶外實拍畫面。",
    video: "videos/mddn451-3c-final.mp4",
    frameAt: 16.5,
    colors: ["#9aa3ad", "#1b1e22"],
  },
  {
    title: "室內燈光合成",
    type: "3D",
    category: "CG 合成",
    year: 2025,
    client: "課程作業 · MDDN421",
    role: "拍攝 · CG 後製",
    description: "室內實拍畫面的 CG 合成。",
    video: "videos/mddn421-4c.mp4",
    frameAt: 12,
    colors: ["#d9c9a0", "#24211c"],
  },
  {
    title: "餐桌 CG 合成",
    type: "3D",
    category: "CG 合成",
    year: 2025,
    client: "課程作業 · MDDN421",
    role: "拍攝 · CG 後製",
    description: "餐桌場景實拍畫面的 CG 合成。",
    video: "videos/mddn421-2c.mp4",
    frameAt: 8.6,
    colors: ["#c9b38a", "#2a241c"],
  },
];
