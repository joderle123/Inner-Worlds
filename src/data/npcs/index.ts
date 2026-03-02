// ============================================================
// INNER WORLDS – NPC Index
// Central export for all island NPCs
// ============================================================
import { volcanoNpcs } from './volcanoNpcs';
import { oceanNpcs } from './oceanNpcs';
import { forestNpcs } from './forestNpcs';
import { mountainNpcs } from './mountainNpcs';
import { gardenNpcs } from './gardenNpcs';
import { nightNpcs } from './nightNpcs';
import { rainbowNpcs } from './rainbowNpcs';
import { homeNpcs } from './homeNpcs';
import type { NPC, IslandId } from '@/types/game';

export const allNpcs: NPC[] = [
  ...volcanoNpcs,
  ...oceanNpcs,
  ...forestNpcs,
  ...mountainNpcs,
  ...gardenNpcs,
  ...nightNpcs,
  ...rainbowNpcs,
  ...homeNpcs,
];

export const getNpcById = (id: string): NPC | undefined =>
  allNpcs.find((npc) => npc.id === id);

export const getNpcsByIsland = (islandId: IslandId): NPC[] =>
  allNpcs.filter((npc) => npc.islandId === islandId);

export {
  volcanoNpcs,
  oceanNpcs,
  forestNpcs,
  mountainNpcs,
  gardenNpcs,
  nightNpcs,
  rainbowNpcs,
  homeNpcs,
};
