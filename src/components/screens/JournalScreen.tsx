// ============================================================
// INNER WORLDS – Journal Screen
// "Persönliches Logbuch des Seelentauchers"
// ============================================================
import { useState } from 'react';
import { useGameStore } from '@/stores/gameStore';

type JournalTab = 'eintraege' | 'karten' | 'mood' | 'brief';

const moodEmojis: Record<number, string> = {
  1: '😞', 2: '😕', 3: '😐', 4: '🙂', 5: '😊',
};

export default function JournalScreen() {
  const { journal, progress, setScreen, stats, addJournalEntry } = useGameStore();
  const [activeTab, setActiveTab] = useState<JournalTab>('eintraege');
  const [briefText, setBriefText] = useState('');

  const tabs: { id: JournalTab; label: string }[] = [
    { id: 'eintraege', label: 'Einträge' },
    { id: 'karten', label: 'Weisheitskarten' },
    { id: 'mood', label: 'Stimmung' },
    { id: 'brief', label: 'Brief an mich' },
  ];

  const handleSaveBrief = () => {
    if (briefText.trim()) {
      addJournalEntry({
        id: `brief_${Date.now()}`,
        datum: new Date().toLocaleDateString('de-DE'),
        typ: 'brief',
        titel: 'Brief an mein zukünftiges Ich',
        inhalt: briefText,
      });
      setBriefText('');
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-indigo-950 to-purple-950 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <button
          onClick={() => setScreen(useGameStore.getState().previousScreen ?? 'insel_karte')}
          className="px-4 py-2 bg-white/10 text-white/80 rounded-xl text-sm hover:bg-white/20 transition-colors"
        >
          Zurück
        </button>
        <h1 className="text-xl font-bold text-amber-400">
          Logbuch des Seelentauchers
        </h1>
        <div className="w-20" /> {/* Spacer */}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-sm font-bold transition-colors ${
              activeTab === tab.id
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Entries */}
        {activeTab === 'eintraege' && (
          <div className="space-y-3 animate-fade-in">
            {journal.length === 0 ? (
              <div className="text-center text-white/30 py-12">
                <p className="text-4xl mb-4">📖</p>
                <p>Dein Logbuch ist noch leer.</p>
                <p className="text-sm mt-2">Erlebe Szenarien, um Einträge zu sammeln.</p>
              </div>
            ) : (
              [...journal].reverse().map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white/5 rounded-xl p-4 border border-white/5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-white/30">{entry.datum}</span>
                    <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-white/40">
                      {entry.typ === 'szenario' && 'Begegnung'}
                      {entry.typ === 'transfer' && 'Reflexion'}
                      {entry.typ === 'brief' && 'Brief'}
                      {entry.typ === 'notiz' && 'Notiz'}
                      {entry.typ === 'mood' && 'Stimmung'}
                    </span>
                  </div>
                  <h3 className="text-white/80 font-bold">{entry.titel}</h3>
                  <p className="text-white/60 text-sm mt-1">{entry.inhalt}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Wisdom Cards */}
        {activeTab === 'karten' && (
          <div className="animate-fade-in">
            <div className="text-center mb-6">
              <p className="text-white/40 text-sm">
                {progress.wisdomCards.length} von 32 Karten gesammelt
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {progress.wisdomCards.map((cardId) => (
                <div
                  key={cardId}
                  className="bg-white/5 rounded-xl p-4 border border-amber-500/20"
                >
                  <p className="text-amber-400 text-sm font-bold">{cardId}</p>
                </div>
              ))}
              {Array.from({ length: 32 - progress.wisdomCards.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="bg-white/5 rounded-xl p-4 border border-white/5 flex items-center justify-center"
                >
                  <span className="text-white/10 text-2xl">?</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mood Tracking */}
        {activeTab === 'mood' && (
          <div className="animate-fade-in">
            <h3 className="text-white/60 text-sm font-bold mb-4">Deine Stimmung im Verlauf</h3>
            {progress.moodHistory.length === 0 ? (
              <div className="text-center text-white/30 py-12">
                <p>Noch keine Mood Check-Ins.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {/* Simple mood chart */}
                <div className="flex items-end gap-1 h-32 bg-white/5 rounded-xl p-4">
                  {progress.moodHistory.slice(-20).map((entry, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t transition-all"
                      style={{
                        height: `${(entry.level / 5) * 100}%`,
                        backgroundColor: [
                          '#E74C3C', '#E67E22', '#F1C40F', '#2ECC71', '#3498DB',
                        ][entry.level - 1],
                        opacity: 0.7,
                      }}
                      title={`Level ${entry.level}`}
                    />
                  ))}
                </div>
                {/* History list */}
                <div className="space-y-1 mt-4">
                  {[...progress.moodHistory].reverse().slice(0, 10).map((entry, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm text-white/50"
                    >
                      <span>{moodEmojis[entry.level]}</span>
                      <span>{new Date(entry.timestamp).toLocaleDateString('de-DE')}</span>
                      {entry.notiz && (
                        <span className="text-white/30 truncate">– {entry.notiz}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Letter to Future Self */}
        {activeTab === 'brief' && (
          <div className="animate-fade-in max-w-lg mx-auto">
            <h3 className="text-white/80 font-bold mb-2">Brief an mein zukünftiges Ich</h3>
            <p className="text-white/40 text-sm mb-6">
              Schreib dir selbst einen Brief. Was möchtest du dir sagen?
              Was möchtest du nicht vergessen? Niemand außer dir wird das lesen.
            </p>
            <textarea
              value={briefText}
              onChange={(e) => setBriefText(e.target.value)}
              placeholder="Liebes zukünftiges Ich..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-amber-400/50 transition-colors resize-none"
              rows={8}
            />
            <button
              onClick={handleSaveBrief}
              disabled={!briefText.trim()}
              className="mt-4 w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-bold hover:scale-[1.02] transition-transform disabled:opacity-30"
            >
              Brief speichern
            </button>

            {/* Saved letters */}
            <div className="mt-8 space-y-3">
              {journal
                .filter((e) => e.typ === 'brief')
                .reverse()
                .map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white/5 rounded-xl p-4 border border-amber-500/10"
                  >
                    <p className="text-white/30 text-xs mb-1">{entry.datum}</p>
                    <p className="text-white/70 text-sm whitespace-pre-wrap">{entry.inhalt}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Stats footer */}
      <div className="p-4 border-t border-white/10">
        <div className="flex justify-center gap-6 text-xs text-white/40">
          <span>Empathie: {stats.empathie}</span>
          <span>Einsicht: {stats.einsicht}</span>
          <span>Mut: {stats.mut}</span>
          <span>Resilienz: {stats.resilienz}</span>
          <span>Achtsamkeit: {stats.achtsamkeit}</span>
        </div>
      </div>
    </div>
  );
}
