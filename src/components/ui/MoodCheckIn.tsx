// ============================================================
// INNER WORLDS – Mood Check-In
// ============================================================
import { useState } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { companions } from '@/data/companions/companions';
import type { MoodLevel } from '@/types/game';

const moods: { level: MoodLevel; label: string; color: string; size: string }[] = [
  { level: 1, label: 'Sehr schlecht', color: '#E74C3C', size: 'text-5xl' },
  { level: 2, label: 'Nicht so gut', color: '#E67E22', size: 'text-5xl' },
  { level: 3, label: 'Geht so', color: '#F1C40F', size: 'text-5xl' },
  { level: 4, label: 'Ganz gut', color: '#2ECC71', size: 'text-5xl' },
  { level: 5, label: 'Richtig gut', color: '#3498DB', size: 'text-5xl' },
];

const moodFaces = ['😞', '😕', '😐', '🙂', '😊'];

export default function MoodCheckIn() {
  const { addMoodCheckIn, setScreen, progress } = useGameStore();
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);
  const [note, setNote] = useState('');
  const [showCompanionReaction, setShowCompanionReaction] = useState(false);

  const companion = companions.find((c) => c.id === progress.companionId);

  const handleSubmit = () => {
    if (selectedMood !== null) {
      addMoodCheckIn(selectedMood, note || undefined);
      setShowCompanionReaction(true);
      setTimeout(() => setScreen('insel_karte'), 3000);
    }
  };

  const companionReactions: Record<MoodLevel, string> = {
    1: 'Hey, das klingt schwer. Ich bin hier bei dir. Wir machen das zusammen, okay?',
    2: 'Nicht der beste Tag, hm? Das ist okay. Manchmal sind Tage einfach so. Ich bleibe bei dir.',
    3: 'Okay, es geht so. Weißt du was? Manchmal ist "geht so" völlig in Ordnung.',
    4: 'Hey, das klingt gut! Lass uns diese gute Energie mitnehmen auf unsere Reise.',
    5: 'Wow, das freut mich! Los geht\'s – mit der Energie können wir alles schaffen!',
  };

  if (showCompanionReaction && selectedMood && companion) {
    return (
      <div className="w-full h-full bg-gradient-to-b from-indigo-950 to-purple-950 flex items-center justify-center">
        <div className="animate-fade-in text-center max-w-md">
          <div className="text-6xl mb-6">
            {companion.id === 'lupo' && '🐺'}
            {companion.id === 'sophia' && '🦉'}
            {companion.id === 'felix' && '🦊'}
            {companion.id === 'cleo' && '🐢'}
          </div>
          <p className="text-xl text-white/90 italic">
            "{companionReactions[selectedMood]}"
          </p>
          <p className="text-white/50 mt-4 text-sm">– {companion.name}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-b from-indigo-950 to-purple-950 flex items-center justify-center">
      <div className="text-center max-w-lg animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-2">Wie geht es dir gerade?</h2>
        <p className="text-white/60 mb-10">
          Es gibt keine richtige oder falsche Antwort. Nur deine.
        </p>

        {/* Mood Selection */}
        <div className="flex justify-center gap-6 mb-8">
          {moods.map((mood, i) => (
            <button
              key={mood.level}
              onClick={() => setSelectedMood(mood.level)}
              className={`flex flex-col items-center gap-2 transition-all ${
                selectedMood === mood.level
                  ? 'scale-125'
                  : selectedMood !== null
                    ? 'opacity-40 scale-90'
                    : 'hover:scale-110'
              }`}
            >
              <span className={mood.size}>{moodFaces[i]}</span>
              <span
                className="text-xs font-bold"
                style={{ color: mood.color }}
              >
                {mood.label}
              </span>
            </button>
          ))}
        </div>

        {/* Optional Note */}
        {selectedMood !== null && (
          <div className="animate-fade-in mb-8">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Willst du mehr erzählen? (freiwillig)"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-400 transition-colors resize-none"
              rows={2}
            />
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={handleSubmit}
          disabled={selectedMood === null}
          className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-lg font-bold hover:scale-105 transition-transform disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Weiter
        </button>
      </div>
    </div>
  );
}
