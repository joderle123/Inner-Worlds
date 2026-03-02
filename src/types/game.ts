// ============================================================
// INNER WORLDS – Core Type Definitions
// Therapeutisches SEL-Spiel für Jugendliche (10–15 Jahre)
// ============================================================

// --- Emotions & Skills ---
export type Emotion = 'wut' | 'trauer' | 'angst' | 'selbstwert' | 'verbindung' | 'achtsamkeit' | 'identitaet' | 'integration';

export type SELSkill = 'empathie' | 'einsicht' | 'mut' | 'resilienz' | 'achtsamkeit';

export type MoodLevel = 1 | 2 | 3 | 4 | 5; // 1=sehr schlecht, 5=sehr gut

export type PlayerEmote = 'freude' | 'trauer' | 'wut' | 'angst';

// --- Islands ---
export type IslandId = 'vulkan' | 'ozean' | 'wald' | 'berg' | 'garten' | 'nacht' | 'regenbogen' | 'zuhause';

export interface Island {
  id: IslandId;
  name: string;
  emotion: Emotion;
  description: string;
  color: string;
  unlocked: boolean;
  completed: boolean;
  ambiance: IslandAmbiance;
  shadowSelfScene: ShadowSelfScene;
  mystery: IslandMystery;
}

export interface IslandAmbiance {
  timeOfDay: 'morgen' | 'mittag' | 'abend' | 'nacht' | 'daemmerung' | 'immer_nacht';
  weather: WeatherType;
  musicTrack: string;
  ambientSounds: string[];
}

export type WeatherType = 'klar' | 'nebel' | 'regen' | 'sturm' | 'schnee' | 'asche' | 'sonnenschein';

// --- Shadow Self (Schatten-Selbst) ---
export interface ShadowSelfScene {
  islandId: IslandId;
  appearance: ShadowAppearance;
  dialogue: DialogueLine[];
  botschaft: string; // Core message
  lernerfahrung: string; // What the player learns
}

export interface ShadowAppearance {
  glitchIntensity: number; // 1.0 (island 1) → 0.0 (island 8)
  colorAmount: number; // 0.0 (island 1) → 1.0 (island 8)
  description: string;
}

// --- NPCs ---
export type NPCId = string;

export interface NPC {
  id: NPCId;
  name: string;
  alter: number; // Age
  islandId: IslandId;
  aussehen: string; // Appearance description
  emotion: PlayerEmote;
  schmerz: string; // Core pain/conflict
  geheimnis: string; // Secret revealed in scene 3-4
  verbindung: NPCConnection; // Connection to NPC on another island
  szenen: NPCScene[];
  weisheitskarte: WisdomCard;
}

export interface NPCConnection {
  npcId: NPCId;
  islandId: IslandId;
  beschreibung: string;
}

export interface NPCScene {
  nummer: 1 | 2 | 3 | 4;
  titel: string;
  beschreibung: string;
  dialogues: DialogueLine[];
  choices: SceneChoice[];
  isGeheimnis?: boolean; // Scene reveals the secret
}

// --- Dialogue System ---
export interface DialogueLine {
  sprecher: string; // Speaker name
  text: string;
  emotion?: PlayerEmote;
  isSchattenSelbst?: boolean;
  isCompanion?: boolean;
  delay?: number; // ms before showing
}

export interface SceneChoice {
  id: string;
  text: string;
  skillEffects: Partial<Record<SELSkill, number>>;
  konsequenz: string; // What happens next
  followUpDialogues: DialogueLine[];
  vorteile: string; // Advantages
  nachteile: string; // Disadvantages
}

// --- Choices with real consequences ---
export interface ChoiceOutcome {
  immediate: string; // What happens right away
  longTerm?: string; // What this affects later
  npcReaction: string;
  companionReaction: string;
}

// --- Wisdom Cards ---
export interface WisdomCard {
  id: string;
  titel: string;
  zitat: string; // Quote
  therapeutischeTechnik: string; // CBT/DBT technique embedded
  kategorie: SELSkill;
  bildBeschreibung: string;
  islandId: IslandId;
}

// --- Island Mysteries ---
export interface IslandMystery {
  islandId: IslandId;
  titel: string;
  kapitel: MysteryChapter[];
  metapher: string; // Therapeutic metaphor
}

export interface MysteryChapter {
  nummer: 1 | 2 | 3 | 4;
  titel: string;
  beschreibung: string;
  fund: string; // What the player finds
  belohnung?: string; // Reward (chapter 4)
}

// --- Companions ---
export type CompanionId = 'lupo' | 'sophia' | 'felix' | 'cleo';

export interface Companion {
  id: CompanionId;
  name: string;
  tier: string; // Animal type
  beschreibung: string;
  persoenlichkeit: string;
  backstory: string; // Revealed at affection level 3
  zuneigungLevel: 1 | 2 | 3 | 4 | 5;
  idleAnimations: string[];
  islandReaktionen: Record<IslandId, string>; // Comments for each island
  dialogHinweise: Record<IslandId, string[]>; // Hints during scenarios
}

export interface CompanionLevel {
  level: 1 | 2 | 3 | 4 | 5;
  name: string;
  beschreibung: string;
}

// --- Player / Avatar ---
export interface PlayerAvatar {
  kopfForm: 'rund' | 'eckig' | 'dreieckig' | 'oval';
  hautfarbe: string;
  haarFarbe: string;
  haarStil: string;
  augenFarbe: string;
  kleidungFarbe: string;
  accessoire?: string;
  goldenShimmer: boolean; // After completing the game
}

export interface PlayerStats {
  empathie: number;
  einsicht: number;
  mut: number;
  resilienz: number;
  achtsamkeit: number;
}

// --- Journal ---
export interface JournalEntry {
  id: string;
  datum: string; // Date
  typ: 'szenario' | 'notiz' | 'brief' | 'transfer' | 'mood';
  titel: string;
  inhalt: string;
  islandId?: IslandId;
  npcId?: NPCId;
  moodLevel?: MoodLevel;
}

// --- Mood Tracking ---
export interface MoodCheckIn {
  timestamp: number;
  level: MoodLevel;
  emotion?: Emotion;
  notiz?: string;
}

// --- Mini-Games ---
export type MiniGameType = 'memory' | 'catcher' | 'sorter';

export interface MiniGameConfig {
  typ: MiniGameType;
  schwierigkeit: 1 | 2 | 3;
  thema: string;
  islandId: IslandId;
}

// --- Game State ---
export type GameScreen =
  | 'titel'
  | 'avatar_creator'
  | 'mood_checkin'
  | 'insel_karte'
  | 'insel_view'
  | 'szenario'
  | 'dialog'
  | 'minigame'
  | 'tagebuch'
  | 'weisheitskarten'
  | 'uebergang'
  | 'schatten_selbst'
  | 'finale';

export interface GameProgress {
  currentIsland: IslandId | null;
  currentNPC: NPCId | null;
  currentScene: number;
  completedIslands: IslandId[];
  completedNPCs: NPCId[];
  completedMysteries: IslandId[];
  mysteryProgress: Partial<Record<IslandId, number>>; // Chapter progress per island
  unlockedSecretScenes: string[];
  companionId: CompanionId | null;
  companionAffection: number;
  totalPlayTime: number;
  wisdomCards: string[]; // Collected card IDs
  moodHistory: MoodCheckIn[];
}

// --- Transfer Moments ---
export interface TransferPrompt {
  id: string;
  npcId: NPCId;
  frage: string; // Question for the player
  hinweis: string; // Hint/context
  bonusXP: number;
  bonusKarte?: string; // Bonus wisdom card ID
}

// --- Peer Elements ---
export interface WisdomTradeCode {
  cardId: string;
  code: string;
}

export interface ClassStats {
  szenarioId: string;
  choiceDistribution: Record<string, number>; // choice ID → percentage
}

// --- Accessibility ---
export interface AccessibilitySettings {
  fontSize: 'normal' | 'gross' | 'sehr_gross';
  kontrast: 'normal' | 'hoch';
  bewegungsReduziert: boolean;
  screenReader: boolean;
  untertitel: boolean;
}

// --- SOS System ---
export interface SOSInfo {
  title: string;
  message: string;
  contacts: SOSContact[];
}

export interface SOSContact {
  name: string;
  beschreibung: string;
  nummer?: string;
  url?: string;
}
