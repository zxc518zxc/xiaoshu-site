// 小樹官網共用導覽列:每頁放 <nav class="nav" id="nav"></nav> + <script src="nav.js"></script>,這支把連結補進去並標出目前這頁。
// 首頁的導覽列一開始是透明的,捲動後才變實心(index 的 <nav> 加 data-hero);其他頁一律實心。
(function () {
  var GAME = 'https://test.xiaoshu.gg/play/';
  var MENU = [
    ['新手指南', 'guide.html'],
    ['遊戲資料', null, [
      ['系統介紹', 'systems.html'],
      ['技能介紹', 'skills.html'],
      ['裝備強化', 'enhance.html'],
      ['召喚與寵物', 'pets.html'],
      ['獵場列表', 'zones.html'],
      ['怪物掉落', 'monsters.html'],
    ]],
    ['活動', 'events.html'],
    ['更新日誌', 'changelog.html'],
    ['加入社群', 'index.html#join'],
  ];
  var nav = document.getElementById('nav');
  if (!nav) return;
  var here = (location.pathname.split('/').pop() || 'index.html');
  var hero = nav.hasAttribute('data-hero');
  function link(item) {
    return '<a href="' + item[1] + '"' + (item[1] === here ? ' class="on"' : '') + '>' + item[0] + '</a>';
  }
  var links = MENU.map(function (m) {
    if (!m[2]) return link(m);
    var on = m[2].some(function (s) { return s[1] === here; });
    return '<div class="dd' + (on ? ' on' : '') + '"><button type="button" class="dd-btn">' + m[0] + ' <span>▾</span></button>' +
      '<div class="dd-menu">' + m[2].map(link).join('') + '</div></div>';
  }).join('');
  var flat = MENU.map(function (m) { return m[2] ? m[2].map(link).join('') : link(m); }).join('');
  nav.innerHTML = '<div class="wrap">' +
    '<a class="brand" href="index.html">小樹放置天堂</a>' +
    '<div class="nav-links">' + links + '</div>' +
    '<a class="btn btn-gold nav-play" href="' + GAME + '" target="_blank" rel="noopener">進入遊戲</a>' +
    '<button type="button" class="burger" aria-label="選單"><i></i><i></i><i></i></button>' +
    '</div><div class="m-menu">' + flat + '<a class="m-play" href="' + GAME + '" target="_blank" rel="noopener">▶ 進入遊戲</a></div>';
  if (!hero) nav.classList.add('solid');
  else {
    var onScroll = function () { nav.classList.toggle('solid', window.scrollY > 40 || nav.classList.contains('open')); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  // 下拉選單:點按開關(手機/平板沒有 hover),點外面收起
  nav.addEventListener('click', function (e) {
    var b = e.target.closest('.dd-btn');
    if (b) { var dd = b.parentNode; var open = !dd.classList.contains('show'); closeAll(); if (open) dd.classList.add('show'); e.stopPropagation(); return; }
    if (e.target.closest('.burger')) { nav.classList.toggle('open'); if (hero) nav.classList.toggle('solid', nav.classList.contains('open') || window.scrollY > 40); e.stopPropagation(); }
  });
  function closeAll() { nav.querySelectorAll('.dd.show').forEach(function (d) { d.classList.remove('show'); }); }
  document.addEventListener('click', closeAll);
})();
