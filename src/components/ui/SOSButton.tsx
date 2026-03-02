// ============================================================
// INNER WORLDS – SOS Button (Always accessible)
// ============================================================
import { useState } from 'react';

const sosContacts = [
  {
    name: 'Kanner-Jugendtelefon (Luxemburg)',
    beschreibung: 'Kostenlose und anonyme Hilfe für Kinder und Jugendliche',
    nummer: '116 111',
  },
  {
    name: 'BEE SECURE Helpline',
    beschreibung: 'Hilfe bei Online-Problemen und Cybermobbing',
    nummer: '8002 1234',
  },
  {
    name: 'SOS Détresse',
    beschreibung: 'Zuhören, helfen, unterstützen – rund um die Uhr',
    nummer: '45 45 45',
  },
  {
    name: 'Dein/e Therapeut/in im CDSE',
    beschreibung: 'Sprich mit deiner Bezugsperson im CDSE',
  },
];

export default function SOSButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* SOS Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 bg-red-600 hover:bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg shadow-red-500/30 transition-colors"
        aria-label="SOS – Hilfe holen"
      >
        SOS
      </button>

      {/* SOS Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] animate-fade-in p-4">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-400 mb-2">
              Brauchst du Hilfe?
            </h2>
            <p className="text-white/70 mb-6">
              Wenn es dir nicht gut geht oder du jemanden zum Reden brauchst – hier sind
              Menschen, die dir zuhören. Kostenlos und vertraulich.
            </p>

            <div className="space-y-3 mb-6">
              {sosContacts.map((contact) => (
                <div
                  key={contact.name}
                  className="bg-white/5 rounded-xl p-4"
                >
                  <h3 className="font-bold text-white">{contact.name}</h3>
                  <p className="text-white/60 text-sm">{contact.beschreibung}</p>
                  {contact.nummer && (
                    <p className="text-red-400 font-bold text-lg mt-1">
                      {contact.nummer}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <p className="text-white/50 text-xs mb-4">
              Es ist keine Schwäche, um Hilfe zu bitten. Es ist Stärke.
            </p>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </>
  );
}
