// ============================================================
// INNER WORLDS – Island Map (Hub Screen)
// ============================================================
import { useGameStore } from '@/stores/gameStore';
import { islands } from '@/data/story/islands';
import { companions } from '@/data/companions/companions';
import { Canvas } from '@react-three/fiber';
import { Stars, Float, Text } from '@react-three/drei';
import type { IslandId } from '@/types/game';

function IslandOrb({
  island,
  position,
  isCompleted,
  isUnlocked,
  onClick,
}: {
  island: (typeof islands)[0];
  position: [number, number, number];
  isCompleted: boolean;
  isUnlocked: boolean;
  onClick: () => void;
}) {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position} onClick={isUnlocked ? onClick : undefined}>
        {/* Island Orb */}
        <mesh>
          <sphereGeometry args={[0.4, 24, 24]} />
          <meshStandardMaterial
            color={isUnlocked ? island.color : '#444'}
            emissive={isUnlocked ? island.color : '#222'}
            emissiveIntensity={isCompleted ? 0.8 : isUnlocked ? 0.4 : 0.1}
            transparent
            opacity={isUnlocked ? 1 : 0.4}
          />
        </mesh>
        {/* Glow ring for completed */}
        {isCompleted && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.55, 0.03, 8, 32]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={1}
            />
          </mesh>
        )}
        {/* Lock for locked islands */}
        {!isUnlocked && (
          <mesh position={[0, 0, 0.45]}>
            <boxGeometry args={[0.15, 0.2, 0.05]} />
            <meshStandardMaterial color="#666" />
          </mesh>
        )}
        {/* Label */}
        <Text
          position={[0, -0.65, 0]}
          fontSize={0.15}
          color={isUnlocked ? 'white' : '#666'}
          anchorX="center"
          anchorY="top"
          font="/fonts/ComicNeue-Bold.ttf"
        >
          {island.name}
        </Text>
      </group>
    </Float>
  );
}

function MapScene({ onIslandClick }: { onIslandClick: (id: IslandId) => void }) {
  const progress = useGameStore((s) => s.progress);

  // Arrange islands in a circle
  const positions: [number, number, number][] = [
    [-2.5, 1.5, 0],   // Vulkan
    [2.5, 1.5, 0],    // Ozean
    [-3.5, 0, 0],     // Wald
    [3.5, 0, 0],      // Berg
    [-2.5, -1.5, 0],  // Garten
    [2.5, -1.5, 0],   // Nacht
    [-1, -2.5, 0],    // Regenbogen
    [1, -2.5, 0],     // Zuhause
  ];

  return (
    <>
      <Stars radius={80} depth={40} count={2000} factor={3} saturation={0.3} fade speed={0.3} />
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 5]} intensity={0.6} color="#FFD700" />

      {islands.map((island, i) => {
        const isCompleted = progress.completedIslands.includes(island.id);
        const isUnlocked =
          island.id === 'vulkan' ||
          progress.completedIslands.includes(islands[i - 1]?.id);

        return (
          <IslandOrb
            key={island.id}
            island={island}
            position={positions[i]}
            isCompleted={isCompleted}
            isUnlocked={isUnlocked}
            onClick={() => onIslandClick(island.id)}
          />
        );
      })}

      {/* Center decoration */}
      <Float speed={1} floatIntensity={0.3}>
        <mesh position={[0, 0, -1]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>
      </Float>
    </>
  );
}

export default function IslandMap() {
  const { setScreen, startTransition, progress } = useGameStore();
  const companion = companions.find((c) => c.id === progress.companionId);

  const handleIslandClick = (id: IslandId) => {
    startTransition(id);
    setTimeout(() => {
      setScreen('insel_view');
    }, 800);
  };

  return (
    <div className="w-full h-full relative">
      {/* 3D Map */}
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <MapScene onIslandClick={handleIslandClick} />
      </Canvas>

      {/* HUD Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10">
        {/* Player Stats */}
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-3">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <span>Inseln: {progress.completedIslands.length}/8</span>
            <span className="text-white/30">|</span>
            <span>Karten: {progress.wisdomCards.length}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setScreen('tagebuch')}
            className="px-4 py-2 bg-black/40 backdrop-blur-sm text-white/80 rounded-xl text-sm hover:bg-black/60 transition-colors"
          >
            Tagebuch
          </button>
          <button
            onClick={() => setScreen('mood_checkin')}
            className="px-4 py-2 bg-black/40 backdrop-blur-sm text-white/80 rounded-xl text-sm hover:bg-black/60 transition-colors"
          >
            Mood Check
          </button>
        </div>
      </div>

      {/* Companion comment */}
      {companion && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm rounded-2xl px-6 py-3 max-w-md text-center z-10">
          <p className="text-white/70 text-sm italic">
            "Wohin soll die Reise gehen?"
          </p>
          <p className="text-white/40 text-xs mt-1">– {companion.name}</p>
        </div>
      )}

      {/* Title */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-4 text-center z-10">
        <h1 className="text-xl font-bold text-amber-400/80">Deine innere Welt</h1>
      </div>
    </div>
  );
}
