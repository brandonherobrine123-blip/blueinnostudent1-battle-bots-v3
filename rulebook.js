// Your game's rulebook. The agent rewrites this for YOUR game.
// Rewrite the words, keep the keys — the gallery reads them and `npm test` checks them.
window.RULEBOOK = {
  // Branding — the page header and browser tab come from these three.
  title: 'Battle Bots V3',
  mark: '🤖',
  tagline: 'Build in secret. Brawl in the open.',

  // The rules panel (also page one of the printout).
  theme: 'Two rival engineers secretly assemble scrap-metal battle bots, then reveal them and fight in a 3-round arena showdown.',
  howToPlay: 'Draw 30 part cards from the shared deck. Bolt up to 15 onto your chassis slots and layer up to 5 exoskeleton materials — all in secret. Then reveal both bots, draw 15 action cards, and fight across 3 rounds of alternating attacks.',
  aTurn: 'Play one action card from your hand, spending ENG equal to its cost. Higher SPD goes first. Alternate plays until both pass or run out of ENG.',
  winCondition: 'Knock out the rival bot (HP to 0) and win instantly. If both bots survive 3 rounds, highest remaining HP wins. Tie goes to higher ENG, then sudden death: first hit wins.',
  pieces: 'Part cards (arms, legs, heads, cores, hardpoints), exoskeleton materials, action cards, and two chassis tokens.',
  // Number ranges per type — plain words on purpose. Tighten these when your skill drifts.
  ranges: 'Chassis base: HP 50, ATK 5, DEF 0, SPD 3, ENG 30, RNG 3. Part cards boost ATK, DEF, SPD, ENG, RNG, HP (add only, never subtract). Action cards cost ENG 1-15. Exoskeleton materials: slot-free chassis buffs.',

  // What each piece family is called in YOUR game — the gallery section headers.
  families: { card: 'Part Cards', token: 'Chassis Tokens', tile: 'Action Cards' },
};
