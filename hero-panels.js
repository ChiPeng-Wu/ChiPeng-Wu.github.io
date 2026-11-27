// Hero 五格動畫的粒子效果：Houdini（漩渦）與 Nuke（閃爍粒子）
// Hero 不在畫面上或分頁隱藏時暫停；使用者偏好減少動態時只畫一格靜態畫面
(function () {
  const canvases = document.querySelectorAll(".hp-canvas");
  if (!canvases.length) return;
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rand = (a, b) => a + Math.random() * (b - a);

  const fx = {
    // 粒子沿螺旋往中心旋轉，帶殘影
    vortex(s) {
      const { ctx, w, h } = s;
      if (!s.p) s.p = Array.from({ length: 140 }, () => ({ a: rand(0, 6.28), r: rand(.1, 1), v: rand(.6, 1.4) }));
      ctx.fillStyle = "rgba(15, 15, 18, .22)";
      ctx.fillRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2, R = Math.hypot(w, h) / 2;
      for (const p of s.p) {
        if (p.r < .05 || p.r > 1) { p.r = rand(.75, 1); p.a = rand(0, 6.28); }
        p.a += .012 * p.v / Math.max(p.r, .15);
        p.r -= .0016 * p.v;
        const x = cx + Math.cos(p.a) * p.r * R, y = cy + Math.sin(p.a) * p.r * R * .9;
        const hue = 14 + (1 - p.r) * 26;
        ctx.fillStyle = `hsla(${hue}, 100%, ${55 + (1 - p.r) * 20}%, ${.35 + (1 - p.r) * .6})`;
        ctx.fillRect(x, y, 2, 2);
      }
    },
    // 緩慢下飄、會閃的小光點
    sparks(s) {
      const { ctx, w, h } = s;
      if (!s.p) s.p = Array.from({ length: 90 }, () => ({ x: rand(0, w), y: rand(0, h), v: rand(.15, .6), t: rand(0, 6.28), z: rand(.6, 1.8) }));
      ctx.clearRect(0, 0, w, h);
      for (const p of s.p) {
        p.y += p.v; p.t += .06;
        if (p.y > h + 4) { p.y = -4; p.x = rand(0, w); }
        const a = .25 + .75 * Math.abs(Math.sin(p.t));
        ctx.fillStyle = Math.random() < .02 ? `rgba(255,255,255,${a})` : `rgba(245, 180, 70, ${a * .85})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.z * a, 0, 6.28); ctx.fill();
      }
    },
  };

  const scenes = [...canvases].map((c) => ({ c, ctx: c.getContext("2d"), run: fx[c.dataset.fx], w: 0, h: 0 }));
  function size(s) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2), r = s.c.getBoundingClientRect();
    s.w = r.width; s.h = r.height;
    s.c.width = Math.round(r.width * dpr); s.c.height = Math.round(r.height * dpr);
    s.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    s.p = null;
  }
  const ro = new ResizeObserver(() => scenes.forEach(size));
  scenes.forEach((s) => ro.observe(s.c));
  scenes.forEach(size);

  let visible = true, raf = 0;
  function frame() {
    scenes.forEach((s) => s.w && s.run(s));
    raf = visible && !document.hidden && !still ? requestAnimationFrame(frame) : 0;
  }
  function wake() { if (!raf && !still && visible && !document.hidden) raf = requestAnimationFrame(frame); }
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; wake(); }).observe(document.querySelector(".hero-panels"));
  document.addEventListener("visibilitychange", wake);
  if (still) { for (let i = 0; i < 60; i++) frame(); } else wake();
})();
