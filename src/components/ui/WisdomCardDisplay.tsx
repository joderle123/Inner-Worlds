// ============================================================
// INNER WORLDS – Wisdom Card Display
// ============================================================
import type { WisdomCard } from '@/types/game';

const categoryColors: Record<string, string> = {
  empathie: '#E91E63',
  einsicht: '#9C27B0',
  mut: '#FF5722',
  resilienz: '#4CAF50',
  achtsamkeit: '#2196F3',
};

const categoryLabels: Record<string, string> = {
  empathie: 'Empathie',
  einsicht: 'Einsicht',
  mut: 'Mut',
  resilienz: 'Resilienz',
  achtsamkeit: 'Achtsamkeit',
};

interface Props {
  card: WisdomCard;
  onCollect: () => void;
}

export default function WisdomCardDisplay({ card, onCollect }: Props) {
  const color = categoryColors[card.kategorie] ?? '#FFD700';

  return (
    <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/60 animate-fade-in">
      <div className="animate-slide-in-up">
        {/* Card */}
        <div
          className="w-72 rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${color}20, ${color}05)`,
            border: `2px solid ${color}40`,
          }}
        >
          {/* Card Header */}
          <div
            className="px-6 py-4 text-center"
            style={{ background: `linear-gradient(135deg, ${color}30, ${color}10)` }}
          >
            <p className="text-xs uppercase tracking-wider mb-1" style={{ color }}>
              Weisheitskarte
            </p>
            <h3 className="text-xl font-bold text-white">{card.titel}</h3>
          </div>

          {/* Card Image Area */}
          <div className="px-6 py-6 text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: `${color}20` }}
            >
              <span className="text-3xl">
                {card.kategorie === 'empathie' && '💗'}
                {card.kategorie === 'einsicht' && '🔮'}
                {card.kategorie === 'mut' && '🦁'}
                {card.kategorie === 'resilienz' && '🌱'}
                {card.kategorie === 'achtsamkeit' && '🧘'}
              </span>
            </div>

            {/* Quote */}
            <p className="text-white/80 italic text-lg leading-relaxed mb-4">
              "{card.zitat}"
            </p>

            {/* Technique (subtly named) */}
            <p className="text-white/40 text-xs">
              {card.therapeutischeTechnik}
            </p>
          </div>

          {/* Category badge */}
          <div className="px-6 pb-4 flex justify-center">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor: `${color}20`,
                color,
              }}
            >
              {categoryLabels[card.kategorie]}
            </span>
          </div>
        </div>

        {/* Collect button */}
        <button
          onClick={onCollect}
          className="w-72 mt-4 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-bold hover:scale-[1.02] transition-transform shadow-lg"
        >
          Karte einsammeln
        </button>
      </div>
    </div>
  );
}
