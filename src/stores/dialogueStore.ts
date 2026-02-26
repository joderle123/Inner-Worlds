// ============================================================
// INNER WORLDS – Dialogue Store
// ============================================================
import { create } from 'zustand';
import type { DialogueLine, SceneChoice } from '@/types/game';

interface DialogueState {
  // Current dialogue state
  isActive: boolean;
  lines: DialogueLine[];
  currentLineIndex: number;
  choices: SceneChoice[];
  isChoiceVisible: boolean;
  selectedChoiceId: string | null;

  // Animation state
  isTyping: boolean;
  showSpeakerName: boolean;

  // Actions
  startDialogue: (lines: DialogueLine[], choices?: SceneChoice[]) => void;
  advanceLine: () => void;
  selectChoice: (choiceId: string) => void;
  endDialogue: () => void;
  setTyping: (typing: boolean) => void;
}

export const useDialogueStore = create<DialogueState>()((set, get) => ({
  isActive: false,
  lines: [],
  currentLineIndex: 0,
  choices: [],
  isChoiceVisible: false,
  selectedChoiceId: null,
  isTyping: false,
  showSpeakerName: true,

  startDialogue: (lines, choices = []) =>
    set({
      isActive: true,
      lines,
      currentLineIndex: 0,
      choices,
      isChoiceVisible: false,
      selectedChoiceId: null,
      isTyping: true,
    }),

  advanceLine: () => {
    const { currentLineIndex, lines, choices } = get();
    if (currentLineIndex < lines.length - 1) {
      set({ currentLineIndex: currentLineIndex + 1, isTyping: true });
    } else if (choices.length > 0) {
      set({ isChoiceVisible: true });
    } else {
      set({ isActive: false });
    }
  },

  selectChoice: (choiceId) => {
    const { choices } = get();
    const choice = choices.find((c) => c.id === choiceId);
    if (choice) {
      set({
        selectedChoiceId: choiceId,
        isChoiceVisible: false,
        lines: choice.followUpDialogues,
        currentLineIndex: 0,
        choices: [],
        isTyping: true,
      });
    }
  },

  endDialogue: () =>
    set({
      isActive: false,
      lines: [],
      currentLineIndex: 0,
      choices: [],
      isChoiceVisible: false,
      selectedChoiceId: null,
      isTyping: false,
    }),

  setTyping: (isTyping) => set({ isTyping }),
}));
