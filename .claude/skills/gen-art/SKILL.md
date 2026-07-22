---
name: gen-art
description: Turn a text prompt into an image file using the class art model (Seedream). Use when the user runs /gen-art or asks to generate art from a written prompt.
---

# Generate art from a prompt

This skill turns a short text description into an image file. It is **self-contained** —
the generator (`scripts/gen-asset-image.js`, Seedream on BytePlus ModelArk)
travels inside this skill folder, so the skill works on its own, copied into any
project.

Follow these steps.

1. **Get the prompt.** Use the user's description of the image they want. If they
   didn't give one, ask for a short, vivid prompt — e.g. *"a chunky blue battle
   robot, flat illustration, plain background"*.
2. **Run the generator** from this skill's folder:
   `node scripts/gen-asset-image.js "<the prompt>"`
   It saves an image under `assets/images/` and prints the exact path — the file
   extension matches what the model returns (Seedream 4.0 produces `.jpg`). To steer the
   filename and folder, add `--type <card|token|tile>` and `--id <NNN>`
   (e.g. `--type token --id 105`).
3. **Report what the script printed.** Tell the user the saved path. The script is
   **fail-soft**: with no `ART_API_KEY` set, or on a network/API error, it prints
   a friendly note and writes nothing — relay that note instead. If the provider's
   safety filter blocks a prompt, the script says so in plain words; suggest the
   user rephrase. No key is needed to try; it just won't produce an image without
   one.

Never invent a path or claim an image was saved that the script did not report —
the script's printed output is the only source of truth for whether an image exists.

## What it needs

- **Node** (v18+) to run the script. No `npm install` — built-ins only.
- **`ART_API_KEY`** for real art. The script reads it automatically from a
  `.env` file — copy `.env.example` to `.env` (in this skill folder) and paste
  the class key **your teacher posts** (there's nothing to sign up for). You
  don't need to `export` or `source` anything; the script searches for `.env`
  starting in its own folder and walking up to your project root, and also
  honors an already-exported `ART_API_KEY` if present. Optional: without a key,
  the skill still runs and reports the fail-soft note.

  Set `GEN_ART_DEBUG=1` to have the script print which `.env` the key came from.
