// ============================================================
// INNER WORLDS – Main Game Store (Zustand)
// ============================================================
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  GameScreen,
  GameProgress,
  IslandId,
  NPCId,
  CompanionId,
  PlayerAvatar,
  PlayerStats,
  MoodCheckIn,
  MoodLevel,
  JournalEntry,
  AccessibilitySettings,
  SELSkill,
} from '@/types/game';

interface GameState {
  // Screen & Navigation
  screen: GameScreen;
  previousScreen: GameScreen | null;
  setScreen: (screen: GameScreen) => void;

  // Player
  avatar: PlayerAvatar | null;
  setAvatar: (avatar: PlayerAvatar) => void;
  playerName: string;
  setPlayerName: (name: string) => void;
  stats: PlayerStats;
  addSkillPoints: (skill: SELSkill, points: number) => void;

  // Game Progress
  progress: GameProgress;
  setCurrentIsland: (id: IslandId) => void;
  setCurrentNPC: (id: NPCId | null) => void;
  setCurrentScene: (scene: number) => void;
  completeIsland: (id: IslandId) => void;
  completeNPC: (id: NPCId) => void;
  completeMystery: (id: IslandId) => void;
  advanceMystery: (id: IslandId) => void;
  collectWisdomCard: (cardId: string) => void;
  unlockSecretScene: (sceneId: string) => void;

  // Companion
  selectCompanion: (id: CompanionId) => void;
  addCompanionAffection: (amount: number) => void;

  // Mood
  addMoodCheckIn: (level: MoodLevel, notiz?: string) => void;

  // Journal
  journal: JournalEntry[];
  addJournalEntry: (entry: JournalEntry) => void;

  // Accessibility
  accessibility: AccessibilitySettings;
  setAccessibility: (settings: Partial<AccessibilitySettings>) => void;

  // Transition
  isTransitioning: boolean;
  transitionTarget: IslandId | null;
  startTransition: (target: IslandId) => void;
  endTransition: () => void;

  // Shadow Self
  shadowSelfEncountered: IslandId[];
  encounterShadowSelf: (island: IslandId) => void;

  // Reset
  resetGame: () => void;
}

const defaultStats: PlayerStats = {
  empathie: 0,
  einsicht: 0,
  mut: 0,
  resilienz: 0,
  achtsamkeit: 0,
};

const defaultProgress: GameProgress = {
  currentIsland: null,
  currentNPC: null,
  currentScene: 0,
  completedIslands: [],
  completedNPCs: [],
  completedMysteries: [],
  mysteryProgress: {},
  unlockedSecretScenes: [],
  companionId: null,
  companionAffection: 0,
  totalPlayTime: 0,
  wisdomCards: [],
  moodHistory: [],
};

const defaultAccessibility: AccessibilitySettings = {
  fontSize: 'normal',
  kontrast: 'normal',
  bewegungsReduziert: false,
  screenReader: false,
  untertitel: true,
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      // Screen
      screen: 'titel',
      previousScreen: null,
      setScreen: (screen) =>
        set((s) => ({ screen, previousScreen: s.screen })),

      // Player
      avatar: null,
      setAvatar: (avatar) => set({ avatar }),
      playerName: '',
      setPlayerName: (playerName) => set({ playerName }),
      stats: { ...defaultStats },
      addSkillPoints: (skill, points) =>
        set((s) => ({
          stats: { ...s.stats, [skill]: s.stats[skill] + points },
        })),

      // Progress
      progress: { ...defaultProgress },
      setCurrentIsland: (id) =>
        set((s) => ({
          progress: { ...s.progress, currentIsland: id },
        })),
      setCurrentNPC: (id) =>
        set((s) => ({
          progress: { ...s.progress, currentNPC: id, currentScene: id ? 1 : 0 },
        })),
      setCurrentScene: (scene) =>
        set((s) => ({
          progress: { ...s.progress, currentScene: scene },
        })),
      completeIsland: (id) =>
        set((s) => ({
          progress: {
            ...s.progress,
            completedIslands: [...new Set([...s.progress.completedIslands, id])],
          },
        })),
      completeNPC: (id) =>
        set((s) => ({
          progress: {
            ...s.progress,
            completedNPCs: [...new Set([...s.progress.completedNPCs, id])],
          },
        })),
      completeMystery: (id) =>
        set((s) => ({
          progress: {
            ...s.progress,
            completedMysteries: [...new Set([...s.progress.completedMysteries, id])],
          },
        })),
      advanceMystery: (id) =>
        set((s) => ({
          progress: {
            ...s.progress,
            mysteryProgress: {
              ...s.progress.mysteryProgress,
              [id]: (s.progress.mysteryProgress[id] ?? 0) + 1,
            },
          },
        })),
      collectWisdomCard: (cardId) =>
        set((s) => ({
          progress: {
            ...s.progress,
            wisdomCards: [...new Set([...s.progress.wisdomCards, cardId])],
          },
        })),
      unlockSecretScene: (sceneId) =>
        set((s) => ({
          progress: {
            ...s.progress,
            unlockedSecretScenes: [...new Set([...s.progress.unlockedSecretScenes, sceneId])],
          },
        })),

      // Companion
      selectCompanion: (id) =>
        set((s) => ({
          progress: { ...s.progress, companionId: id, companionAffection: 1 },
        })),
      addCompanionAffection: (amount) =>
        set((s) => ({
          progress: {
            ...s.progress,
            companionAffection: Math.min(5, Math.max(1, s.progress.companionAffection + amount)),
          },
        })),

      // Mood
      addMoodCheckIn: (level, notiz) =>
        set((s) => {
          const entry: MoodCheckIn = {
            timestamp: Date.now(),
            level,
            notiz,
          };
          return {
            progress: {
              ...s.progress,
              moodHistory: [...s.progress.moodHistory, entry],
            },
          };
        }),

      // Journal
      journal: [],
      addJournalEntry: (entry) =>
        set((s) => ({ journal: [...s.journal, entry] })),

      // Accessibility
      accessibility: { ...defaultAccessibility },
      setAccessibility: (settings) =>
        set((s) => ({
          accessibility: { ...s.accessibility, ...settings },
        })),

      // Transition
      isTransitioning: false,
      transitionTarget: null,
      startTransition: (target) =>
        set({ isTransitioning: true, transitionTarget: target }),
      endTransition: () =>
        set((s) => ({
          isTransitioning: false,
          transitionTarget: null,
          progress: {
            ...s.progress,
            currentIsland: s.transitionTarget ?? s.progress.currentIsland,
          },
        })),

      // Shadow Self
      shadowSelfEncountered: [],
      encounterShadowSelf: (island) =>
        set((s) => ({
          shadowSelfEncountered: [...new Set([...s.shadowSelfEncountered, island])],
        })),

      // Reset
      resetGame: () =>
        set({
          screen: 'titel',
          previousScreen: null,
          avatar: null,
          playerName: '',
          stats: { ...defaultStats },
          progress: { ...defaultProgress },
          journal: [],
          shadowSelfEncountered: [],
          isTransitioning: false,
          transitionTarget: null,
        }),
    }),
    {
      name: 'inner-worlds-save',
      partialize: (state) => ({
        avatar: state.avatar,
        playerName: state.playerName,
        stats: state.stats,
        progress: state.progress,
        journal: state.journal,
        shadowSelfEncountered: state.shadowSelfEncountered,
        accessibility: state.accessibility,
      }),
    }
  )
);
