// ============================================================
// INNER WORLDS – Island Transition Overlay
// ============================================================
import { useEffect, useState } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { islands } from '@/data/story/islands';
import { companions } from '@/data/companions/companions';

export default function TransitionOverlay() {
  const { transitionTarget, endTransition, progress } = useGameStore();
  const [phase, setPhase] = useState<'fadeOut' | 'travel' | 'arrive' | 'fadeIn'>('fadeOut');

  const targetIsland = islands.find((i) => i.id === transitionTarget);
  const companion = companions.find((c) => c.id === progress.companionId);
  const companionComment = companion && transitionTarget
    ? companion.islandReaktionen[transitionTarget]
    : '';

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase('travel'), 800));
    timers.push(setTimeout(() => setPhase('arrive'), 3000));
    timers.push(setTimeout(() => setPhase('fadeIn'), 4500));
    timers.push(setTimeout(() => endTransition(), 5500));
    return () => timers.forEach(clearTimeout);
  }, [endTransition]);

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center">
      {/* Background */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          phase === 'fadeOut' ? 'bg-black/0' : 'bg-black'
        } ${phase === 'fadeIn' ? 'bg-black/0' : ''}`}
      />

      {/* Travel phase - waves/clouds animation */}
      {phase === 'travel' && (
        <div className="relative z-10 text-center animate-fade-in">
          <div className="text-4xl mb-4 animate-float">
            {targetIsland?.emotion === 'wut' && '🌋'}
            {targetIsland?.emotion === 'trauer' && '🌊'}
            {targetIsland?.emotion === 'angst' && '🌲'}
            {targetIsland?.emotion === 'selbstwert' && '🏔️'}
            {targetIsland?.emotion === 'verbindung' && '🌺'}
            {targetIsland?.emotion === 'achtsamkeit' && '🌙'}
            {targetIsland?.emotion === 'identitaet' && '🌈'}
            {targetIsland?.emotion === 'integration' && '🏠'}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Auf dem Weg zur {targetIsland?.name}...
          </h2>
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
            <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
          </div>
        </div>
      )}

      {/* Arrival phase */}
      {phase === 'arrive' && (
        <div className="relative z-10 text-center animate-fade-in max-w-lg">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: targetIsland?.color }}
          >
            {targetIsland?.name}
          </h2>
          {companion && companionComment && (
            <div className="bg-white/10 rounded-2xl p-4 mt-4">
              <p className="text-white/80 italic text-lg">
                "{companionComment}"
              </p>
              <p className="text-white/40 text-sm mt-2">– {companion.name}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
