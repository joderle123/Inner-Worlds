// ============================================================
// INNER WORLDS – Finale Screen (Shadow Self Integration)
// ============================================================
import { useState, useEffect } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { finaleScene, finaleChoices, postFinaleSequence } from '@/data/story/overarchingStory';
import { companions } from '@/data/companions/companions';
import DialoguePanel from '@/components/ui/DialoguePanel';
import { Canvas } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';

function FinaleScene3D({ phase }: { phase: string }) {
  return (
    <>
      <Stars radius={60} depth={30} count={3000} factor={5} saturation={0.8} fade speed={0.2} />
      <ambientLight intensity={phase === 'merged' ? 0.8 : 0.3} color={phase === 'merged' ? '#FFD700' : '#4A5ACF'} />

      {/* Player avatar (simplified) */}
      <Float speed={1} floatIntensity={0.3}>
        <group position={[-1.5, 0, 0]}>
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[0.6, 1, 0.4]} />
            <meshStandardMaterial color={phase === 'merged' ? '#FFD700' : '#4A90D9'} />
          </mesh>
          <mesh position={[0, 1.1, 0]}>
            <sphereGeometry args={[0.3, 12, 12]} />
            <meshStandardMaterial color="#F5D0A9" />
          </mesh>
        </group>
      </Float>

      {/* Shadow Self */}
      {phase !== 'merged' && (
        <Float speed={1.5} floatIntensity={0.5}>
          <group position={[1.5, 0, 0]}>
            <mesh position={[0, 0.4, 0]}>
              <boxGeometry args={[0.6, 1, 0.4]} />
              <meshStandardMaterial
                color="#111"
                transparent
                opacity={phase === 'confrontation' ? 0.8 : 0.5}
              />
            </mesh>
            <mesh position={[0, 1.1, 0]}>
              <sphereGeometry args={[0.3, 12, 12]} />
              <meshStandardMaterial color="#111" />
            </mesh>
            {/* Glowing eyes */}
            <mesh position={[-0.1, 1.15, 0.25]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} />
            </mesh>
            <mesh position={[0.1, 1.15, 0.25]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} />
            </mesh>
          </group>
        </Float>
      )}

      {/* Golden merged avatar */}
      {phase === 'merged' && (
        <Float speed={0.8} floatIntensity={0.2}>
          <group position={[0, 0, 0]}>
            <mesh position={[0, 0.4, 0]}>
              <boxGeometry args={[0.7, 1.1, 0.45]} />
              <meshStandardMaterial
                color="#FFD700"
                emissive="#FFD700"
                emissiveIntensity={0.3}
              />
            </mesh>
            <mesh position={[0, 1.15, 0]}>
              <sphereGeometry args={[0.35, 16, 16]} />
              <meshStandardMaterial
                color="#F5D0A9"
                emissive="#FFD700"
                emissiveIntensity={0.1}
              />
            </mesh>
            {/* Golden aura */}
            <mesh>
              <sphereGeometry args={[1.5, 16, 16]} />
              <meshStandardMaterial
                color="#FFD700"
                transparent
                opacity={0.05}
                emissive="#FFD700"
                emissiveIntensity={0.2}
              />
            </mesh>
          </group>
        </Float>
      )}

      {/* Golden particles for merged phase */}
      {phase === 'merged' && (
        <>
          {Array.from({ length: 20 }).map((_, i) => (
            <Float key={i} speed={1 + Math.random()} floatIntensity={1}>
              <mesh
                position={[
                  (Math.random() - 0.5) * 6,
                  (Math.random() - 0.5) * 4,
                  (Math.random() - 0.5) * 4,
                ]}
              >
                <sphereGeometry args={[0.03, 6, 6]} />
                <meshStandardMaterial
                  color="#FFD700"
                  emissive="#FFD700"
                  emissiveIntensity={2}
                />
              </mesh>
            </Float>
          ))}
        </>
      )}
    </>
  );
}

export default function FinaleScreen() {
  const { setScreen, setAvatar, avatar } = useGameStore();
  const companion = companions.find((c) => c.id === useGameStore.getState().progress.companionId);

  const [phase, setPhase] = useState<'intro' | 'confrontation' | 'choice' | 'merge' | 'merged' | 'epilogue' | 'end'>('intro');
  const [showDialogue, setShowDialogue] = useState(true);

  useEffect(() => {
    if (phase === 'merge') {
      setTimeout(() => setPhase('merged'), 3000);
    }
    if (phase === 'merged') {
      // Apply golden shimmer to avatar
      if (avatar) {
        setAvatar({ ...avatar, goldenShimmer: true });
      }
      setTimeout(() => setPhase('epilogue'), 2000);
    }
  }, [phase, avatar, setAvatar]);

  const handleIntroComplete = () => {
    setPhase('confrontation');
    setShowDialogue(true);
  };

  const handleChoiceMade = () => {
    setPhase('merge');
    setShowDialogue(false);
  };

  const handleEpilogueComplete = () => {
    setPhase('end');
  };

  return (
    <div className="w-full h-full relative">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
          <FinaleScene3D phase={phase} />
        </Canvas>
      </div>

      {/* Intro Dialogue */}
      {phase === 'intro' && showDialogue && (
        <DialoguePanel
          lines={finaleScene}
          onComplete={handleIntroComplete}
          isShadowSelf
        />
      )}

      {/* Choice */}
      {phase === 'confrontation' && (
        <div className="absolute inset-0 flex items-end justify-center z-30 pb-12">
          <div className="w-full max-w-2xl mx-4 space-y-3 animate-fade-in">
            <p className="text-center text-white/50 text-sm mb-4">
              Was sagst du zu deinem Schatten-Selbst?
            </p>
            {finaleChoices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => {
                  setPhase('choice');
                  // Show the follow-up dialogue
                  setShowDialogue(true);
                }}
                className="w-full text-left px-6 py-4 bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-xl text-white/90 hover:bg-indigo-900/60 hover:border-amber-500/30 transition-all"
              >
                <p className="font-medium text-lg">{choice.text}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Choice follow-up */}
      {phase === 'choice' && showDialogue && (
        <DialoguePanel
          lines={finaleChoices[0].followUp.map((f) => ({
            ...f,
            sprecher: f.sprecher,
            text: f.text,
          }))}
          onComplete={handleChoiceMade}
          isShadowSelf
        />
      )}

      {/* Merge animation */}
      {phase === 'merge' && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="text-center animate-pulse">
            <div className="text-6xl mb-4">✨</div>
            <p className="text-amber-400 text-xl font-bold">Verschmelzung...</p>
          </div>
        </div>
      )}

      {/* Merged state */}
      {phase === 'merged' && (
        <div className="absolute inset-0 flex items-center justify-center z-30 animate-fade-in">
          <div className="text-center">
            <p className="text-2xl text-amber-400 font-bold">Du bist ganz.</p>
            <p className="text-white/50 mt-2">Nicht perfekt. Aber ganz.</p>
          </div>
        </div>
      )}

      {/* Epilogue */}
      {phase === 'epilogue' && (
        <DialoguePanel
          lines={postFinaleSequence}
          onComplete={handleEpilogueComplete}
        />
      )}

      {/* End */}
      {phase === 'end' && (
        <div className="absolute inset-0 flex items-center justify-center z-30 animate-fade-in">
          <div className="text-center max-w-md">
            <h2
              className="text-4xl font-bold mb-4"
              style={{
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Inner Worlds
            </h2>
            <p className="text-white/60 mb-2">Deine Reise ist vollendet.</p>
            <p className="text-white/40 text-sm mb-8">
              Aber die echte Reise – die da draußen – geht weiter.
              Du hast jetzt etwas, das du vorher nicht hattest:
              Du kennst dich selbst.
            </p>
            {companion && (
              <p className="text-amber-400/60 italic mb-8">
                "{companion.name} bleibt an deiner Seite – auch außerhalb dieses Spiels."
              </p>
            )}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setScreen('tagebuch')}
                className="px-8 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
              >
                Tagebuch ansehen
              </button>
              <button
                onClick={() => setScreen('insel_karte')}
                className="px-8 py-3 bg-white/5 text-white/60 rounded-xl hover:bg-white/10 transition-colors"
              >
                Weiter erkunden
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
