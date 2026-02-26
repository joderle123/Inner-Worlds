// ============================================================
// INNER WORLDS – Transfer Prompt Panel
// "Brücke zur Realität" – connects game learning to real life
// ============================================================
import { useState } from 'react';
import { useGameStore } from '@/stores/gameStore';

interface Props {
  npcName: string;
  onComplete: () => void;
}

export default function TransferPromptPanel({ npcName, onComplete }: Props) {
  const { addJournalEntry, addSkillPoints, progress } = useGameStore();
  const [response, setResponse] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const prompts: Record<string, string> = {
    kai: `${npcName} hat gelernt, seine Wut in Worte zu fassen. Gibt es eine Situation in deinem Leben, in der du das auch versuchen könntest?`,
    mira: `${npcName} hat verstanden, dass Fehler nicht das Ende sind. Wann hast du zuletzt einen Fehler gemacht und dich dafür fertig gemacht?`,
    dario: `${npcName} hat entdeckt, dass es Stärke braucht, NICHT zuzuschlagen. Kennst du eine Situation, in der du dich unfair behandelt gefühlt hast?`,
    yuki: `${npcName} hat gelernt, dass auch ruhige Menschen wütend sein dürfen. Gibt es ein Gefühl, das du oft unterdrückst?`,
    alina: `${npcName} hat verstanden, dass Trauer kein Zeichen von Schwäche ist. Gibt es etwas, das du verloren hast und worüber du noch nicht richtig trauern konntest?`,
    tomas: `${npcName} hat gelernt, dass man Abschied nehmen kann, auch wenn es wehtut. Gibt es etwas, das du jemandem sagen möchtest, aber noch nicht gesagt hast?`,
    default: `Was nimmst du aus dieser Begegnung mit? Gibt es etwas in deinem Leben, das dich an ${npcName}s Geschichte erinnert?`,
  };

  const prompt = prompts[npcName.toLowerCase()] ?? prompts.default;

  const handleSubmit = () => {
    if (response.trim()) {
      addJournalEntry({
        id: `transfer_${npcName}_${Date.now()}`,
        datum: new Date().toLocaleDateString('de-DE'),
        typ: 'transfer',
        titel: `Gedanken nach ${npcName}`,
        inhalt: response,
        islandId: progress.currentIsland ?? undefined,
      });
      addSkillPoints('einsicht', 2);
      setSubmitted(true);
      setTimeout(onComplete, 2000);
    } else {
      onComplete();
    }
  };

  if (submitted) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-30 animate-fade-in">
        <div className="text-center bg-gray-900/90 backdrop-blur-md rounded-2xl p-8 max-w-md">
          <div className="text-4xl mb-4">🌉</div>
          <h3 className="text-xl font-bold text-amber-400 mb-2">Brückenbauer!</h3>
          <p className="text-white/70">
            Du hast eine Brücke zwischen der Spielwelt und deinem Leben gebaut.
            Das ist mutig.
          </p>
          <p className="text-amber-400/60 text-sm mt-3">+20 Bonus-XP</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center z-30 animate-fade-in">
      <div className="bg-gray-900/90 backdrop-blur-md rounded-2xl p-8 max-w-lg w-full mx-4">
        <h3 className="text-lg font-bold text-amber-400 mb-1">Moment der Reflexion</h3>
        <p className="text-white/50 text-xs mb-4">Freiwillig – du kannst jederzeit überspringen.</p>

        <p className="text-white/80 text-lg mb-6 leading-relaxed">{prompt}</p>

        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Deine Gedanken... (freiwillig)"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-amber-400/50 transition-colors resize-none"
          rows={4}
        />

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-bold hover:scale-[1.02] transition-transform"
          >
            {response.trim() ? 'Speichern' : 'Überspringen'}
          </button>
        </div>
      </div>
    </div>
  );
}
