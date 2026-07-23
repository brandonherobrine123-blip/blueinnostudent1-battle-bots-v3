(function () {
  var ASSETS = window.ASSETS || [];
  var R = window.RULEBOOK || {};

  // ---- Game state ----
  var currentLevel = 'crazy';
  var LEVEL_DRAW = { simple: 15, crazy: 30, chaotic: 60 };
  var CHASSIS = { hp: 50, atk: 5, def: 0, spd: 3, eng: 30, rng: 3 };

  // Player slots — infinite (no limits)
  var INF = Infinity;
  var PLAYER_SLOTS = { Head: INF, Arm: INF, Leg: INF, Core: INF, Hardpoint: INF };
  var PLAYER_MAX_MATERIALS = INF;
  var PLAYER_MAX_PARTS = INF;

  // Enemy slots — normal limits
  var ENEMY_SLOTS = { Head: 1, Arm: 2, Leg: 2, Core: 1, Hardpoint: 9 };
  var ENEMY_MAX_MATERIALS = 5;
  var ENEMY_MAX_PARTS = 15;

  var playerHand = [];
  var playerAttached = []; // { asset, slotType }
  var playerMaterials = [];
  var enemyHand = [];
  var enemyAttached = [];
  var enemyMaterials = [];

  var playerActions = [];
  var enemyActions = [];
  var fightRound = 0;
  var maxRounds = 3;
  var playerPassed = false;
  var gameActive = false;
  var playerMaxHp = 50;
  var enemyMaxHp = 50;

  // ---- Helpers ----
  function el(t, c, txt) {
    var n = document.createElement(t);
    if (c) n.className = c;
    if (txt != null) n.textContent = txt;
    return n;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function sumStat(assets, key) {
    var total = 0;
    for (var i = 0; i < assets.length; i++) {
      if (typeof assets[i][key] === 'number') total += assets[i][key];
    }
    return total;
  }

  function botStats(attached, materials) {
    var all = attached.concat(materials);
    return {
      hp: CHASSIS.hp + sumStat(all, 'hp'),
      atk: CHASSIS.atk + sumStat(all, 'atk'),
      def: CHASSIS.def + sumStat(all, 'def'),
      spd: CHASSIS.spd + sumStat(all, 'spd'),
      eng: CHASSIS.eng + sumStat(all, 'eng'),
      rng: CHASSIS.rng + sumStat(all, 'rng'),
    };
  }

  function slotLabel(slotType) {
    var max = PLAYER_SLOTS[slotType] || 0;
    var label = max === INF ? '∞' : String(max);
    return slotType + ' (' + label + ' slot' + (max === 1 ? '' : 's') + ')';
  }

  function assetStatStr(a) {
    var parts = [];
    var keys = ['atk','def','spd','eng','rng','hp'];
    for (var i = 0; i < keys.length; i++) {
      var v = a[keys[i]];
      if (typeof v === 'number' && v !== 0) {
        parts.push((v > 0 ? '+' : '') + v + ' ' + keys[i].toUpperCase());
      }
    }
    return parts.join(' ') || '—';
  }

  function countInSlot(slotType) {
    var c = 0;
    for (var i = 0; i < playerAttached.length; i++) {
      if (playerAttached[i].slotType === slotType) c++;
    }
    return c;
  }

  function isMaterial(a) {
    var cat = String(a.category || '').toLowerCase();
    return cat === 'material' || cat === 'god';
  }

  function slotTypeFor(a) {
    if (isMaterial(a)) return 'Material';
    var cat = String(a.category || '');
    var parts = cat.split('·');
    if (parts.length > 1) return parts[0].trim();
    // Fallback: guess from category keywords
    var c = cat.toLowerCase();
    if (c.includes('head')) return 'Head';
    if (c.includes('arm')) return 'Arm';
    if (c.includes('leg')) return 'Leg';
    if (c.includes('core')) return 'Core';
    return 'Hardpoint';
  }

  // ---- Screens ----
  function showScreen(id) {
    var screens = ['gameStart', 'gameBuild', 'gameFight', 'gameOver'];
    for (var i = 0; i < screens.length; i++) {
      var s = document.getElementById(screens[i]);
      if (s) s.style.display = (screens[i] === id) ? '' : 'none';
    }
  }

  // ---- Start Game ----
  function startGame() {
    showScreen('gameBuild');
    gameActive = true;
    playerAttached = [];
    playerMaterials = [];
    enemyAttached = [];
    enemyMaterials = [];
    fightRound = 0;
    playerPassed = false;

    // Draw part cards — god card is player-only
    var normalPool = ASSETS.filter(function (a) { return a.type === 'card' && a.category !== 'God'; });
    var godCard = ASSETS.filter(function (a) { return a.type === 'card' && a.category === 'God'; })[0];
    var drawCount = LEVEL_DRAW[currentLevel];
    var shuffled = shuffle(normalPool);
    playerHand = shuffled.slice(0, Math.min(drawCount, shuffled.length));

    // 99.999% chance per roll — god cards stack (5 rolls)
    if (godCard) {
      for (var g = 0; g < 5; g++) {
        if (Math.random() <= 0.99999) {
          playerHand.push(godCard);
        }
      }
    }

    // Enemy gets random hand — NEVER gets god card
    var enemyShuffled = shuffle(normalPool);
    enemyHand = enemyShuffled.slice(0, Math.min(drawCount, enemyShuffled.length));

    // Auto-build enemy
    buildEnemyBot();

    renderBuildScreen();
  }

  function buildEnemyBot() {
    enemyAttached = [];
    enemyMaterials = [];
    var slotCounts = {};
    var keys = Object.keys(ENEMY_SLOTS);
    for (var i = 0; i < keys.length; i++) slotCounts[keys[i]] = 0;

    var shuffled = shuffle(enemyHand);
    for (var i = 0; i < shuffled.length; i++) {
      var a = shuffled[i];
      if (isMaterial(a)) {
        if (enemyMaterials.length < ENEMY_MAX_MATERIALS) {
          enemyMaterials.push(a);
        }
      } else {
        var st = slotTypeFor(a);
        var max = ENEMY_SLOTS[st] || 9;
        if ((slotCounts[st] || 0) < max && enemyAttached.length < ENEMY_MAX_PARTS) {
          enemyAttached.push({ asset: a, slotType: st });
          slotCounts[st] = (slotCounts[st] || 0) + 1;
        }
      }
    }
  }

  // ---- Build Screen ----
  function renderBuildScreen() {
    var handGrid = document.getElementById('handGrid');
    var handCount = document.getElementById('handCount');
    handGrid.innerHTML = '';
    handCount.textContent = '(' + playerHand.length + ' cards)';

    for (var i = 0; i < playerHand.length; i++) {
      var a = playerHand[i];
      var st = slotTypeFor(a);
      var card = el('div', 'hand-card');
      card.appendChild(el('div', 'hc-name', a.name));
      card.appendChild(el('div', 'hc-slot', isMaterial(a) ? 'Material (slot-free)' : slotLabel(st)));
      card.appendChild(el('div', 'hc-stats', assetStatStr(a)));
      card.appendChild(el('div', 'hc-effect', a.effect || ''));

      // Check if attached
      var attached = false;
      for (var j = 0; j < playerAttached.length; j++) {
        if (playerAttached[j].asset.id === a.id && playerAttached[j].asset === a) attached = true;
      }
      if (!attached) {
        for (var k = 0; k < playerMaterials.length; k++) {
          if (playerMaterials[k].id === a.id && playerMaterials[k] === a) attached = true;
        }
      }
      if (attached) card.classList.add('attached');

      card.addEventListener('click', (function (asset, slotT, isMat) {
        return function () { toggleAttach(asset, slotT, isMat); };
      })(a, st, isMaterial(a)));

      handGrid.appendChild(card);
    }

    renderBotPanel();
  }

  function toggleAttach(asset, slotT, isMat) {
    if (isMat) {
      var idx = -1;
      for (var i = 0; i < playerMaterials.length; i++) {
        if (playerMaterials[i].id === asset.id && playerMaterials[i] === asset) { idx = i; break; }
      }
      if (idx >= 0) {
        playerMaterials.splice(idx, 1);
      } else if (playerMaterials.length < PLAYER_MAX_MATERIALS) {
        playerMaterials.push(asset);
      }
    } else {
      var idx2 = -1;
      for (var i = 0; i < playerAttached.length; i++) {
        if (playerAttached[i].asset.id === asset.id && playerAttached[i].asset === asset) { idx2 = i; break; }
      }
      if (idx2 >= 0) {
        playerAttached.splice(idx2, 1);
      } else {
        var inSlot = 0;
        for (var i = 0; i < playerAttached.length; i++) {
          if (playerAttached[i].slotType === slotT) inSlot++;
        }
        var max = PLAYER_SLOTS[slotT] || INF;
        if (inSlot >= max) return;
        if (playerAttached.length >= PLAYER_MAX_PARTS) return;
        playerAttached.push({ asset: asset, slotType: slotT });
      }
    }
    renderBuildScreen();
  }

  function renderBotPanel() {
    var stats = botStats(
      playerAttached.map(function (x) { return x.asset; }),
      playerMaterials
    );
    var panel = document.getElementById('botStatsPanel');
    panel.innerHTML = '';
    var statKeys = [
      ['HP', 'hp'], ['ATK', 'atk'], ['DEF', 'def'],
      ['SPD', 'spd'], ['ENG', 'eng'], ['RNG', 'rng'],
    ];
    for (var i = 0; i < statKeys.length; i++) {
      var label = statKeys[i][0];
      var key = statKeys[i][1];
      var base = CHASSIS[key];
      var val = stats[key];
      var div = el('div', 'bot-stat');
      div.appendChild(el('div', 'bs-label', label));
      div.appendChild(el('div', 'bs-val', String(val)));
      div.appendChild(el('div', 'bs-base', 'base: ' + base));
      panel.appendChild(div);
    }

    // Slot usage
    var slotDiv = document.getElementById('botSlots');
    slotDiv.innerHTML = '';
    var slotTypes = ['Head', 'Arm', 'Leg', 'Core', 'Hardpoint'];
    for (var s = 0; s < slotTypes.length; s++) {
      var st = slotTypes[s];
      var max = PLAYER_SLOTS[st];
      var used = countInSlot(st);
      var sg = el('div', 'slot-group');
      var maxLabel = max === INF ? '∞' : String(max);
      sg.appendChild(el('div', 'sg-label', st + ' (' + maxLabel + ' slots)'));
      var usedStr = used + ' / ' + maxLabel + ' used';
      var names = [];
      for (var j = 0; j < playerAttached.length; j++) {
        if (playerAttached[j].slotType === st) names.push(playerAttached[j].asset.name);
      }
      sg.appendChild(el('div', 'sg-used', usedStr + (names.length ? ': ' + names.join(', ') : '')));
      slotDiv.appendChild(sg);
    }

    // Materials
    var matGroup = el('div', 'slot-group');
    var matMaxLabel = PLAYER_MAX_MATERIALS === INF ? '∞' : String(PLAYER_MAX_MATERIALS);
    matGroup.appendChild(el('div', 'sg-label', 'Materials (slot-free, ' + matMaxLabel + ' max)'));
    var matNames = [];
    for (var m = 0; m < playerMaterials.length; m++) matNames.push(playerMaterials[m].name);
    matGroup.appendChild(el('div', 'sg-used', playerMaterials.length + ' / ' + matMaxLabel + (matNames.length ? ': ' + matNames.join(', ') : '')));
    slotDiv.appendChild(matGroup);

    // Part count
    var partsLabel = PLAYER_MAX_PARTS === INF ? '∞' : String(PLAYER_MAX_PARTS);
    document.getElementById('slotCount').textContent = '(' + playerAttached.length + '/' + partsLabel + ' parts, ' + playerMaterials.length + '/' + matMaxLabel + ' mats)';
  }

  // ---- Fight Phase ----
  function startFight() {
    showScreen('gameFight');
    fightRound = 1;
    playerPassed = false;

    var playerStats = botStats(
      playerAttached.map(function (x) { return x.asset; }),
      playerMaterials
    );
    var enemyStats = botStats(
      enemyAttached.map(function (x) { return x.asset; }),
      enemyMaterials
    );

    playerMaxHp = playerStats.hp;
    enemyMaxHp = enemyStats.hp;
    var actionPool = ASSETS.filter(function (a) { return a.type === 'tile'; });
    var shuffled = shuffle(actionPool);
    playerActions = shuffled.slice(0, Math.min(15, shuffled.length));
    var shuffled2 = shuffle(actionPool);
    enemyActions = shuffled2.slice(0, Math.min(15, shuffled2.length));

    // Render fight screen
    renderFighterStats('playerFighterStats', playerStats, playerMaxHp, true);
    renderFighterStats('enemyFighterStats', enemyStats, enemyMaxHp, false);

    document.getElementById('fightLog').innerHTML = '';
    document.getElementById('roundInfo').textContent = 'Round 1 / 3';
    document.getElementById('turnInfo').textContent = 'Your SPD: ' + playerStats.spd + ' | Enemy SPD: ' + enemyStats.spd;

    // Determine who goes first
    var playerFirst = playerStats.spd >= enemyStats.spd;
    if (playerFirst) {
      log('You go first! (higher SPD)', 'you');
      renderFightHand(playerStats, enemyStats);
    } else {
      log('Enemy goes first! (higher SPD)', 'enemy');
      renderFightHand(playerStats, enemyStats);
      // Enemy takes first turn after a short delay
      setTimeout(function () { enemyTurn(playerStats, enemyStats); }, 1000);
    }

    gameActive = true;
  }

  function renderFighterStats(elId, stats, maxHp, isPlayer) {
    var elm = document.getElementById(elId);
    elm.innerHTML = '';

    // Bot icon
    var icon = el('div', 'bot-icon');
    icon.innerHTML = isPlayer ?
      '<svg viewBox="0 0 64 64" fill="none" stroke="#213F99" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="64" height="64">' +
        '<rect x="14" y="8" width="36" height="48" rx="6"/>' +
        '<circle cx="26" cy="26" r="4" fill="#45ACF4" stroke="none"/>' +
        '<circle cx="38" cy="26" r="4" fill="#45ACF4" stroke="none"/>' +
        '<rect x="22" y="38" width="20" height="4" rx="2"/>' +
        '<line x1="8" y1="20" x2="14" y2="20"/>' +
        '<line x1="8" y1="28" x2="14" y2="28"/>' +
        '<line x1="50" y1="20" x2="56" y2="20"/>' +
        '<line x1="50" y1="28" x2="56" y2="28"/>' +
        '<path d="M22 56l-4 6h28l-4-6"/>' +
        '<circle cx="32" cy="6" r="3" fill="#45ACF4" stroke="none"/>' +
      '</svg>' :
      '<svg viewBox="0 0 64 64" fill="none" stroke="#c44" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="64" height="64">' +
        '<rect x="10" y="10" width="44" height="44" rx="8"/>' +
        '<circle cx="24" cy="28" r="5" fill="#c44" stroke="none"/>' +
        '<circle cx="40" cy="28" r="5" fill="#c44" stroke="none"/>' +
        '<rect x="18" y="42" width="28" height="6" rx="2"/>' +
        '<line x1="6" y1="22" x2="14" y2="22"/>' +
        '<line x1="50" y1="22" x2="58" y2="22"/>' +
        '<line x1="6" y1="34" x2="14" y2="34"/>' +
        '<line x1="50" y1="34" x2="58" y2="34"/>' +
        '<path d="M16 54l-4 6h40l-4-6"/>' +
        '<line x1="32" y1="2" x2="32" y2="10"/>' +
        '<circle cx="32" cy="2" r="4" fill="#c44" stroke="none"/>' +
      '</svg>';
    elm.appendChild(icon);

    // HP bar
    var hpPct = maxHp > 0 ? Math.max(0, Math.round((stats.hp / maxHp) * 100)) : 0;
    var hpBar = el('div', 'hp-bar-wrap');
    var barFill = el('div', 'hp-bar-fill');
    barFill.style.width = hpPct + '%';
    if (hpPct <= 25) barFill.classList.add('critical');
    else if (hpPct <= 50) barFill.classList.add('warning');
    hpBar.appendChild(barFill);
    var hpLabel = el('div', 'hp-bar-label', 'HP: ' + Math.max(0, stats.hp) + ' / ' + maxHp);
    hpBar.appendChild(hpLabel);
    elm.appendChild(hpBar);

    // Stats grid
    var statGrid = el('div', 'fighter-stats');
    var keys = [
      ['ATK', 'atk'], ['DEF', 'def'], ['SPD', 'spd'],
      ['ENG', 'eng'], ['RNG', 'rng'],
    ];
    for (var i = 0; i < keys.length; i++) {
      var div = el('div', 'fs-stat');
      div.appendChild(el('div', 'fs-label', keys[i][0]));
      div.appendChild(el('div', 'fs-val', String(stats[keys[i][1]])));
      statGrid.appendChild(div);
    }
    elm.appendChild(statGrid);
  }

  function renderFightHand(pStats, eStats) {
    var hand = document.getElementById('fightHand');
    hand.innerHTML = '';
    if (!gameActive) return;

    for (var i = 0; i < playerActions.length; i++) {
      var a = playerActions[i];
      if (a._played) continue;
      var card = el('div', 'action-card');
      card.appendChild(el('div', 'ac-name', a.name));
      var cost = typeof a.cost === 'number' ? a.cost : 0;
      card.appendChild(el('div', 'ac-cost', 'ENG: ' + cost + ' | ' + (a.category || '')));
      card.addEventListener('click', (function (action, idx) {
        return function () { playAction(idx, pStats, eStats); };
      })(a, i));
      hand.appendChild(card);
    }

    if (hand.children.length === 0 && !playerPassed) {
      hand.appendChild(el('div', 'hand-card', 'No playable cards — pass by waiting for enemy.'));
    }
  }

  function playAction(idx, pStats, eStats) {
    if (!gameActive) return;
    var action = playerActions[idx];
    if (!action || action._played) return;
    var cost = typeof action.cost === 'number' ? action.cost : 0;
    if (pStats.eng < cost) { log('Not enough ENG!', 'you'); return; }

    pStats.eng -= cost;
    action._played = true;

    var dmg = calcDamage(pStats, eStats, action);
    eStats.hp -= dmg;
    log('You play ' + action.name + ' — ' + dmg + ' damage! (ENG: ' + pStats.eng + ')', 'you');
    log('Enemy HP: ' + Math.max(0, eStats.hp), 'enemy');

    renderFighterStats('playerFighterStats', pStats, playerMaxHp, true);
    renderFighterStats('enemyFighterStats', eStats, enemyMaxHp, false);
    renderFightHand(pStats, eStats);

    if (eStats.hp <= 0) {
      endGame('win', pStats, eStats);
      return;
    }

    // Enemy turn
    setTimeout(function () { enemyTurn(pStats, eStats); }, 800);
  }

  function enemyTurn(pStats, eStats) {
    if (!gameActive) return;
    if (eStats.hp <= 0) return;

    // Pick a random unplayed action
    var available = [];
    for (var i = 0; i < enemyActions.length; i++) {
      if (!enemyActions[i]._played) {
        var cost = typeof enemyActions[i].cost === 'number' ? enemyActions[i].cost : 0;
        if (eStats.eng >= cost) available.push(i);
      }
    }

    if (available.length === 0) {
      log('Enemy passes — no playable cards.', 'enemy');
      advanceRound(pStats, eStats);
      return;
    }

    var idx = available[Math.floor(Math.random() * available.length)];
    var action = enemyActions[idx];
    var cost = typeof action.cost === 'number' ? action.cost : 0;
    eStats.eng -= cost;
    action._played = true;

    var dmg = calcDamage(eStats, pStats, action);
    pStats.hp -= dmg;
    log('Enemy plays ' + action.name + ' — ' + dmg + ' damage! (Enemy ENG: ' + eStats.eng + ')', 'enemy');
    log('Your HP: ' + Math.max(0, pStats.hp), 'you');

    renderFighterStats('playerFighterStats', pStats, playerMaxHp, true);
    renderFighterStats('enemyFighterStats', eStats, enemyMaxHp, false);

    if (pStats.hp <= 0) {
      endGame('lose', pStats, eStats);
      return;
    }

    // If both passed or all actions used, advance round
    var pAvail = false;
    for (var j = 0; j < playerActions.length; j++) {
      if (!playerActions[j]._played) {
        var c = typeof playerActions[j].cost === 'number' ? playerActions[j].cost : 0;
        if (pStats.eng >= c) { pAvail = true; break; }
      }
    }
    if (!pAvail && available.length <= 1) {
      advanceRound(pStats, eStats);
    } else {
      renderFightHand(pStats, eStats);
    }
  }

  function calcDamage(attacker, defender, action) {
    var base = attacker.atk;
    // Category bonus
    var cat = String(action.category || '').toLowerCase();
    var bonus = 0;
    if (cat === 'strike') bonus = 5;
    else if (cat === 'weapon') bonus = 3;
    else if (cat === 'precision') bonus = 4;
    else if (cat === 'boost') bonus = 6;
    else bonus = 2;

    var raw = base + bonus;
    var blocked = Math.min(defender.def, Math.floor(raw * 0.5));
    var dmg = Math.max(1, raw - blocked);

    // Range bonus: if attacker out-ranges, +3 damage
    if (attacker.rng > defender.rng) dmg += 3;

    return dmg;
  }

  function advanceRound(pStats, eStats) {
    fightRound++;
    if (fightRound > maxRounds) {
      // Determine winner by HP
      if (pStats.hp > eStats.hp) endGame('win', pStats, eStats);
      else if (eStats.hp > pStats.hp) endGame('lose', pStats, eStats);
      else {
        // Tiebreaker: ENG
        if (pStats.eng > eStats.eng) endGame('win', pStats, eStats);
        else if (eStats.eng > pStats.eng) endGame('lose', pStats, eStats);
        else endGame('draw', pStats, eStats);
      }
      return;
    }

    // Recharge
    pStats.eng += 10;
    eStats.eng += 10;
    log('--- Round ' + fightRound + ' / ' + maxRounds + ' --- +10 ENG each ---', 'you');
    document.getElementById('roundInfo').textContent = 'Round ' + fightRound + ' / ' + maxRounds;
    renderFighterStats('playerFighterStats', pStats, playerMaxHp, true);
    renderFighterStats('enemyFighterStats', eStats, enemyMaxHp, false);
    renderFightHand(pStats, eStats);

    // Determine who goes first this round
    if (pStats.spd >= eStats.spd) {
      log('Your turn — you go first.', 'you');
    } else {
      log('Enemy goes first.', 'enemy');
      setTimeout(function () { enemyTurn(pStats, eStats); }, 1000);
    }
  }

  function log(msg, cls) {
    var logEl = document.getElementById('fightLog');
    var entry = el('div', 'log-entry');
    if (cls) entry.classList.add('log-' + cls);
    entry.textContent = msg;
    logEl.appendChild(entry);
    logEl.scrollTop = logEl.scrollHeight;
  }

  function endGame(result, pStats, eStats) {
    gameActive = false;
    showScreen('gameOver');
    var title = document.getElementById('gameResult');
    var summary = document.getElementById('gameSummary');

    if (result === 'win') {
      title.textContent = '🏆 You Win!';
      title.style.color = '#213F99';
      summary.textContent = 'Your bot stands victorious! Enemy HP: ' + Math.max(0, eStats.hp) + ', Your HP: ' + Math.max(0, pStats.hp);
    } else if (result === 'lose') {
      title.textContent = '💀 You Lose';
      title.style.color = '#c44';
      summary.textContent = 'Your bot was scrapped. Enemy HP: ' + Math.max(0, eStats.hp) + ', Your HP: ' + Math.max(0, pStats.hp);
    } else {
      title.textContent = '🤝 Draw!';
      title.style.color = '#888';
      summary.textContent = 'Both bots still standing. Time for sudden death? Your HP: ' + Math.max(0, pStats.hp) + ', Enemy HP: ' + Math.max(0, eStats.hp);
    }
  }

  // ---- Event bindings ----
  function setupGame() {
    document.getElementById('btnStartGame').addEventListener('click', startGame);
    document.getElementById('btnReveal').addEventListener('click', startFight);
    document.getElementById('btnRedraw').addEventListener('click', function () {
      var normalPool = ASSETS.filter(function (a) { return a.type === 'card' && a.category !== 'God'; });
      var godCard = ASSETS.filter(function (a) { return a.type === 'card' && a.category === 'God'; })[0];
      var drawCount = LEVEL_DRAW[currentLevel];
      playerHand = shuffle(normalPool).slice(0, Math.min(drawCount, normalPool.length));
      if (godCard) {
        for (var g2 = 0; g2 < 5; g2++) {
          if (Math.random() <= 0.99999) {
            playerHand.push(godCard);
          }
        }
      }
      playerAttached = [];
      playerMaterials = [];
      renderBuildScreen();
    });
    document.getElementById('btnPlayAgain').addEventListener('click', function () {
      showScreen('gameStart');
    });

    // Sync level from gallery
    var levelLabel = document.getElementById('gameLevelLabel');
    var updateLevelLabel = function () {
      var lvl = (window._currentLevel || 'crazy');
      var names = { simple: 'Simple — 15 cards', crazy: 'Crazy — 30 cards', chaotic: 'Chaotic — 60 cards' };
      levelLabel.textContent = names[lvl] || names.crazy;
      currentLevel = lvl;
    };
    updateLevelLabel();
    // Poll for level changes (since gallery.js changes it)
    setInterval(function () {
      if (window._currentLevel && window._currentLevel !== currentLevel) {
        currentLevel = window._currentLevel;
        updateLevelLabel();
      }
    }, 500);
  }

  // Expose level to gallery.js
  window._currentLevel = currentLevel;

  // Init when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupGame);
  } else {
    setupGame();
  }
})();
