// ============================================================
// INNER WORLDS – Title Screen
// ============================================================
import { useState } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function FloatingIslands() {
  return (
    <group>
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0.5} fade speed={0.5} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#FFD700" />
      {/* Floating emotion orbs */}
      {[
        { pos: [-4, 2, -5] as [number, number, number], color: '#E74C3C' },
        { pos: [3, -1, -8] as [number, number, number], color: '#3498DB' },
        { pos: [-2, -2, -6] as [number, number, number], color: '#27AE60' },
        { pos: [5, 1, -10] as [number, number, number], color: '#8E44AD' },
        { pos: [0, 3, -7] as [number, number, number], color: '#FFD700' },
      ].map((orb, i) => (
        <mesh key={i} position={orb.pos}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color={orb.color}
            emissive={orb.color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function TitleScreen() {
  const setScreen = useGameStore((s) => s.setScreen);
  const progress = useGameStore((s) => s.progress);
  const [showCredits, setShowCredits] = useState(false);

  const hasSaveGame = progress.completedIslands.length > 0 || progress.companionId !== null;

  return (
    <div className="w-full h-full relative">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <FloatingIslands />
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {/* Title */}
        <div className="text-center animate-fade-in">
          <h1
            className="text-6xl font-bold mb-2 tracking-wider"
            style={{
              background: 'linear-gradient(135deg, #FFD700, #FFA500, #FFD700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(255, 215, 0, 0.3)',
            }}
          >
            Inner Worlds
          </h1>
          <p className="text-lg text-white/60 mb-12">Deine innere Reise beginnt hier</p>
        </div>

        {/* Menu Buttons */}
        <div className="flex flex-col gap-4 animate-slide-in-up">
          {hasSaveGame && (
            <button
              onClick={() => setScreen('insel_karte')}
              className="px-10 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl text-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-amber-500/30"
            >
              Weiter spielen
            </button>
          )}
          <button
            onClick={() => setScreen('avatar_creator')}
            className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-indigo-500/30"
          >
            {hasSaveGame ? 'Neues Spiel' : 'Spiel starten'}
          </button>
          <button
            onClick={() => setShowCredits(true)}
            className="px-10 py-3 bg-white/10 text-white/80 rounded-xl text-lg hover:bg-white/20 transition-colors"
          >
            Info
          </button>
        </div>
      </div>

      {/* Credits Modal */}
      {showCredits && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20 animate-fade-in">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-md text-center">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">Inner Worlds</h2>
            <p className="text-white/70 mb-4">
              Ein therapeutisches Spiel für Jugendliche mit sozio-emotionalen
              Herausforderungen. Entwickelt für das CDSE Luxemburg.
            </p>
            <p className="text-white/50 text-sm mb-6">
              Basierend auf dem ELDiB-Rahmenwerk für
              entwicklungstherapeutische Lernziele.
            </p>
            <button
              onClick={() => setShowCredits(false)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
