document.addEventListener('astro:page-load', () => {
  const world = document.querySelector<HTMLElement>('#physics-world');
  if (!world) return;
  const lifetime = new AbortController();
  const options = { signal: lifetime.signal };
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = Array.from(world.querySelectorAll<HTMLButtonElement>('.coaster-wrapper'));
  let frame = 0, lastFrame = 0, highestZ = 1;
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const states = cards.map((el, index) => ({ el, index, x: 0, y: 0, rotation: 0, vx: 0, vy: 0, dragging: false, moved: false, pointerX: 0, pointerY: 0, originX: 0, originY: 0, lastTime: 0 }));
  type State = typeof states[number];
  const draw = (s: State) => { s.el.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${s.rotation}deg)`; };
  const bounds = (s: State) => ({ x: Math.max(0, world.clientWidth - s.el.offsetWidth - 8), y: Math.max(0, world.clientHeight - s.el.offsetHeight - 8) });
  const arrange = () => {
    for (const timer of timers) clearTimeout(timer);
    timers.clear();
    const cols = world.clientWidth > 680 ? 3 : 2;
    const rows = Math.ceil(states.length / cols);
    states.forEach(s => {
      const limit = bounds(s);
      s.x = Math.max(8, Math.min(limit.x, world.clientWidth / cols * (s.index % cols + 0.5) - s.el.offsetWidth / 2));
      s.y = Math.max(8, Math.min(limit.y, world.clientHeight / rows * (Math.floor(s.index / cols) + 0.5) - s.el.offsetHeight / 2));
      s.rotation = [-9, 8, -5, 12, -7, 5][s.index % 6]; s.vx = 0; s.vy = 0;
      s.el.classList.add('is-dealing'); draw(s);
      const timer = setTimeout(() => { s.el.classList.remove('is-dealing'); timers.delete(timer); }, 500);
      timers.add(timer);
    });
  };
  world.classList.add('is-interactive'); arrange();
  const animate = (time: number) => {
    const scale = lastFrame ? Math.min(2, (time - lastFrame) / 16.667) : 1;
    lastFrame = time;
    let moving = false;
    states.forEach(s => {
      if (s.dragging) return;
      if (Math.abs(s.vx) < .1 && Math.abs(s.vy) < .1) { s.vx = 0; s.vy = 0; return; }
      moving = true;
      s.x += s.vx * scale; s.y += s.vy * scale;
      s.vx *= .92 ** scale; s.vy *= .92 ** scale;
      const limit = bounds(s);
      if (s.x < 8 || s.x > limit.x) { s.x = Math.min(limit.x, Math.max(8, s.x)); s.vx *= -.4; }
      if (s.y < 8 || s.y > limit.y) { s.y = Math.min(limit.y, Math.max(8, s.y)); s.vy *= -.4; }
      draw(s);
    });
    frame = moving ? requestAnimationFrame(animate) : 0;
    if (!moving) lastFrame = 0;
  };
  const startPhysics = () => { if (!frame && !reducedMotion) frame = requestAnimationFrame(animate); };

  states.forEach(s => {
    const dialog = document.getElementById(`project-${s.el.dataset.client}`) as HTMLDialogElement;
    const originalLabel = s.el.getAttribute('aria-label')!;
    const flip = (back: boolean) => {
      s.el.classList.toggle('is-flipped', back);
      s.el.querySelector('.coaster-front')!.setAttribute('aria-hidden', String(back));
      s.el.querySelector('.coaster-back')!.setAttribute('aria-hidden', String(!back));
      const abrirFicha = world.dataset.abrirFicha ?? 'Abrir la ficha de';
      s.el.setAttribute('aria-label', back ? `${abrirFicha} ${s.el.querySelector('.coaster-logo')!.firstChild!.textContent}` : originalLabel);
    };
    s.el.addEventListener('click', event => {
      if (s.moved && event.detail !== 0) { s.moved = false; return; }
      if (!s.el.classList.contains('is-flipped')) flip(true);
      else { s.vx = 0; s.vy = 0; dialog.showModal(); }
    }, options);
    s.el.addEventListener('pointerdown', event => {
      if (!event.isPrimary || event.button !== 0) return;
      s.dragging = true; s.moved = false; s.vx = 0; s.vy = 0;
      s.pointerX = event.clientX; s.pointerY = event.clientY;
      s.originX = s.x; s.originY = s.y; s.lastTime = event.timeStamp;
      s.el.classList.remove('is-dealing'); s.el.style.zIndex = String(++highestZ);
      s.el.setPointerCapture(event.pointerId);
    }, options);
    s.el.addEventListener('pointermove', event => {
      if (!s.dragging) return;
      const dx = event.clientX - s.pointerX, dy = event.clientY - s.pointerY;
      if (!s.moved && Math.hypot(dx, dy) < 7) return;
      s.moved = true; s.el.classList.add('is-dragging');
      const elapsed = Math.max(8, event.timeStamp - s.lastTime);
      const limit = bounds(s);
      const x = Math.max(8, Math.min(limit.x, s.originX + dx));
      const y = Math.max(8, Math.min(limit.y, s.originY + dy));
      s.vx = reducedMotion ? 0 : Math.max(-30, Math.min(30, (x - s.x) * 16.667 / elapsed));
      s.vy = reducedMotion ? 0 : Math.max(-30, Math.min(30, (y - s.y) * 16.667 / elapsed));
      s.x = x; s.y = y; s.lastTime = event.timeStamp; draw(s);
    }, options);
    const release = (event: PointerEvent, cancelled = false) => {
      if (!s.dragging) return;
      s.dragging = false; s.el.classList.remove('is-dragging');
      if (s.el.hasPointerCapture(event.pointerId)) s.el.releasePointerCapture(event.pointerId);
      if (cancelled || event.timeStamp - s.lastTime > 120) { s.vx = 0; s.vy = 0; }
      startPhysics();
    };
    s.el.addEventListener('pointerup', event => release(event), options);
    s.el.addEventListener('pointercancel', event => release(event, true), options);
    s.el.addEventListener('lostpointercapture', () => { s.dragging = false; s.el.classList.remove('is-dragging'); }, options);
    dialog.querySelector('[data-turn-back]')!.addEventListener('click', () => { flip(false); dialog.close(); }, options);
    dialog.addEventListener('close', () => {
      dialog.querySelectorAll<HTMLMediaElement>('audio, video').forEach(media => media.pause());
      s.el.focus();
    }, options);
  });
  document.querySelector('#tidy-coasters')!.addEventListener('click', arrange, options);
  const resize = new ResizeObserver(arrange); resize.observe(world);
  document.addEventListener('astro:before-swap', () => {
    lifetime.abort(); cancelAnimationFrame(frame); resize.disconnect(); timers.forEach(clearTimeout);
    document.querySelectorAll<HTMLMediaElement>('.project-dialog audio, .project-dialog video').forEach(media => media.pause());
  }, { once: true, signal: lifetime.signal });
});
