// ============================================================
// INNER WORLDS – Companion Selection Screen
// ============================================================
import { useState } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { companions } from '@/data/companions/companions';
import type { CompanionId } from '@/types/game';

interface Props {
  onComplete: () => void;
}

export default function CompanionSelect({ onComplete }: Props) {
  const selectCompanion = useGameStore((s) => s.selectCompanion);
  const [selected, setSelected] = useState<CompanionId | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const selectedCompanion = companions.find((c) => c.id === selected);

  const handleConfirm = () => {
    if (selected) {
      selectCompanion(selected);
      setConfirmed(true);
      setTimeout(onComplete, 2000);
    }
  };

  const companionColors: Record<CompanionId, string> = {
    lupo: '#7C8DB0',
    sophia: '#C9A961',
    felix: '#D4652A',
    cleo: '#2E9E8F',
  };

  if (confirmed && selectedCompanion) {
    return (
      <div className="w-full h-full bg-gradient-to-b from-indigo-950 to-purple-950 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div
            className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center text-6xl"
            style={{ backgroundColor: companionColors[selected!] + '40' }}
          >
            {selected === 'lupo' && '🐺'}
            {selected === 'sophia' && '🦉'}
            {selected === 'felix' && '🦊'}
            {selected === 'cleo' && '🐢'}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {selectedCompanion.name} ist jetzt dein Begleiter!
          </h2>
          <p className="text-white/60">Gemeinsam seid ihr stärker.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-b from-indigo-950 to-purple-950 flex flex-col items-center justify-center p-8">
      <h2 className="text-3xl font-bold text-white mb-2 animate-fade-in">
        Wähle deinen Begleiter
      </h2>
      <p className="text-white/60 mb-8 text-center max-w-lg animate-fade-in">
        Dein Companion begleitet dich auf deiner Reise durch die inneren Welten.
        Jeder hat seine eigene Geschichte und Persönlichkeit.
      </p>

      <div className="grid grid-cols-2 gap-6 max-w-2xl w-full mb-8">
        {companions.map((comp) => (
          <button
            key={comp.id}
            onClick={() => setSelected(comp.id)}
            className={`p-6 rounded-2xl text-left transition-all ${
              selected === comp.id
                ? 'bg-white/20 border-2 scale-105'
                : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
            }`}
            style={{
              borderColor: selected === comp.id ? companionColors[comp.id] : 'transparent',
            }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                style={{ backgroundColor: companionColors[comp.id] + '30' }}
              >
                {comp.id === 'lupo' && '🐺'}
                {comp.id === 'sophia' && '🦉'}
                {comp.id === 'felix' && '🦊'}
                {comp.id === 'cleo' && '🐢'}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{comp.name}</h3>
                <p className="text-white/50 text-sm">{comp.tier}</p>
              </div>
            </div>
            <p className="text-white/70 text-sm">{comp.persoenlichkeit}</p>
          </button>
        ))}
      </div>

      {/* Selected companion detail */}
      {selectedCompanion && (
        <div className="animate-fade-in text-center max-w-md mb-6">
          <p className="text-white/80 italic">"{selectedCompanion.beschreibung}"</p>
        </div>
      )}

      <button
        onClick={handleConfirm}
        disabled={!selected}
        className="px-10 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl text-lg font-bold hover:scale-105 transition-transform disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-amber-500/30"
      >
        {selected ? `${selectedCompanion?.name} wählen` : 'Wähle einen Begleiter'}
      </button>
    </div>
  );
}
