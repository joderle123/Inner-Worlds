# CLAUDE.md - Inner Worlds Game Development Guide

## Project Overview

**Inner Worlds** is a therapeutic SEL (Social-Emotional Learning) video game for adolescents (10-15 years) at the CDSE Luxembourg. Built with React 19 + TypeScript + Three.js + Zustand.

### Key Concepts
- **8 Islands** representing emotions: Vulkan (Wut), Ozean (Trauer), Wald (Angst), Berg (Selbstwert), Garten (Verbindung), Nacht (Achtsamkeit), Regenbogen (Identität), Zuhause (Integration)
- **Shadow Self** (Schatten-Selbst): Not a villain but the player's suppressed parts. Appears on each island with decreasing glitch intensity. Embraced in the finale.
- **32 NPCs** (4 per island) with deep, relatable stories rooted in adolescent life
- **4 Companions**: Lupo (Wolf), Sophia (Eule), Felix (Fuchs), Cleo (Schildkröte)
- **Therapeutic Framework**: Based on ELDiB developmental stages, CBT, and DBT techniques embedded through story

### Tech Stack
- React 19 + TypeScript
- Three.js via @react-three/fiber + @react-three/drei
- Zustand (state management with persistence)
- Tailwind CSS v4
- Framer Motion (animations)
- Vite 7

## Project Structure

```
src/
├── types/game.ts              # Core type definitions
├── stores/
│   ├── gameStore.ts           # Main game state (Zustand + persist)
│   └── dialogueStore.ts       # Dialogue/choice state
├── data/
│   ├── story/
│   │   ├── overarchingStory.ts # Shadow Self arc + intro/finale
│   │   └── islands.ts         # Island definitions
│   ├── npcs/
│   │   ├── index.ts           # Central NPC export
│   │   ├── volcanoNpcs.ts     # 4 NPCs per island file
│   │   └── ...                # oceanNpcs, forestNpcs, etc.
│   ├── companions/
│   │   └── companions.ts      # 4 companion definitions
│   └── mysteries/
│       └── islandMysteries.ts # 8 island mysteries (4 chapters each)
├── components/
│   ├── screens/               # Full-screen views
│   │   ├── TitleScreen.tsx
│   │   ├── AvatarCreator.tsx
│   │   ├── IslandMap.tsx
│   │   ├── IslandView.tsx
│   │   ├── ScenarioView.tsx
│   │   ├── JournalScreen.tsx
│   │   └── FinaleScreen.tsx
│   ├── ui/                    # UI components
│   │   ├── DialoguePanel.tsx
│   │   ├── CompanionSelect.tsx
│   │   ├── MoodCheckIn.tsx
│   │   ├── SOSButton.tsx
│   │   ├── TransitionOverlay.tsx
│   │   ├── TransferPromptPanel.tsx
│   │   └── WisdomCardDisplay.tsx
│   └── three/islands/         # 3D island scenes
│       ├── VolcanoIsland.tsx
│       ├── OceanIsland.tsx
│       └── ...
├── App.tsx
├── main.tsx
└── index.css
```

## Important Rules

### Therapeutic Guidelines
- **NEVER** portray the Shadow Self as evil - it's a part of the player
- **NO** toxic positivity ("Just think positive!")
- **NO** pathologizing ("You're sick")
- **NO** advice a psychologist wouldn't give
- Choices must NEVER be obviously "right" or "wrong" - real dilemmas
- Always validate emotions before suggesting solutions
- Embed therapeutic techniques through story, never through lectures

### What NOT to Change
- Tech stack (React + Three.js + Zustand)
- 8-island system with 4 NPCs per island
- Avatar creator
- Accessibility features
- SOS system
- Mini-game basic mechanics (memory, catcher, sorter)

### Language
- German, youth-appropriate (10-15 years)
- Not condescending, not too childish
- Emotionally honest and relatable

## Development

```bash
npm install
npm run dev      # Uses game.html as entry
npm run build
npm run lint
```

Note: The `index.html` contains the ELDiB Generator (separate tool). The game uses `game.html` as its entry point.
