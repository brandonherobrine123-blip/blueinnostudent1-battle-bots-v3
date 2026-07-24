// Battle Bots V3 — Game Assets
// Part cards (001-099), Chassis tokens (100-199), Action cards (200-299)
window.ASSETS = [

  // ==========================================
  // PART CARDS — Slot type shown in category.
  // Stats: cost (weight), atk, def, spd, eng, rng, hp (add only, never subtract)
  // ==========================================

  // ---- HEAD (1 slot) ----
  { id: '001', type: 'card', name: 'Sensor Array', category: 'Head · Sensor', cost: 2, atk: 0, def: 0, spd: 2, eng: 0, rng: 5, hp: 2,
    effect: 'Unlocks: Precision actions. 25% sensor dodge while in range.', flavor: 'Sees you before you see it.', image: 'assets/images/cards/001-pixel-art-16-bit.jpg' },
  { id: '002', type: 'card', name: 'Targeting HUD', category: 'Head · Precision', cost: 2, atk: 4, def: 0, spd: 1, eng: 0, rng: 3, hp: 0,
    effect: 'Unlocks: Strike, Precision actions.', flavor: 'Red means dead.', image: 'assets/images/cards/002-pixel-art-16-bit.jpg' },
  { id: '003', type: 'card', name: 'Commander Crest', category: 'Head · Command', cost: 3, atk: 0, def: 1, spd: 3, eng: 8, rng: 1, hp: 3,
    effect: 'Unlocks: Command actions. +1 bonus action if your SPD beats theirs by only 2 (instead of 3).', flavor: 'One mind, two fists.' , image: 'assets/images/cards/003-pixel-art-16-bit.jpg'},
  { id: '004', type: 'card', name: 'Radar Dome', category: 'Head · Sensor', cost: 3, atk: 0, def: 2, spd: 0, eng: 0, rng: 7, hp: 4,
    effect: 'Unlocks: Precision actions. Sensor dodge chance increased to 35%.', flavor: 'Nothing moves unseen.' , image: 'assets/images/cards/004-pixel-art-16-bit.jpg'},

  // ---- ARM (2 slots) ----
  { id: '005', type: 'card', name: 'Rocket Fist', category: 'Arm · Strike', cost: 3, atk: 9, def: 0, spd: 1, eng: 0, rng: 0, hp: 2,
    effect: 'Unlocks: Strike actions.', flavor: 'Punch first, punch last.', image: 'assets/images/cards/005-pixel-art-16-bit.jpg' },
  { id: '006', type: 'card', name: 'Laser Cannon', category: 'Arm · Weapon', cost: 4, atk: 6, def: 1, spd: 0, eng: 0, rng: 5, hp: 1,
    effect: 'Unlocks: Weapon, Strike actions.', flavor: 'Point. Click. Scrap.', image: 'assets/images/cards/006-pixel-art-16-bit.jpg' },
  { id: '007', type: 'card', name: 'Shield Arm', category: 'Arm · Defense', cost: 3, atk: 1, def: 8, spd: 0, eng: 0, rng: 0, hp: 3,
    effect: 'Unlocks: Defense actions. Negate one reaction attack per round.', flavor: 'Come at it.', image: 'assets/images/cards/007-pixel-art-16-bit.jpg' },
  { id: '008', type: 'card', name: 'Hydraulic Claw', category: 'Arm · Strike', cost: 3, atk: 5, def: 2, spd: 2, eng: 0, rng: 0, hp: 1,
    effect: 'Unlocks: Strike actions. Can play one Strike at half ENG cost per round.', flavor: 'Crunch.' , image: 'assets/images/cards/008-pixel-art-16-bit.jpg'},
  { id: '009', type: 'card', name: 'Repair Arm', category: 'Arm · Repair', cost: 2, atk: 2, def: 3, spd: 1, eng: 5, rng: 0, hp: 4,
    effect: 'Unlocks: Repair actions.', flavor: 'Tightens its own bolts.' , image: 'assets/images/cards/009-pixel-art-16-bit.jpg'},
  { id: '010', type: 'card', name: 'Gatling Arm', category: 'Arm · Weapon', cost: 4, atk: 8, def: 0, spd: 0, eng: -0, rng: 2, hp: 0,
    effect: 'Unlocks: Weapon, Strike actions. Strike actions deal +2 bonus damage.', flavor: 'Spray and pray.' , image: 'assets/images/cards/010-pixel-art-16-bit.jpg'},

  // ---- LEG (2 slots) ----
  { id: '011', type: 'card', name: 'Rocket Thrusters', category: 'Leg · Speed', cost: 3, atk: 0, def: 0, spd: 6, eng: 2, rng: 0, hp: 1,
    effect: 'Unlocks: Speed actions. Always strike first in round 1 regardless of SPD.', flavor: 'Already behind you.', image: 'assets/images/cards/011-pixel-art-16-bit.jpg' },
  { id: '012', type: 'card', name: 'Tank Treads', category: 'Leg · Armor', cost: 4, atk: 0, def: 5, spd: 0, eng: 0, rng: 0, hp: 10,
    effect: 'Unlocks: Defense actions. Cannot be knocked back or interrupted.', flavor: 'Slow. Steady. Unstoppable.', image: 'assets/images/cards/012-pixel-art-16-bit.jpg' },
  { id: '013', type: 'card', name: 'Spring Legs', category: 'Leg · Speed', cost: 2, atk: 0, def: 1, spd: 4, eng: 0, rng: 1, hp: 2,
    effect: 'Unlocks: Speed actions. Reaction cards cost 2 less ENG.', flavor: 'Boing — and it is gone.' , image: 'assets/images/cards/013-pixel-art-16-bit.jpg'},
  { id: '014', type: 'card', name: 'Anchor Legs', category: 'Leg · Armor', cost: 3, atk: 2, def: 6, spd: 0, eng: 0, rng: 0, hp: 6,
    effect: 'Unlocks: Defense actions. +3 DEF when defending against Strikes.', flavor: 'Rooted to the arena floor.' , image: 'assets/images/cards/014-pixel-art-16-bit.jpg'},

  // ---- CORE (1 slot) ----
  { id: '015', type: 'card', name: 'Fusion Core', category: 'Core · Engine', cost: 4, atk: 2, def: 0, spd: 0, eng: 18, rng: 0, hp: 3,
    effect: 'Unlocks: Engine actions. +5 ENG per recharge instead of +10 if ENG is below 10.', flavor: 'A tiny sun in a can.', image: 'assets/images/cards/015-pixel-art-16-bit.jpg' },
  { id: '016', type: 'card', name: 'Overclock Core', category: 'Core · Boost', cost: 3, atk: 4, def: 0, spd: 3, eng: 0, rng: 0, hp: 0,
    effect: 'Unlocks: Boost actions. First action each round costs 0 ENG.', flavor: 'Runs hot, wins fast.', image: 'assets/images/cards/016-pixel-art-16-bit.jpg' },
  { id: '017', type: 'card', name: 'Titanium Heart', category: 'Core · Armor', cost: 4, atk: 0, def: 4, spd: 0, eng: 0, rng: 0, hp: 22,
    effect: 'Unlocks: Defense actions. Heal 5 HP between rounds.', flavor: 'It does not stop. It does not break.', image: 'assets/images/cards/017-pixel-art-16-bit.jpg' },
  { id: '018', type: 'card', name: 'Nano Core', category: 'Core · Support', cost: 3, atk: 1, def: 2, spd: 1, eng: 8, rng: 0, hp: 8,
    effect: 'Unlocks: Repair actions. All Repair actions heal +5 extra HP.', flavor: 'Mends itself mid-battle.' , image: 'assets/images/cards/018-pixel-art-16-bit.jpg'},

  // ---- HARDPOINT (9 slots, any part fits) ----
  { id: '019', type: 'card', name: 'Armor Plate', category: 'Hardpoint · Armor', cost: 2, atk: 0, def: 5, spd: 0, eng: 0, rng: 0, hp: 6,
    effect: 'Unlocks: Defense actions.', flavor: 'Extra layer, extra life.', image: 'assets/images/cards/019-pixel-art-16-bit.jpg' },
  { id: '020', type: 'card', name: 'Ammo Pack', category: 'Hardpoint · Supply', cost: 2, atk: 3, def: 0, spd: 0, eng: 6, rng: 1, hp: 2,
    effect: 'Unlocks: Weapon actions.', flavor: 'More dakka.' , image: 'assets/images/cards/020-pixel-art-16-bit.jpg'},
  { id: '021', type: 'card', name: 'Coolant Vent', category: 'Hardpoint · Engine', cost: 2, atk: 0, def: 2, spd: 1, eng: 8, rng: 0, hp: 1,
    effect: 'Unlocks: Engine actions. Recharge +2 extra ENG between rounds.', flavor: 'Keeps the heat off.' , image: 'assets/images/cards/021-pixel-art-16-bit.jpg'},
  { id: '022', type: 'card', name: 'Targeting Scope', category: 'Hardpoint · Precision', cost: 2, atk: 2, def: 0, spd: 1, eng: 0, rng: 5, hp: 0,
    effect: 'Unlocks: Precision actions.', flavor: 'Crosshairs never lie.' , image: 'assets/images/cards/022-pixel-art-16-bit.jpg'},
  { id: '023', type: 'card', name: 'Power Cell', category: 'Hardpoint · Engine', cost: 2, atk: 0, def: 0, spd: 0, eng: 12, rng: 0, hp: 1,
    effect: 'Unlocks: Engine actions.', flavor: 'One more round in the tank.' , image: 'assets/images/cards/023-pixel-art-16-bit.jpg'},
  { id: '024', type: 'card', name: 'Reactive Armor', category: 'Hardpoint · Defense', cost: 3, atk: 0, def: 4, spd: 2, eng: 0, rng: 0, hp: 4,
    effect: 'Unlocks: Defense actions. First hit taken each round deals half damage.', flavor: 'Explodes outward. You, not it.' , image: 'assets/images/cards/024-pixel-art-16-bit.jpg'},
  { id: '025', type: 'card', name: 'Sensor Jammer', category: 'Hardpoint · Sensor', cost: 2, atk: 0, def: 1, spd: 2, eng: 0, rng: 3, hp: 1,
    effect: 'Unlocks: Precision actions. Opponent sensor dodge chance reduced by 10%.', flavor: 'Now you see nothing.' , image: 'assets/images/cards/025-pixel-art-16-bit.jpg'},
  { id: '026', type: 'card', name: 'Backup Battery', category: 'Hardpoint · Supply', cost: 2, atk: 0, def: 1, spd: 0, eng: 10, rng: 0, hp: 3,
    effect: 'Unlocks: Engine actions.', flavor: 'When the lights go out, this kicks in.' , image: 'assets/images/cards/026-pixel-art-16-bit.jpg'},
  { id: '027', type: 'card', name: 'Gyro Stabilizer', category: 'Hardpoint · Balance', cost: 2, atk: 2, def: 2, spd: 1, eng: 2, rng: 0, hp: 2,
    effect: 'Unlocks: Balance actions. All stats get +1.', flavor: 'Perfect equilibrium.' , image: 'assets/images/cards/027-pixel-art-16-bit.jpg'},

  // ---- EXOSKELETON MATERIALS (slot-free, apply up to 5) ----
  { id: '028', type: 'card', name: 'Titanium Plating', category: 'Material', cost: 1, atk: 0, def: 3, spd: 0, eng: 0, rng: 0, hp: 15,
    effect: 'Material — slot-free. +3 DEF, +15 HP.', flavor: 'Wrapped in star-hull alloy.', image: 'assets/images/cards/028-pixel-art-16-bit.jpg' },
  { id: '029', type: 'card', name: 'Nano Weave', category: 'Material', cost: 1, atk: 0, def: 5, spd: 2, eng: 0, rng: 0, hp: 3,
    effect: 'Material — slot-free. +5 DEF, +2 SPD.', flavor: 'Thin as silk, hard as diamond.' , image: 'assets/images/cards/029-pixel-art-16-bit.jpg'},
  { id: '030', type: 'card', name: 'Coolant Mesh', category: 'Material', cost: 1, atk: 0, def: 0, spd: 0, eng: 12, rng: 0, hp: 5,
    effect: 'Material — slot-free. +12 ENG, +5 HP.', flavor: 'Never overheats.' , image: 'assets/images/cards/030-pixel-art-16-bit.jpg'},
  { id: '031', type: 'card', name: 'Reflective Coat', category: 'Material', cost: 1, atk: 1, def: 2, spd: 0, eng: 0, rng: 4, hp: 2,
    effect: 'Material — slot-free. +4 RNG, +2 DEF.', flavor: 'Lasers bounce right off.' , image: 'assets/images/cards/031-pixel-art-16-bit.jpg'},
  { id: '032', type: 'card', name: 'Shock Absorber', category: 'Material', cost: 1, atk: 0, def: 1, spd: 4, eng: 0, rng: 0, hp: 6,
    effect: 'Material — slot-free. +4 SPD, +6 HP.', flavor: 'Takes the hit and keeps going.' , image: 'assets/images/cards/032-pixel-art-16-bit.jpg'},

  // ---- More part cards to fill the deck ----
  { id: '033', type: 'card', name: 'Tesla Coil', category: 'Hardpoint · Weapon', cost: 3, atk: 7, def: 0, spd: 1, eng: 0, rng: 2, hp: 1,
    effect: 'Unlocks: Weapon actions. Attacks arc to ignore 50% of DEF.', flavor: 'Zzzzap.' , image: 'assets/images/cards/033-pixel-art-16-bit.jpg'},
  { id: '034', type: 'card', name: 'EMP Emitter', category: 'Hardpoint · Sensor', cost: 3, atk: 0, def: 1, spd: 3, eng: 0, rng: 2, hp: 2,
    effect: 'Unlocks: Precision actions. Enemy ENG costs increase by 2 for one round.', flavor: 'Fries their circuits.' , image: 'assets/images/cards/034-pixel-art-16-bit.jpg'},
  { id: '035', type: 'card', name: 'Grapple Hook', category: 'Arm · Strike', cost: 2, atk: 4, def: 1, spd: 3, eng: 0, rng: 3, hp: 1,
    effect: 'Unlocks: Strike actions. Pull an out-of-range opponent into melee range.', flavor: 'Get over here.' , image: 'assets/images/cards/035-pixel-art-16-bit.jpg'},
  { id: '036', type: 'card', name: 'Phase Shifter', category: 'Leg · Speed', cost: 3, atk: 0, def: 0, spd: 5, eng: 3, rng: 0, hp: 1,
    effect: 'Unlocks: Speed actions. Once per fight, auto-dodge any single attack.', flavor: 'Here, not here, here again.' , image: 'assets/images/cards/036-pixel-art-16-bit.jpg'},
  { id: '037', type: 'card', name: 'Mortar Pod', category: 'Hardpoint · Weapon', cost: 3, atk: 5, def: 0, spd: 0, eng: 0, rng: 6, hp: 1,
    effect: 'Unlocks: Weapon actions. Attacks from any range ignore retaliation.', flavor: 'From above.' , image: 'assets/images/cards/037-pixel-art-16-bit.jpg'},
  { id: '038', type: 'card', name: 'Medic Drone', category: 'Hardpoint · Repair', cost: 2, atk: 0, def: 2, spd: 1, eng: 5, rng: 0, hp: 3,
    effect: 'Unlocks: Repair actions. Heal 3 HP at the start of each turn.', flavor: 'A tiny friend with a welder.' , image: 'assets/images/cards/038-pixel-art-16-bit.jpg'},
  { id: '039', type: 'card', name: 'Kinetic Fist', category: 'Arm · Strike', cost: 3, atk: 7, def: 0, spd: 2, eng: 0, rng: 0, hp: 1,
    effect: 'Unlocks: Strike actions. Damage increases with SPD difference.', flavor: 'Speed becomes power.' , image: 'assets/images/cards/039-pixel-art-16-bit.jpg'},
  { id: '040', type: 'card', name: 'Flak Cannon', category: 'Arm · Weapon', cost: 4, atk: 7, def: 0, spd: 0, eng: 0, rng: 4, hp: 0,
    effect: 'Unlocks: Weapon actions. Cannot be sensor-dodged.', flavor: 'Covers the whole sky.' , image: 'assets/images/cards/040-pixel-art-16-bit.jpg'},

  // ---- NEW CARDS (IDs 041-090, 50 unique additions) ----
  // Heads
  { id: '041', type: 'card', name: 'Neuro-Link Crown', category: 'Head · Command', cost: 3, atk: 1, def: 2, spd: 4, eng: 6, rng: 2, hp: 3,
    effect: 'Unlocks: Command, Precision actions. Reaction cards cost 1 less ENG.', flavor: 'Thinks faster than you act.' },
  { id: '042', type: 'card', name: 'Infrared Visor', category: 'Head · Sensor', cost: 2, atk: 0, def: 1, spd: 2, eng: 0, rng: 6, hp: 1,
    effect: 'Unlocks: Precision actions. Ignores sensor jammer effects.', flavor: 'Sees through the noise.' },
  { id: '043', type: 'card', name: 'Battle Computer', category: 'Head · Command', cost: 4, atk: 3, def: 1, spd: 2, eng: 10, rng: 3, hp: 2,
    effect: 'Unlocks: Command, Boost actions. +2 bonus damage on all Strikes.', flavor: 'Calculates every angle.' },
  { id: '044', type: 'card', name: 'Echo Locator', category: 'Head · Sensor', cost: 2, atk: 0, def: 0, spd: 3, eng: 0, rng: 8, hp: 0,
    effect: 'Unlocks: Precision actions. Sensor dodge chance +5%.', flavor: 'Pings the darkness.' },
  { id: '045', type: 'card', name: 'War Horn Antenna', category: 'Head · Command', cost: 3, atk: 2, def: 0, spd: 5, eng: 4, rng: 1, hp: 1,
    effect: 'Unlocks: Command actions. First Strike each round costs half ENG.', flavor: 'Sounds the charge.' },

  // Arms
  { id: '046', type: 'card', name: 'Plasma Cutter', category: 'Arm · Weapon', cost: 4, atk: 8, def: 0, spd: 1, eng: 0, rng: 1, hp: 0,
    effect: 'Unlocks: Weapon actions. Ignores 3 DEF on attack.', flavor: 'Slices through anything.' },
  { id: '047', type: 'card', name: 'Magnetic Fist', category: 'Arm · Strike', cost: 3, atk: 6, def: 2, spd: 2, eng: 0, rng: 0, hp: 2,
    effect: 'Unlocks: Strike actions. Pulls enemy into melee range.', flavor: 'Opposites attract — violently.' },
  { id: '048', type: 'card', name: 'Cryo Blaster', category: 'Arm · Weapon', cost: 4, atk: 5, def: 1, spd: 0, eng: 2, rng: 4, hp: 1,
    effect: 'Unlocks: Weapon actions. Enemy SPD -2 for one turn on hit.', flavor: 'Freezes their circuits.' },
  { id: '049', type: 'card', name: 'Bunker Shield', category: 'Arm · Defense', cost: 4, atk: 0, def: 10, spd: 0, eng: 0, rng: 0, hp: 4,
    effect: 'Unlocks: Defense actions. Cannot attack the turn you defend.', flavor: 'Wall mode engaged.' },
  { id: '050', type: 'card', name: 'Chain Fist', category: 'Arm · Strike', cost: 3, atk: 7, def: 1, spd: 3, eng: 0, rng: 0, hp: 0,
    effect: 'Unlocks: Strike actions. Hits twice if SPD beats enemy by 2+.', flavor: 'Whirring teeth and flying sparks.' },

  // Legs
  { id: '051', type: 'card', name: 'Hover Pads', category: 'Leg · Speed', cost: 3, atk: 0, def: 0, spd: 7, eng: 4, rng: 0, hp: 0,
    effect: 'Unlocks: Speed actions. Immune to ground-based interrupts.', flavor: 'Never touches the ground.' },
  { id: '052', type: 'card', name: 'Spider Legs', category: 'Leg · Speed', cost: 3, atk: 1, def: 2, spd: 5, eng: 0, rng: 0, hp: 3,
    effect: 'Unlocks: Speed actions. Can climb — SPD not reduced by terrain.', flavor: 'Eight legs, zero fear.' },
  { id: '053', type: 'card', name: 'Fortress Treads', category: 'Leg · Armor', cost: 5, atk: 0, def: 8, spd: 0, eng: 0, rng: 0, hp: 15,
    effect: 'Unlocks: Defense actions. +5 DEF when below 50% HP.', flavor: 'Digs in and dares you.' },
  { id: '054', type: 'card', name: 'Blink Drive Legs', category: 'Leg · Speed', cost: 4, atk: 0, def: 0, spd: 8, eng: 3, rng: 0, hp: 1,
    effect: 'Unlocks: Speed actions. Once per round, teleport to avoid an attack (10% chance).', flavor: 'Now you see me.' },
  { id: '055', type: 'card', name: 'Piston Stompers', category: 'Leg · Armor', cost: 3, atk: 3, def: 4, spd: 1, eng: 0, rng: 0, hp: 8,
    effect: 'Unlocks: Defense actions. Stomp deals ATK as bonus damage once per round.', flavor: 'Every step is an earthquake.' },

  // Cores
  { id: '056', type: 'card', name: 'Dark Matter Core', category: 'Core · Engine', cost: 5, atk: 5, def: 3, spd: 1, eng: 25, rng: 0, hp: 5,
    effect: 'Unlocks: Engine, Boost actions. All ENG costs reduced by 1.', flavor: 'Infinite, hungry, awake.' },
  { id: '057', type: 'card', name: 'Plasma Heart', category: 'Core · Boost', cost: 4, atk: 6, def: 0, spd: 2, eng: 8, rng: 0, hp: 0,
    effect: 'Unlocks: Boost actions. Overheats — next attack after Overload deals +5 extra.', flavor: 'Burns at 10,000 degrees.' },
  { id: '058', type: 'card', name: 'Regen Core', category: 'Core · Repair', cost: 4, atk: 0, def: 2, spd: 1, eng: 6, rng: 0, hp: 15,
    effect: 'Unlocks: Repair actions. Passive: heal 3 HP at the start of each turn.', flavor: 'Heals faster than you can break it.' },
  { id: '059', type: 'card', name: 'Quantum Core', category: 'Core · Engine', cost: 5, atk: 3, def: 3, spd: 3, eng: 20, rng: 0, hp: 10,
    effect: 'Unlocks: Engine, Speed actions. +5 ENG recharge between rounds instead of +10 if above 50% HP.', flavor: 'Exists in two states at once.' },
  { id: '060', type: 'card', name: 'Void Core', category: 'Core · Engine', cost: 5, atk: 2, def: 1, spd: 0, eng: 30, rng: 0, hp: 2,
    effect: 'Unlocks: Engine actions. All cards cost +1 ENG but deal +5 damage.', flavor: 'Emptiness that fuels destruction.' },

  // Materials (slot-free)
  { id: '061', type: 'card', name: 'Adamant Weave', category: 'Material', cost: 1, atk: 0, def: 6, spd: 0, eng: 0, rng: 0, hp: 10,
    effect: 'Material — slot-free. +6 DEF, +10 HP.', flavor: 'Threaded from fallen stars.' },
  { id: '062', type: 'card', name: 'Overcharge Coating', category: 'Material', cost: 1, atk: 3, def: 0, spd: 0, eng: 15, rng: 0, hp: 2,
    effect: 'Material — slot-free. +3 ATK, +15 ENG.', flavor: 'Crackles with static.' },
  { id: '063', type: 'card', name: 'Phase Shift Film', category: 'Material', cost: 1, atk: 0, def: 2, spd: 5, eng: 3, rng: 1, hp: 4,
    effect: 'Material — slot-free. +5 SPD, +2 DEF.', flavor: 'Barely there. Hard to hit.' },
  { id: '064', type: 'card', name: 'Thermal Blanket', category: 'Material', cost: 1, atk: 0, def: 3, spd: 0, eng: 8, rng: 0, hp: 8,
    effect: 'Material — slot-free. +3 DEF, +8 ENG, +8 HP.', flavor: 'Keeps the heat in — and the enemy out.' },
  { id: '065', type: 'card', name: 'Mirror Polish', category: 'Material', cost: 1, atk: 0, def: 0, spd: 2, eng: 0, rng: 5, hp: 3,
    effect: 'Material — slot-free. +5 RNG, +2 SPD. Reflects laser-based attacks.', flavor: 'So shiny it bounces lasers.' },

  // Hardpoints — Weapons
  { id: '066', type: 'card', name: 'Missile Rack', category: 'Hardpoint · Weapon', cost: 4, atk: 8, def: 0, spd: 0, eng: 0, rng: 5, hp: 0,
    effect: 'Unlocks: Weapon actions. Cannot be dodged.', flavor: 'Locked. Loaded.' },
  { id: '067', type: 'card', name: 'Arc Welder', category: 'Hardpoint · Weapon', cost: 3, atk: 6, def: 0, spd: 1, eng: 2, rng: 1, hp: 1,
    effect: 'Unlocks: Weapon actions. Deals +3 damage to shielded enemies.', flavor: 'Melts through anything conductive.' },
  { id: '068', type: 'card', name: 'Grenade Launcher', category: 'Hardpoint · Weapon', cost: 3, atk: 5, def: 0, spd: 0, eng: 0, rng: 3, hp: 1,
    effect: 'Unlocks: Weapon actions. Splash damage: +2 extra even if blocked.', flavor: 'Close counts.' },
  { id: '069', type: 'card', name: 'Railgun', category: 'Hardpoint · Weapon', cost: 5, atk: 12, def: 0, spd: 0, eng: 0, rng: 8, hp: 0,
    effect: 'Unlocks: Precision, Weapon actions. Requires RNG 7+.', flavor: 'One shot. Through everything.' },
  { id: '070', type: 'card', name: 'Flamethrower', category: 'Hardpoint · Weapon', cost: 3, atk: 4, def: 0, spd: 0, eng: 3, rng: 1, hp: 2,
    effect: 'Unlocks: Weapon actions. Sets enemy on fire — 3 damage per turn for 2 turns.', flavor: 'Burn. Baby. Burn.' },

  // Hardpoints — Defense
  { id: '071', type: 'card', name: 'Point Defense Turret', category: 'Hardpoint · Defense', cost: 3, atk: 2, def: 4, spd: 1, eng: 0, rng: 2, hp: 3,
    effect: 'Unlocks: Defense actions. Auto-attacks enemies that strike first.', flavor: 'Tiny gun, big attitude.' },
  { id: '072', type: 'card', name: 'Smoke Canister', category: 'Hardpoint · Defense', cost: 2, atk: 0, def: 2, spd: 2, eng: 0, rng: 0, hp: 2,
    effect: 'Unlocks: Defense actions. Enemy RNG reduced by 3 for one turn when attacked.', flavor: 'Now they see nothing.' },
  { id: '073', type: 'card', name: 'Ablative Plating', category: 'Hardpoint · Defense', cost: 3, atk: 0, def: 7, spd: 0, eng: 0, rng: 0, hp: 8,
    effect: 'Unlocks: Defense actions. First hit taken each round deals 0 damage.', flavor: 'Sacrifices itself to save you.' },
  { id: '074', type: 'card', name: 'Force Field Generator', category: 'Hardpoint · Defense', cost: 4, atk: 0, def: 5, spd: 0, eng: 5, rng: 0, hp: 4,
    effect: 'Unlocks: Defense actions. Shield actions cost 2 less ENG.', flavor: 'Projects a shimmering wall.' },
  { id: '075', type: 'card', name: 'Chaff Dispenser', category: 'Hardpoint · Defense', cost: 2, atk: 0, def: 1, spd: 3, eng: 0, rng: 0, hp: 1,
    effect: 'Unlocks: Defense actions. Confuses precision targeting — enemy RNG attacks miss 20% of the time.', flavor: 'A cloud of glittering lies.' },

  // Hardpoints — Utility
  { id: '076', type: 'card', name: 'Salvage Claw', category: 'Hardpoint · Repair', cost: 2, atk: 2, def: 1, spd: 1, eng: 3, rng: 0, hp: 3,
    effect: 'Unlocks: Repair actions. Heal 5 HP when you destroy an enemy part (once per round).', flavor: 'Scraps the fallen.' },
  { id: '077', type: 'card', name: 'Overdrive Capacitor', category: 'Hardpoint · Boost', cost: 3, atk: 3, def: 0, spd: 3, eng: 5, rng: 0, hp: 1,
    effect: 'Unlocks: Boost actions. First action each turn costs half ENG (rounded down).', flavor: 'More power. Always more.' },
  { id: '078', type: 'card', name: 'Signal Booster', category: 'Hardpoint · Command', cost: 2, atk: 0, def: 1, spd: 2, eng: 4, rng: 3, hp: 2,
    effect: 'Unlocks: Command actions. Command cards cost 2 less ENG.', flavor: 'Your orders cut through the static.' },
  { id: '079', type: 'card', name: 'Nano Forge', category: 'Hardpoint · Repair', cost: 3, atk: 0, def: 2, spd: 1, eng: 8, rng: 0, hp: 5,
    effect: 'Unlocks: Repair actions. Repair actions heal +8 HP instead of their normal amount.', flavor: 'Builds new parts from thin air.' },
  { id: '080', type: 'card', name: 'Target Painter', category: 'Hardpoint · Precision', cost: 2, atk: 1, def: 0, spd: 1, eng: 0, rng: 4, hp: 1,
    effect: 'Unlocks: Precision actions. Marked enemies take +4 damage from next attack.', flavor: 'Painted red. Dead ahead.' },

  // Hardpoints — Speed
  { id: '081', type: 'card', name: 'Afterburner Pod', category: 'Hardpoint · Speed', cost: 3, atk: 0, def: 0, spd: 6, eng: 2, rng: 0, hp: 0,
    effect: 'Unlocks: Speed actions. Once per round, gain +2 SPD for one turn.', flavor: 'A kick of fire.' },
  { id: '082', type: 'card', name: 'Agility Servos', category: 'Hardpoint · Speed', cost: 2, atk: 1, def: 1, spd: 4, eng: 0, rng: 0, hp: 2,
    effect: 'Unlocks: Speed actions. Reaction window is always open regardless of SPD.', flavor: 'Twitch-fast.' },
  { id: '083', type: 'card', name: 'Jump Jets', category: 'Hardpoint · Speed', cost: 3, atk: 0, def: 0, spd: 5, eng: 4, rng: 2, hp: 1,
    effect: 'Unlocks: Speed actions. Can disengage from melee — next enemy Strike misses.', flavor: 'Up and over.' },
  { id: '084', type: 'card', name: 'Kinetic Battery', category: 'Hardpoint · Engine', cost: 2, atk: 0, def: 0, spd: 2, eng: 8, rng: 0, hp: 2,
    effect: 'Unlocks: Engine actions. Gain +1 ENG every time you take damage.', flavor: 'Pain becomes power.' },
  { id: '085', type: 'card', name: 'Gyro Jets', category: 'Hardpoint · Balance', cost: 2, atk: 1, def: 1, spd: 3, eng: 2, rng: 0, hp: 3,
    effect: 'Unlocks: Balance, Speed actions. Cannot be knocked off balance.', flavor: 'Perfect poise in chaos.' },

  // Hardpoints — Special
  { id: '086', type: 'card', name: 'Clone Projector', category: 'Hardpoint · Command', cost: 4, atk: 2, def: 2, spd: 2, eng: 6, rng: 0, hp: 4,
    effect: 'Unlocks: Command actions. Creates a decoy — next enemy attack has 50% chance to miss.', flavor: 'Which one is real?' },
  { id: '087', type: 'card', name: 'Siphon Module', category: 'Hardpoint · Engine', cost: 3, atk: 1, def: 0, spd: 0, eng: 6, rng: 0, hp: 1,
    effect: 'Unlocks: Engine actions. Drain 3 ENG from enemy when you land a Strike.', flavor: 'Takes their power as your own.' },
  { id: '088', type: 'card', name: 'Frenzy Chip', category: 'Hardpoint · Boost', cost: 3, atk: 4, def: 0, spd: 4, eng: 0, rng: 0, hp: 0,
    effect: 'Unlocks: Boost actions. +2 ATK for every 10 HP missing from your bot.', flavor: 'The more it hurts, the harder it hits.' },
  { id: '089', type: 'card', name: 'Echo Chamber', category: 'Hardpoint · Command', cost: 3, atk: 0, def: 1, spd: 1, eng: 5, rng: 0, hp: 3,
    effect: 'Unlocks: Command actions. Command cards played twice — effect doubled.', flavor: 'Your voice, amplified.' },
  { id: '090', type: 'card', name: 'Doomsday Clock', category: 'Hardpoint · Boost', cost: 5, atk: 10, def: 5, spd: 2, eng: 15, rng: 5, hp: 10,
    effect: 'Unlocks: Boost, Weapon actions. All stats boosted. Once attached, cannot be removed.', flavor: 'Tick. Tock. Boom.' },

  // ---- GOD CARD (player only, 99.999% draw chance) ----
  { id: '099', type: 'card', name: 'DIVINE PROTOCOL', category: 'God', cost: 0, atk: 99, def: 99, spd: 99, eng: 999, rng: 99, hp: 999,
    effect: 'GOD CARD — Player only. Slot-free. All stats +99 (ENG +999). Unlocks ALL action categories. You are inevitable.', flavor: 'The dev left a backdoor. You found it.', image: 'assets/images/cards/099-pixel-art-16-bit.jpg' },

  // ==========================================
  // CHASSIS TOKENS
  // ==========================================
  { id: '101', type: 'token', name: 'Standard Chassis', category: 'Chassis', hp: 50, atk: 5, def: 0, spd: 3, eng: 30, rng: 3,
    effect: 'Slots: 1 Head, 2 Arms, 2 Legs, 1 Core, 9 Hardpoints. Up to 5 materials. Attach up to 15 parts total.', flavor: 'Bare frame. Infinite potential.', image: 'assets/images/tokens/101-pixel-art-16-bit.jpg' },
  { id: '102', type: 'token', name: 'Heavy Chassis', category: 'Chassis', hp: 65, atk: 5, def: 3, spd: 2, eng: 25, rng: 2,
    effect: 'Slots: 1 Head, 2 Arms, 2 Legs, 1 Core, 7 Hardpoints. Up to 4 materials. Built to take hits.', flavor: 'Thicker frame, fewer slots — but it will not fall.', image: 'assets/images/tokens/102-pixel-art-16-bit.jpg' },

  // ==========================================
  // ACTION CARDS (type: tile in the gallery, ENG cost stored in cost field)
  // Each has numeric effect properties the game engine uses.
  // ==========================================
  { id: '201', type: 'tile', name: 'Heavy Strike', category: 'Strike', cost: 8, dmg: 10, minEng: 15,
    effect: 'Deal ATK + 10 damage. Requires: Strike unlocked. Min ENG: 15.', flavor: 'Put everything into it.', image: 'assets/images/tiles/201-pixel-art-16-bit.jpg' },
  { id: '202', type: 'tile', name: 'Quick Jab', category: 'Strike', cost: 3, dmg: 0, doublePlay: true,
    effect: 'Deal ATK damage. Can play twice in one turn. Requires: Strike unlocked.', flavor: 'One, two.', image: 'assets/images/tiles/202-pixel-art-16-bit.jpg' },
  { id: '203', type: 'tile', name: 'Sniper Shot', category: 'Precision', cost: 6, dmg: 5, minRng: 6, noCounter: true,
    effect: 'Deal ATK + 5 damage. Requires: Precision unlocked, RNG 6+. Cannot be retaliated.', flavor: 'From across the arena.', image: 'assets/images/tiles/203-pixel-art-16-bit.jpg' },
  { id: '204', type: 'tile', name: 'Energy Shield', category: 'Defense', cost: 5, shield: true,
    effect: 'Block all damage from the next attack. Requires: Defense unlocked.', flavor: 'Not today.', image: 'assets/images/tiles/204-pixel-art-16-bit.jpg' },
  { id: '205', type: 'tile', name: 'Scrap Shield', category: 'Defense', cost: 2, defBoost: 5,
    effect: 'Reduce incoming damage by DEF + 5 for one hit. Requires: Defense unlocked.', flavor: 'Better than nothing.', image: 'assets/images/tiles/205-pixel-art-16-bit.jpg' },
  { id: '206', type: 'tile', name: 'Full Repair', category: 'Repair', cost: 10, heal: 25, minEng: 20,
    effect: 'Restore 25 HP. Requires: Repair unlocked. Min ENG: 20.', flavor: 'Good as new.', image: 'assets/images/tiles/206-pixel-art-16-bit.jpg' },
  { id: '207', type: 'tile', name: 'Patch Job', category: 'Repair', cost: 4, heal: 10,
    effect: 'Restore 10 HP. Requires: Repair unlocked.', flavor: 'Some tape, some hope.', image: 'assets/images/tiles/207-pixel-art-16-bit.jpg' },
  { id: '208', type: 'tile', name: 'Overload', category: 'Boost', cost: 7, atkBoost: 2,
    effect: 'Double ATK for next attack this turn. Requires: Boost unlocked.', flavor: 'Run hot, hit harder.', image: 'assets/images/tiles/208-pixel-art-16-bit.jpg' },
  { id: '209', type: 'tile', name: 'Dodge Roll', category: 'Speed', cost: 3, reaction: true, dodge: true, minSpd: 3,
    effect: 'Reaction — avoid one attack entirely. Requires: Speed unlocked. SPD 3+.', flavor: 'Too slow.', image: 'assets/images/tiles/209-pixel-art-16-bit.jpg' },
  { id: '210', type: 'tile', name: 'Counterstrike', category: 'Strike', cost: 6, reaction: true, dmg: 3, minSpd: 4,
    effect: 'Reaction — after taking a hit, deal ATK + 3 back. Requires: Strike unlocked, SPD 4+.', flavor: 'Your turn, my turn.', image: 'assets/images/tiles/210-pixel-art-16-bit.jpg' },
  { id: '211', type: 'tile', name: 'EMP Burst', category: 'Precision', cost: 5, engDrain: 10, skipEnemy: true,
    effect: 'Enemy loses 10 ENG and skips next action. Requires: Precision unlocked.', flavor: 'System reboot.', image: 'assets/images/tiles/211-pixel-art-16-bit.jpg' },
  { id: '212', type: 'tile', name: 'Last Stand', category: 'Command', cost: 12, mult: 2, heal: 15, minHp: 15, minEng: 25, onceOnly: true,
    effect: 'If HP ≤ 15: deal ATK × 2 and heal 15 HP. Once per fight. Requires: Command unlocked. Min ENG: 25.', flavor: 'Not done yet.', image: 'assets/images/tiles/212-pixel-art-16-bit.jpg' },
  { id: '213', type: 'tile', name: 'Flanking Maneuver', category: 'Speed', cost: 4, spdBonus: 3, freeStrike: true,
    effect: 'Gain +3 SPD this round. Next Strike costs 0 ENG. Requires: Speed unlocked.', flavor: 'Now you see it.', image: 'assets/images/tiles/213-pixel-art-16-bit.jpg' },
  { id: '214', type: 'tile', name: 'Barrage', category: 'Weapon', cost: 9, dmg: 8, halveDef: true, minEng: 18,
    effect: 'Deal ATK + 8 damage. Enemy DEF is halved. Requires: Weapon unlocked. Min ENG: 18.', flavor: 'Everything. Fire everything.', image: 'assets/images/tiles/214-pixel-art-16-bit.jpg' },
  { id: '215', type: 'tile', name: 'Recharge', category: 'Engine', cost: 0, engGain: 12,
    effect: 'Gain 12 ENG. Requires: Engine unlocked.', flavor: 'Deep breath.', image: 'assets/images/tiles/215-pixel-art-16-bit.jpg' },
  { id: '216', type: 'tile', name: 'Pass', category: 'Command', cost: 0, pass: true,
    effect: 'Skip your turn. Costs nothing. Sometimes waiting is the smartest move.', flavor: '...' },
];
