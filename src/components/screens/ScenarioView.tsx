// ============================================================
// INNER WORLDS – Scenario View (NPC Interaction)
// ============================================================
import { useState, useCallback } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { companions } from '@/data/companions/companions';
import { getNpcById } from '@/data/npcs';
import DialoguePanel from '@/components/ui/DialoguePanel';
import TransferPromptPanel from '@/components/ui/TransferPromptPanel';
import WisdomCardDisplay from '@/components/ui/WisdomCardDisplay';
import type { NPC, SceneChoice, SELSkill } from '@/types/game';

export default function ScenarioView() {
  const {
    progress,
    setScreen,
    setCurrentScene,
    completeNPC,
    addSkillPoints,
    addCompanionAffection,
    collectWisdomCard,
    addJournalEntry,
  } = useGameStore();

  const [phase, setPhase] = useState<'dialogue' | 'transfer' | 'wisdom' | 'complete'>('dialogue');
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

  const npcId = progress.currentNPC;
  const companion = companions.find((c) => c.id === progress.companionId);
  const npcData: NPC | undefined = npcId ? getNpcById(npcId) : undefined;

  const currentScene = npcData?.szenen[currentSceneIndex];

  const handleChoiceSelected = useCallback((choice: SceneChoice) => {
    // Apply skill points
    Object.entries(choice.skillEffects).forEach(([skill, points]) => {
      if (points) addSkillPoints(skill as SELSkill, points);
    });

    // Companion reacts
    addCompanionAffection(0.2);
  }, [addSkillPoints, addCompanionAffection]);

  const handleDialogueComplete = useCallback(() => {
    if (npcData && currentSceneIndex < npcData.szenen.length - 1) {
      // Next scene
      setCurrentSceneIndex((i) => i + 1);
      setCurrentScene(currentSceneIndex + 2);
    } else {
      // Scenario complete - show transfer prompt
      setPhase('transfer');
    }
  }, [npcData, currentSceneIndex, setCurrentScene]);

  const handleTransferComplete = useCallback(() => {
    setPhase('wisdom');
  }, []);

  const handleWisdomCollected = useCallback(() => {
    if (npcId && npcData) {
      completeNPC(npcId);
      collectWisdomCard(npcData.weisheitskarte.id);

      // Add journal entry
      addJournalEntry({
        id: `journal_${npcId}_${Date.now()}`,
        datum: new Date().toLocaleDateString('de-DE'),
        typ: 'szenario',
        titel: `Begegnung mit ${npcData.name}`,
        inhalt: `Du hast ${npcData.name} getroffen und seine/ihre Geschichte gehört.`,
        islandId: progress.currentIsland ?? undefined,
        npcId,
      });
    }
    setPhase('complete');
    setTimeout(() => setScreen('insel_view'), 1500);
  }, [npcId, npcData, completeNPC, collectWisdomCard, addJournalEntry, progress.currentIsland, setScreen]);

  if (!npcData || !currentScene) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black">
        <div className="text-center">
          <p className="text-white/60 mb-4">Szenario wird geladen...</p>
          <button
            onClick={() => setScreen('insel_view')}
            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            Zurück
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-gray-900 to-black">
      {/* Scene background - NPC portrait area */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          {/* NPC visual */}
          <div className="w-24 h-24 rounded-full bg-white/10 mx-auto mb-4 flex items-center justify-center text-4xl">
            {npcData.name.charAt(0).toUpperCase()}
          </div>
          <p className="text-white/30 text-sm">
            Szene {currentSceneIndex + 1} von {npcData.szenen.length}
          </p>
        </div>
      </div>

      {/* Companion hint */}
      {companion && phase === 'dialogue' && (
        <div className="absolute top-4 right-4 z-20 bg-amber-950/60 backdrop-blur-sm rounded-xl px-4 py-2 max-w-xs">
          <p className="text-amber-300/70 text-xs italic">
            {companion.name}: {
              companion.dialogHinweise[progress.currentIsland ?? 'vulkan']?.[currentSceneIndex] ?? 'Hör genau zu...'
            }
          </p>
        </div>
      )}

      {/* Dialogue Panel */}
      {phase === 'dialogue' && (
        <DialoguePanel
          lines={currentScene.dialogues}
          choices={currentScene.choices}
          onComplete={handleDialogueComplete}
          onChoiceSelected={handleChoiceSelected}
        />
      )}

      {/* Transfer Prompt */}
      {phase === 'transfer' && (
        <TransferPromptPanel
          npcName={npcData.name}
          onComplete={handleTransferComplete}
        />
      )}

      {/* Wisdom Card */}
      {phase === 'wisdom' && (
        <WisdomCardDisplay
          card={npcData.weisheitskarte}
          onCollect={handleWisdomCollected}
        />
      )}

      {/* Completion */}
      {phase === 'complete' && (
        <div className="absolute inset-0 flex items-center justify-center z-30 animate-fade-in">
          <div className="text-center">
            <div className="text-5xl mb-4">✨</div>
            <p className="text-xl text-amber-400 font-bold">Szenario abgeschlossen!</p>
          </div>
        </div>
      )}

      {/* Back button */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => setScreen('insel_view')}
          className="px-4 py-2 bg-black/40 backdrop-blur-sm text-white/60 rounded-xl text-sm hover:text-white/80 transition-colors"
        >
          Zurück
        </button>
      </div>
    </div>
  );
}
