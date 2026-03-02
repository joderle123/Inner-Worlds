// ============================================================
// INNER WORLDS – Island View (3D Island with NPCs)
// ============================================================
import { Suspense, useCallback } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { islands } from '@/data/story/islands';
import { shadowSelfScenes } from '@/data/story/overarchingStory';
import { companions } from '@/data/companions/companions';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Sky, Environment, Float, Text } from '@react-three/drei';
import VolcanoScene from '@/components/three/islands/VolcanoIsland';
import OceanScene from '@/components/three/islands/OceanIsland';
import ForestScene from '@/components/three/islands/ForestIsland';
import MountainScene from '@/components/three/islands/MountainIsland';
import GardenScene from '@/components/three/islands/GardenIsland';
import NightScene from '@/components/three/islands/NightIsland';
import RainbowScene from '@/components/three/islands/RainbowIsland';
import HomeScene from '@/components/three/islands/HomeIsland';
import DialoguePanel from '@/components/ui/DialoguePanel';
import type { IslandId } from '@/types/game';

function NPCMarker({
  position,
  name,
  color,
  onClick,
}: {
  position: [number, number, number];
  name: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <Float speed={2} floatIntensity={0.3}>
      <group position={position} onClick={onClick}>
        {/* NPC body */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[0.4, 0.8, 0.3]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {/* NPC head */}
        <mesh position={[0, 1.0, 0]}>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshStandardMaterial color="#F5D0A9" />
        </mesh>
        {/* Name label */}
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          outlineWidth={0.02}
          outlineColor="black"
        >
          {name}
        </Text>
        {/* Interaction indicator */}
        <mesh position={[0, 1.7, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={1}
          />
        </mesh>
      </group>
    </Float>
  );
}

function IslandScene({ islandId }: { islandId: IslandId }) {
  const island = islands.find((i) => i.id === islandId);
  const isNight = island?.ambiance.timeOfDay === 'immer_nacht';
  const isDaemmerung = island?.ambiance.timeOfDay === 'daemmerung';

  return (
    <>
      {/* Lighting */}
      {isNight ? (
        <>
          <ambientLight intensity={0.15} color="#4A5ACF" />
          <pointLight position={[0, 10, 0]} intensity={0.3} color="#C0C8FF" />
          <Stars radius={60} depth={30} count={4000} factor={5} saturation={0.8} fade />
        </>
      ) : isDaemmerung ? (
        <>
          <ambientLight intensity={0.3} color="#FF6B35" />
          <directionalLight position={[-5, 3, -5]} intensity={0.6} color="#FF4500" />
          <Sky sunPosition={[0, 0.1, -1]} turbidity={10} rayleigh={2} />
        </>
      ) : (
        <>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 8, 5]} intensity={0.8} castShadow />
          <Sky sunPosition={[5, 5, 5]} />
          <Environment preset="sunset" />
        </>
      )}

      {/* Island-specific scene */}
      <Suspense fallback={null}>
        {islandId === 'vulkan' && <VolcanoScene />}
        {islandId === 'ozean' && <OceanScene />}
        {islandId === 'wald' && <ForestScene />}
        {islandId === 'berg' && <MountainScene />}
        {islandId === 'garten' && <GardenScene />}
        {islandId === 'nacht' && <NightScene />}
        {islandId === 'regenbogen' && <RainbowScene />}
        {islandId === 'zuhause' && <HomeScene />}
      </Suspense>
    </>
  );
}

// NPC data per island (names + positions)
const islandNPCPositions: Record<IslandId, { name: string; position: [number, number, number]; color: string; id: string }[]> = {
  vulkan: [
    { id: 'kai', name: 'Kai', position: [-3, 0, 2], color: '#E74C3C' },
    { id: 'mira', name: 'Mira', position: [3, 0, -1], color: '#C0392B' },
    { id: 'dario', name: 'Dario', position: [-2, 0, -3], color: '#E67E22' },
    { id: 'yuki', name: 'Yuki', position: [2, 0, 3], color: '#F39C12' },
  ],
  ozean: [
    { id: 'alina', name: 'Alina', position: [-3, 0, 1], color: '#3498DB' },
    { id: 'tomas', name: 'Tomas', position: [3, 0, -2], color: '#2980B9' },
    { id: 'nour', name: 'Nour', position: [-1, 0, -3], color: '#1ABC9C' },
    { id: 'sam', name: 'Sam', position: [2, 0, 3], color: '#2C3E50' },
  ],
  wald: [
    { id: 'lena', name: 'Lena', position: [-3, 0, 1], color: '#27AE60' },
    { id: 'max', name: 'Max', position: [2, 0, -2], color: '#2ECC71' },
    { id: 'elif', name: 'Elif', position: [-1, 0, -3], color: '#16A085' },
    { id: 'robin', name: 'Robin', position: [3, 0, 2], color: '#1E8449' },
  ],
  berg: [
    { id: 'leonie', name: 'Leonie', position: [-2, 1, 1], color: '#95A5A6' },
    { id: 'jonas', name: 'Jonas', position: [2, 0.5, -1], color: '#7F8C8D' },
    { id: 'amara', name: 'Amara', position: [-1, 0, -2], color: '#BDC3C7' },
    { id: 'finn', name: 'Finn', position: [1, 0, 2], color: '#AAB7B8' },
  ],
  garten: [
    { id: 'liam', name: 'Liam', position: [-3, 0, 1], color: '#E67E22' },
    { id: 'sofia', name: 'Sofia', position: [3, 0, -1], color: '#D35400' },
    { id: 'malik', name: 'Malik', position: [-1, 0, -3], color: '#F39C12' },
    { id: 'zara', name: 'Zara', position: [2, 0, 3], color: '#E74C3C' },
  ],
  nacht: [
    { id: 'leo', name: 'Leo', position: [-3, 0, 1], color: '#8E44AD' },
    { id: 'hanna', name: 'Hanna', position: [3, 0, -2], color: '#9B59B6' },
    { id: 'emre', name: 'Emre', position: [-1, 0, -3], color: '#6C3483' },
    { id: 'ava', name: 'Ava', position: [2, 0, 2], color: '#BB8FCE' },
  ],
  regenbogen: [
    { id: 'jasper', name: 'Jasper', position: [-3, 0, 1], color: '#F39C12' },
    { id: 'luna', name: 'Luna', position: [3, 0, -1], color: '#E91E63' },
    { id: 'amir', name: 'Amir', position: [-1, 0, -3], color: '#FF5722' },
    { id: 'nia', name: 'Nia', position: [2, 0, 3], color: '#9C27B0' },
  ],
  zuhause: [
    { id: 'elena', name: 'Elena', position: [-2, 0, 1], color: '#FFD700' },
    { id: 'paul', name: 'Paul', position: [2, 0, -1], color: '#DAA520' },
    { id: 'mia_h', name: 'Mia', position: [-1, 0, -2], color: '#FFA500' },
    { id: 'omar', name: 'Omar', position: [1, 0, 2], color: '#FF8C00' },
  ],
};

export default function IslandView() {
  const { progress, setScreen, setCurrentNPC, screen, shadowSelfEncountered, encounterShadowSelf } = useGameStore();
  const currentIsland = progress.currentIsland;
  const companion = companions.find((c) => c.id === progress.companionId);

  const island = islands.find((i) => i.id === currentIsland);
  const npcs = currentIsland ? islandNPCPositions[currentIsland] : [];
  const shadowScene = currentIsland ? shadowSelfScenes[currentIsland] : null;
  const hasEncounteredShadow = currentIsland ? shadowSelfEncountered.includes(currentIsland) : false;

  const handleNPCClick = useCallback((npcId: string) => {
    setCurrentNPC(npcId);
    setScreen('szenario');
  }, [setCurrentNPC, setScreen]);

  const handleShadowEncounter = useCallback(() => {
    if (currentIsland && !hasEncounteredShadow) {
      encounterShadowSelf(currentIsland);
    }
  }, [currentIsland, hasEncounteredShadow, encounterShadowSelf]);

  if (!currentIsland || !island) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black">
        <p className="text-white/60">Keine Insel ausgewählt</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {/* 3D Scene */}
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }} shadows>
        <IslandScene islandId={currentIsland} />

        {/* NPC Markers */}
        {npcs.map((npc) => (
          <NPCMarker
            key={npc.id}
            name={npc.name}
            position={npc.position}
            color={npc.color}
            onClick={() => handleNPCClick(npc.id)}
          />
        ))}

        {/* Shadow Self Marker (if not yet encountered) */}
        {shadowScene && !hasEncounteredShadow && (
          <Float speed={1} floatIntensity={1}>
            <group position={[0, 1, -5]} onClick={handleShadowEncounter}>
              <mesh>
                <boxGeometry args={[0.5, 1.2, 0.3]} />
                <meshStandardMaterial color="#000" transparent opacity={0.8} />
              </mesh>
              <mesh position={[0, 0.8, 0]}>
                <sphereGeometry args={[0.25, 12, 12]} />
                <meshStandardMaterial color="#000" />
              </mesh>
              {/* Glowing eyes */}
              <mesh position={[-0.08, 0.85, 0.2]}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} />
              </mesh>
              <mesh position={[0.08, 0.85, 0.2]}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} />
              </mesh>
            </group>
          </Float>
        )}

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>

      {/* HUD */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10">
        <button
          onClick={() => setScreen('insel_karte')}
          className="px-4 py-2 bg-black/40 backdrop-blur-sm text-white/80 rounded-xl text-sm hover:bg-black/60 transition-colors"
        >
          Zurück zur Karte
        </button>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl px-4 py-2">
          <h2 className="font-bold" style={{ color: island.color }}>
            {island.name}
          </h2>
        </div>
      </div>

      {/* Island description */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-lg bg-black/40 backdrop-blur-sm rounded-2xl px-6 py-3 text-center z-10">
        <p className="text-white/70 text-sm">{island.description}</p>
        {companion && (
          <p className="text-white/40 text-xs mt-2 italic">
            Klicke auf einen Charakter, um seine Geschichte zu entdecken.
          </p>
        )}
      </div>

      {/* Shadow Self Dialogue (shown as overlay when encountered) */}
      {screen === 'schatten_selbst' && shadowScene && (
        <DialoguePanel
          lines={shadowScene.dialogue}
          onComplete={() => setScreen('insel_view')}
          isShadowSelf
        />
      )}
    </div>
  );
}
