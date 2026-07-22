# Battle Bots V3 — Design Spec

**Title:** Battle Bots V3
**Date:** 2026-07-22
**Status:** Approved

---

## Theme & Overview

Two rival engineers secretly build scrap-metal battle bots, then reveal them and fight in a 3-round arena brawl. The surprise reveal is the heart of the game — you size up the opponent's build only after both bots are complete.

### Game flow

1. **Build** (secret): Draw 30 part cards from a shared deck, attach as many as your chassis allows, layer on exoskeleton materials.
2. **Reveal**: Both bots hit the table simultaneously.
3. **Fight** (up to 3 rounds): Alternating action card plays from a hand drawn before round 1. First knockout wins; otherwise highest HP after round 3.

### Constraints

- Printable on paper
- Teach in 2 minutes
- No art required (placeholder images only)
- Single shared deck for parts, single shared deck for actions

---

## Chassis

Each player gets one bot chassis token with baseline stats:

| Stat | Base value | Notes |
|------|-----------|-------|
| HP   | 50        | Hit zero = knockout, fight ends immediately |
| ATK  | 5         | Base damage dealt per attack |
| DEF  | 0         | Damage blocked from each incoming hit |
| SPD  | 3         | Determines turn order, combo actions, reaction eligibility |
| ENG  | 30        | Spent to play action cards; +10 recharge between rounds |
| RNG  | 3         | Unlocks ranged cards, safe poke, sensor dodge |

### Slots

- **6 named slots:** 1 Head, 1 Core, 2 Arms, 2 Legs
- **9 hardpoints:** Free slots — any part fits here
- **Total capacity:** 15 parts maximum attached

Parts must match their slot type to be attached (an Arm part requires an Arm slot). Hardpoint parts go anywhere. A player may attach fewer than 15 if their draw doesn't fill all slots.

---

## Build Phase

### Shared part deck

One deck of 60+ part cards, including exoskeleton materials. Each player draws 30 cards in secret.

### Part cards

Each part card shows:
- **Slot type** (Head, Arm, Leg, Core, Hardpoint)
- **Stat boosts** — adds to one or more of the 6 stats (ATK, DEF, SPD, ENG, RNG, HP). Parts only add, never subtract. A card may add 0 to some stats — focused boost, not a penalty.
- **Action category unlock** — determines which action cards this bot can use in combat (e.g., an Arm part with "Weapon" tag unlocks Strike-type actions)

### Exoskeleton materials

5 of the 30 drawn cards are materials. These are slot-free — they modify the chassis itself. A bot may have up to 5 materials active. Examples: "Titanium Plating" (+HP), "Coolant Weave" (+ENG), "Nano-Coating" (+DEF). Materials are mixed into the shared part deck, not separate.

### Assembly

1. Draw 30 cards from the shared part deck (done in secret from opponent)
2. Attach up to 15 slotted parts (matching slot types)
3. Apply up to 5 exoskeleton materials (slot-free)
4. Calculate final stats by summing chassis baseline + all attached parts + all materials
5. Reveal both bots simultaneously

---

## Fight Phase

### Action deck

Shared deck of 30+ action cards. Before round 1, each player draws 15 action cards. This hand must last all 3 rounds — manage it carefully.

### Action cards

Each action card shows:
- **Category tag** — e.g., Strike, Defense, Repair, Reaction. Parts unlock which categories you can use.
- **ENG cost** — spent from your ENG pool when played
- **ENG threshold** — minimum ENG required to use the card (some powerful cards gate behind high ENG)
- **Effect** — what it does (damage, block, heal, counter, etc.)

### Round structure

Up to 3 rounds. Within each round:
1. Higher SPD plays first (initiative).
2. Players alternate playing one action card each.
3. Continue until both pass or both run out of playable/affordable actions.
4. Round ends. Both bots gain +10 ENG. Next round begins.

### Combat stat reference

| Stat | Role in combat |
|------|---------------|
| **HP** | Life total. Hit zero = knockout, fight ends immediately. |
| **ATK** | Base damage per attack. Action cards may multiply or add to this. |
| **DEF** | Damage reduced from each incoming hit. |
| **SPD** | **(1) Initiative:** higher SPD plays first each round. **(2) Combo actions:** if your SPD exceeds the opponent's by 3+, you gain one bonus action per round. **(3) Reactions:** once per round, you can play a Reaction action card during the opponent's turn — but only if your SPD is equal to or higher than theirs. |
| **ENG** | **(1) Action cost:** every action card costs ENG to play. Run out = can only pass. **(2) Threshold gating:** some cards require a minimum ENG to use. **(3) Recharge:** +10 ENG between rounds. |
| **RNG** | **(1) Card gating:** some attack cards require a minimum RNG to play. **(2) Safe poke:** if your RNG exceeds the opponent's, your attack lands without retaliation that turn. **(3) Sensor dodge:** sensory-type equipment grants a 25% chance to auto-dodge any attack originating from within your range. |

---

## Win Condition

1. **Knockout** — reduce opponent's bot HP to 0 at any time. Fight ends immediately.
2. **HP victory** — if both bots survive 3 full rounds, highest remaining HP wins.
3. **Tiebreaker A** — if HP is equal after round 3, higher remaining ENG wins.
4. **Tiebreaker B** — if both HP and ENG are equal, sudden death: one more round, first hit wins.

---

## Pieces Summary

| Piece | Type | Count | Notes |
|-------|------|-------|-------|
| Chassis token | Token | 2+ | Base stats + slot layout printed on it |
| Part cards | Card | 60+ | Shared deck. Includes Head, Arm, Leg, Core, Hardpoint types |
| Exoskeleton materials | Card | Mixed into part deck | 5 per player usable, slot-free buffs |
| Action cards | Card | 30+ | Shared deck. 15 drawn per player |
| Rules sheet | Reference | 1 page | Quick-reference stat table and turn order |

**Total cards: ~90–100.** Printable on standard paper, cut-and-play.

---

## Build Archetype Examples

These emerge naturally from stat investment:

- **SPD brawler** — high SPD, moderate ATK, low DEF. Goes first, gets bonus actions, plays reactions. Glass cannon with initiative.
- **RNG sniper** — max RNG, decent ATK, low DEF/ENG. Unlocks long-range cards, attacks safely from distance, has sensor dodge.
- **ENG tank** — high ENG, high HP/DEF, low SPD. Powers expensive heavy-hitters, outlasts and overwhelms.
- **Balanced** — spread stats evenly. Flexible, no hard weakness, no extreme strength.

---

## Out of Scope

- Art and visual design (placeholders only)
- AI-generated asset images
- Digital implementation
- More than 2 players
- Deck-building outside the game (pre-built shared decks only)
