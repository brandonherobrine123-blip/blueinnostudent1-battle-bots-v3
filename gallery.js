(function () {
  const C = window.GalleryCore;
  const ASSETS = window.ASSETS || [];
  const R = window.RULEBOOK || {};

  // ---- Game state ----
  let currentLevel = 'crazy'; // simple=15, crazy=30, chaotic=60
  const LEVEL_DRAW = { simple: 15, crazy: 30, chaotic: 60 };

  // Small inline robot/tech icon set (24x24 stroke paths), chosen by category then type.
  const PATHS = {
    bot: 'M9 2v2M15 2v2M5 8h14a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a1 1 0 0 1 1-1ZM9 13h.01M15 13h.01',
    zap: 'M13 2 4 14h7l-1 8 9-12h-7l1-8Z',
    cpu: 'M6 6h12v12H6zM9 9h6v6H9zM2 9h2M2 14h2M20 9h2M20 14h2M9 2v2M14 2v2M9 20v2M14 20v2',
    shield: 'M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z',
    wrench: 'M14 7a4 4 0 0 1-5 5l-6 6 2 2 6-6a4 4 0 0 0 5-5l-2 2-2-2 2-2Z',
    battery: 'M3 8h14v8H3zM21 11v2',
    grid: 'M4 4h16v16H4zM4 10h16M4 16h16M10 4v16M16 4v16',
    sword: 'M8 2 2 8l4 4 6-6-4-4ZM18 8l4 4-2 2-4-4 2-2Z',
    cog: 'M12 2l1 3h-2l1-3ZM20 8l-2 1v2l2 1ZM22 12l-3-1v2l3-1ZM4 8l2 1v2l-2 1ZM2 12l3-1v2l-3-1ZM12 22l-1-3h2l-1 3Z',
  };
  function pickIcon(asset) {
    const c = String(asset.category || '').toLowerCase();
    if (asset.type === 'tile') return PATHS.grid;
    if (asset.type === 'token') return PATHS.bot;
    if (c.includes('attack') || c.includes('strike')) return PATHS.zap;
    if (c.includes('defense') || c.includes('shield')) return PATHS.shield;
    if (c.includes('support') || c.includes('repair')) return PATHS.wrench;
    if (c.includes('boost') || c.includes('speed')) return PATHS.battery;
    if (c.includes('weapon') || c.includes('arm')) return PATHS.sword;
    if (c.includes('core') || c.includes('engine')) return PATHS.cog;
    return PATHS.cpu;
  }
  function svgIcon(asset) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', '#45ACF4');
    svg.setAttribute('stroke-width', '1.6');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    const p = document.createElementNS(ns, 'path');
    p.setAttribute('d', pickIcon(asset));
    svg.appendChild(p);
    return svg;
  }

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function artBox(asset) {
    const box = el('div', 'asset-art');
    const badge = el('span', 'asset-badge', asset.category || asset.type);
    const placeholder = svgIcon(asset);
    if (asset.image) {
      const img = document.createElement('img');
      img.alt = asset.name;
      img.src = asset.image;
      img.onerror = () => { img.remove(); box.appendChild(placeholder); };
      box.appendChild(img);
    } else {
      box.appendChild(placeholder);
    }
    box.appendChild(badge);
    return box;
  }

  function assetCard(asset) {
    const card = el('div', 'asset');
    const head = el('div', 'asset-head');
    head.appendChild(el('span', 'asset-name', asset.name));
    if (typeof asset.cost === 'number') head.appendChild(el('span', 'asset-cost', String(asset.cost)));
    card.appendChild(head);
    card.appendChild(artBox(asset));

    const stats = C.statChips(asset).filter(function (s) { return s.label !== 'COST'; });
    if (stats.length) {
      const row = el('div', 'asset-stats');
      for (var i = 0; i < stats.length; i++) {
        var s = stats[i];
        var stat = el('span', 'stat');
        stat.appendChild(el('span', 'label', s.label));
        stat.appendChild(document.createTextNode(String(s.value)));
        row.appendChild(stat);
      }
      card.appendChild(row);
    }
    if (asset.effect) card.appendChild(el('p', 'asset-effect', asset.effect));
    if (asset.flavor) card.appendChild(el('p', 'asset-flavor', asset.flavor));
    card.appendChild(el('div', 'asset-foot', '#' + asset.id));
    return card;
  }

  function family(label, items) {
    var wrap = el('section', 'family');
    wrap.appendChild(el('div', 'family-label', label + ' · ' + items.length));
    var grid = el('div', 'grid');
    for (var i = 0; i < items.length; i++) grid.appendChild(assetCard(items[i]));
    wrap.appendChild(grid);
    return wrap;
  }

  // ---- Level filtering ----
  function filterByLevel(assets) {
    var draw = LEVEL_DRAW[currentLevel];
    // Each player draws `draw` cards, so deck needs 2x that many cards.
    var deckSize = draw * 2;
    var grouped = C.groupByType(assets);
    var result = [];
    for (var t = 0; t < C.TYPES.length; t++) {
      var type = C.TYPES[t];
      var items = grouped[type] || [];
      // Show up to deckSize cards per type (proportional to availability)
      result = result.concat(items.slice(0, deckSize));
    }
    // Cap total shown cards to deckSize
    return result.slice(0, deckSize);
  }

  // ---- Render ----
  function renderTopbar(R) {
    var title = R.title || 'Your Game';
    document.title = title + ' · Asset Gallery';
    var brand = document.getElementById('brand');
    if (R.mark) brand.appendChild(el('span', 'brand-mark', R.mark));
    brand.appendChild(document.createTextNode((R.mark ? ' ' : '') + title));
    document.getElementById('tagline').textContent = R.tagline || 'Your game-asset gallery';
  }

  function renderRulebook(container, R, extended) {
    container.innerHTML = '';
    var h2 = el('h2', null, R.theme || 'Your game');
    container.appendChild(h2);

    var dl = document.createElement('dl');
    var rows = [
      ['How to play', R.howToPlay],
      ['A turn', R.aTurn],
      ['Win', R.winCondition],
      ['Pieces', R.pieces],
      ['Numbers', R.ranges],
    ];
    if (extended) {
      // Lore goes first
      if (R.lore) {
        var loreDiv = document.createElement('div');
        loreDiv.style.cssText = 'margin-bottom:20px;padding:16px 20px;background:var(--tint);border-radius:12px;border:1.5px solid var(--rule);font-size:15px;line-height:1.6;font-style:italic;color:var(--heading);';
        loreDiv.textContent = R.lore;
        container.appendChild(loreDiv);
      }
      rows.push(
        ['Levels', 'Simple: 15 cards each (30 deck). Crazy: 30 each (60 deck). Chaotic: 60 each (120 deck). Pick before building.'],
        ['Stats', 'ATK = damage per hit. DEF = block incoming damage. SPD = who goes first, bonus actions (gap of 3+), and reaction eligibility. ENG = spent to play action cards; thresholds gate powerful cards. RNG = unlocks ranged cards, safe poke when out-ranging, 25% sensor dodge. HP = life total; zero = knockout.'],
        ['Build Phase', 'Shuffle the shared part deck. Each player secretly draws cards equal to level count. Attach parts to chassis slots (Head, Arms, Legs, Core, Hardpoints — player slots are ∞). Apply up to 5 exoskeleton materials (slot-free). Calculate final stats. Reveal both bots simultaneously.'],
        ['Fight Phase', 'Best of 3 rounds. Shuffle action deck, each draws 15. Each round: full HP & ENG reset. Fresh action hand each round. Higher SPD goes first. Alternate playing 1 action — each card has unique effects matching its name (shield, heal, EMP, Overload, Last Stand, etc.). Cards reset after each round.'],
        ['Win Condition', 'First to win 2 rounds wins the match. Round win = knockout (HP to 0) OR highest HP when both pass. HP tie → higher ENG wins. ENG tie → sudden death.'],
        ['Action Cards', 'Heavy Strike: ATK+10. Quick Jab: play twice. Sniper Shot: RNG 6+, no counter. Energy Shield: block next hit. Scrap Shield: +5 DEF. Full Repair: heal 25. Patch Job: heal 10. Overload: next ATK ×2. Dodge Roll: auto-dodge. Counterstrike: return fire. EMP Burst: drain 10 ENG + stun. Last Stand: ATK×2 + heal 15 when HP≤15. Flanking: +3 SPD + free Strike. Barrage: ATK+8 + halve DEF. Recharge: +12 ENG. Pass: skip turn free.'],
        ['God Card', 'DIVINE PROTOCOL — player only, 99.999% draw chance. Stacks up to 5 copies. +99 all stats, +999 ENG/HP. Slot-free.']
      );
    }
    for (var i = 0; i < rows.length; i++) {
      var k = rows[i][0], v = rows[i][1];
      if (!v) continue;
      dl.appendChild(el('dt', null, k));
      dl.appendChild(el('dd', null, v));
    }
    container.appendChild(dl);
  }

  function renderGallery(assets) {
    var root = document.getElementById('gallery');
    root.innerHTML = '';
    var filtered = filterByLevel(assets);
    var grouped = C.groupByType(filtered);
    var fam = R.families || {};
    var labels = [fam.card || 'Part Cards', fam.token || 'Chassis Tokens', fam.tile || 'Action Cards'];
    var types = C.TYPES;
    for (var i = 0; i < types.length; i++) {
      var items = grouped[types[i]] || [];
      root.appendChild(family(labels[i], items));
    }

    // Update level badge
    var badge = document.getElementById('levelBadge');
    if (badge) {
      badge.textContent = 'Level: ' + currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1) +
        ' (' + LEVEL_DRAW[currentLevel] + ' cards each)';
    }
  }

  // ---- Menu logic ----
  function setupMenu() {
    var playBtn = document.querySelector('.menu-btn[data-view="play"]');
    var rulesBtn = document.querySelector('.menu-btn[data-view="rules"]');
    var playView = document.getElementById('playView');
    var rulesView = document.getElementById('rulesView');
    var levelsBtn = document.getElementById('levelsBtn');
    var levelsPanel = document.getElementById('levelsPanel');

    function showView(name) {
      if (name === 'play') {
        playView.classList.add('active');
        rulesView.classList.remove('active');
        playBtn.classList.add('active');
        rulesBtn.classList.remove('active');
      } else {
        rulesView.classList.add('active');
        playView.classList.remove('active');
        rulesBtn.classList.add('active');
        playBtn.classList.remove('active');
      }
    }

    playBtn.addEventListener('click', function () { showView('play'); });
    rulesBtn.addEventListener('click', function () { showView('rules'); });

    // Levels dropdown toggle
    levelsBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      levelsPanel.classList.toggle('open');
    });

    // Level selection
    levelsPanel.addEventListener('click', function (e) {
      var opt = e.target.closest('.level-opt');
      if (!opt) return;
      currentLevel = opt.dataset.level;
      window._currentLevel = currentLevel;
      var opts = levelsPanel.querySelectorAll('.level-opt');
      for (var i = 0; i < opts.length; i++) opts[i].classList.remove('active');
      opt.classList.add('active');
      levelsPanel.classList.remove('open');
      renderGallery(ASSETS);
    });

    // Close dropdown on outside click
    document.addEventListener('click', function () {
      levelsPanel.classList.remove('open');
    });
  }

  // ---- Init ----
  renderTopbar(R);
  renderRulebook(document.getElementById('rulebook'), R, false);
  renderRulebook(document.getElementById('rulesFull'), R, true);
  renderGallery(ASSETS);
  setupMenu();
})();
