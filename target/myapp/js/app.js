(function () {
  var shoe = document.getElementById('shoe'), scene = document.getElementById('scene');
  var NS = 'http://www.w3.org/2000/svg';

  function layer(cls, href, z) {
    var d = document.createElement('div');
    if (cls) d.className = cls;
    d.style.transform = 'translateZ(' + z + 'px)';
    d.innerHTML = '<svg viewBox="0 0 600 300"><use href="' + href + '"/></svg>';
    return d;
  }
  // soft ground shadow, then 16 stacked silhouettes for the shoe's thickness, then the artwork on top
  var sh = document.createElement('div'); sh.className = 'shadow'; shoe.appendChild(sh);
  for (var i = 16; i >= 1; i--) shoe.appendChild(layer('ext', '#sil', -i * 2));
  shoe.appendChild(layer('', '#art', 2));

  // smooth mouse / touch rotation
  var tx = -20, ty = 0, cx = -20, cy = 0, dragging = false, lastX = 0;
  var hero = document.getElementById('hero');
  hero.addEventListener('pointermove', function (e) {
    var r = hero.getBoundingClientRect();
    if (dragging) { tx += (e.clientX - lastX) * 0.4; lastX = e.clientX; }
    else { tx = ((e.clientX - r.left) / r.width - 0.5) * 70; }
    ty = -((e.clientY - r.top) / r.height - 0.5) * 24;
    tx = Math.max(-70, Math.min(70, tx));
  });
  hero.addEventListener('pointerdown', function (e) { dragging = true; lastX = e.clientX; });
  window.addEventListener('pointerup', function () { dragging = false; });
  (function loop() {
    cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
    scene.style.setProperty('--ry', cx + 'deg');
    scene.style.setProperty('--rx', cy + 'deg');
    requestAnimationFrame(loop);
  })();

  // scroll pushes the shoe back in depth
  window.addEventListener('scroll', function () {
    var p = Math.min(window.scrollY / window.innerHeight, 1);
    shoe.parentNode.parentNode.style.translate = '0 ' + (p * 60) + 'px';
  }, { passive: true });

  // colorways
  var sw = document.querySelectorAll('.swatches button');
  sw.forEach(function (b) {
    b.addEventListener('click', function () {
      document.body.dataset.theme = b.dataset.t;
      sw.forEach(function (x) { x.classList.toggle('on', x === b); });
    });
  });

  // bag counter
  var count = 0, bag = document.getElementById('bag');
  document.getElementById('add').addEventListener('click', function () {
    document.getElementById('count').textContent = ++count;
    bag.classList.remove('pop'); void bag.offsetWidth; bag.classList.add('pop');
  });

  // 3D tilt on cards
  document.querySelectorAll('.tilt').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--ry', ((e.clientX - r.left) / r.width - 0.5) * 22 + 'deg');
      el.style.setProperty('--rx', -((e.clientY - r.top) / r.height - 0.5) * 22 + 'deg');
    });
    el.addEventListener('pointerleave', function () {
      el.style.setProperty('--ry', '0deg'); el.style.setProperty('--rx', '0deg');
    });
    el.classList.add('reveal');
  });
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  document.getElementById('joinForm').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('joinMsg').textContent = 'Welcome to Nike. You\'ll be the first to know about new drops.';
    e.target.reset();
  });
})();
