(() => {
  const projects = window.PROJECTS || [];
  const site = window.SITE || {};
  const modal = document.getElementById("modal");
  const media = document.getElementById("modalMedia");

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Video helpers ---------- */
  function embedUrl(url) {
    let m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{11})/);
    if (m) return `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0`;
    // vimeo.com/123、vimeo.com/123/abcdef（私人連結）、vimeo.com/reviews/…/videos/123
    m = url.match(/vimeo\.com\/(?:.*\/)?(?:videos?\/)?(\d{6,})(?:\/([\da-f]{6,}))?/);
    if (m) {
      const h = m[2] || new URL(url).searchParams.get("h");
      return `https://player.vimeo.com/video/${m[1]}?autoplay=1${h ? `&h=${h}` : ""}`;
    }
    return null;
  }

  function renderMedia(url, colors) {
    media.innerHTML = "";
    if (!url) {
      const empty = document.createElement("div");
      empty.className = "media-empty";
      if (colors) empty.style.background = gradient(colors);
      empty.innerHTML = "<span>尚未設定影片<br><small>到 projects.js 填入 video 欄位</small></span>";
      media.appendChild(empty);
      return;
    }
    const embed = embedUrl(url);
    if (embed) {
      const iframe = document.createElement("iframe");
      iframe.src = embed;
      iframe.allow = "autoplay; fullscreen; picture-in-picture";
      iframe.allowFullscreen = true;
      media.appendChild(iframe);
    } else {
      const v = document.createElement("video");
      v.src = url;
      v.controls = true;
      v.autoplay = true;
      v.playsInline = true;
      media.appendChild(v);
    }
  }

  const gradient = (c) => `radial-gradient(120% 90% at 20% 15%, ${c[0]} 0%, transparent 55%), linear-gradient(135deg, ${c[1]}, #050505)`;

  /* ---------- Modal ---------- */
  let lastFocus = null;
  function openModal({ title, meta, desc, video, colors, vertical }) {
    media.classList.toggle("vertical", !!vertical);
    lastFocus = document.activeElement;
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalMeta").textContent = meta || "";
    document.getElementById("modalDesc").textContent = desc || "";
    const ext = document.getElementById("modalLink");
    ext.hidden = !(video && /^https?:/.test(video));
    if (!ext.hidden) ext.href = video;
    renderMedia(video, colors);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-close").focus();
  }
  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    media.innerHTML = ""; // 停止播放
    if (lastFocus) lastFocus.focus();
  }
  modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });

  document.getElementById("reelBtn").addEventListener("click", () =>
    openModal({ title: "Showreel", meta: `${new Date().getFullYear()} Reel`, desc: "精選作品片段合輯。", video: site.showreel, colors: ["#e8b45a", "#1a1208"] })
  );

  /* ---------- Work sections (3D / 2D) ---------- */
  document.querySelectorAll("section.work").forEach((section) => {
    const type = section.dataset.type;
    const grid = section.querySelector(".grid");
    const filtersEl = section.querySelector(".filters");
    const list = projects.filter((p) => (p.type || "3D") === type);

    if (!list.length) {
      const empty = document.createElement("p");
      empty.className = "grid-empty reveal";
      empty.textContent = `${type} 作品即將更新`;
      grid.appendChild(empty);
      filtersEl.remove();
      return;
    }

    // 同一區有兩種以上分類：依分類拆成有小標題的區塊（順序依 projects.js 中第一次出現的順序）
    filtersEl.remove();
    const cats = [...new Set(list.map((p) => p.category))];
    if (cats.length < 2) {
      list.forEach((p, i) => grid.appendChild(makeCard(p, i)));
      return;
    }
    cats.forEach((c) => {
      const items = list.filter((p) => p.category === c);
      const group = document.createElement("div");
      group.className = "subgroup";
      const head = document.createElement("h3");
      head.className = "subhead reveal";
      head.innerHTML = `<span></span><small></small>`;
      head.querySelector("span").textContent = c;
      head.querySelector("small").textContent = String(items.length).padStart(2, "0");
      const g = document.createElement("div");
      g.className = "grid";
      items.forEach((p, i) => g.appendChild(makeCard(p, i, true)));
      group.append(head, g);
      grid.before(group);
    });
    grid.remove();
  });

  /* ---------- Card ---------- */
  function makeCard(p, i, grouped) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card reveal";
    card.dataset.cat = p.category;
    card.style.transitionDelay = `${(i % 3) * 80}ms`;

    const thumb = document.createElement("div");
    thumb.className = "thumb";
    const isLocalVideo = p.video && !/^https?:/.test(p.video);
    const previewSrc = p.preview || (isLocalVideo ? p.video : "");
    const frameAt = p.preview ? 0 : (p.frameAt ?? 8); // 沒有封面圖時，用影片第 N 秒的畫面當封面

    if (p.thumb) {
      const img = document.createElement("img");
      img.src = p.thumb;
      img.alt = p.title;
      img.loading = "lazy";
      thumb.appendChild(img);
    } else if (!previewSrc) {
      thumb.style.background = gradient(p.colors || ["#444", "#111"]);
      const ph = document.createElement("span");
      ph.className = "thumb-title";
      ph.textContent = p.title;
      thumb.appendChild(ph);
    }

    let vid = null;
    if (previewSrc) {
      vid = document.createElement("video");
      vid.src = `${previewSrc}#t=${frameAt}`;
      vid.muted = true;
      vid.loop = true;
      vid.playsInline = true;
      // 沒有封面圖：先載入一格畫面當封面並常駐顯示；有封面圖：滑鼠移上去才載入
      vid.preload = p.thumb ? "none" : "metadata";
      if (!p.thumb) vid.classList.add("as-cover");
      thumb.appendChild(vid);
      card.addEventListener("mouseenter", () => { vid.play().catch(() => {}); });
      card.addEventListener("mouseleave", () => { vid.pause(); vid.currentTime = frameAt; });
    }

    // 獲獎／入選標籤
    if (p.award) {
      const award = document.createElement("span");
      award.className = "award";
      award.textContent = p.award;
      thumb.appendChild(award);
    }

    const playIcon = document.createElement("span");
    playIcon.className = "thumb-play";
    playIcon.setAttribute("aria-hidden", "true");
    thumb.appendChild(playIcon);

    const info = document.createElement("div");
    info.className = "card-info";
    info.innerHTML = `<h3></h3><span class="meta"></span>`;
    info.querySelector("h3").textContent = p.title;
    // 已在分類小標題底下時，卡片只顯示年份
    info.querySelector(".meta").textContent = grouped ? `${p.year}` : `${p.category} · ${p.year}`;

    card.append(thumb, info);
    card.addEventListener("click", () =>
      openModal({
        title: p.title,
        meta: [p.client, p.role, p.year].filter(Boolean).join(" · "),
        desc: p.award ? `${p.award}\n\n${p.description}` : p.description,
        video: p.video,
        colors: p.colors,
        vertical: p.vertical,
      })
    );
    return card;
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---------- Running timecode ---------- */
  const tc = document.getElementById("tc");
  const start = performance.now();
  const pad = (n) => String(n).padStart(2, "0");
  (function tick() {
    const t = (performance.now() - start) / 1000;
    const f = Math.floor((t % 1) * 24);
    const s = Math.floor(t) % 60, m = Math.floor(t / 60) % 60, h = Math.floor(t / 3600);
    tc.textContent = `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
    requestAnimationFrame(tick);
  })();

  /* ---------- Nav shadow on scroll ---------- */
  const nav = document.querySelector(".nav");
  addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 20), { passive: true });
})();
