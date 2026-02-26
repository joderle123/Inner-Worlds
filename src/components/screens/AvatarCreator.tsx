// ============================================================
// INNER WORLDS – Avatar Creator
// ============================================================
import { useState } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { PlayerAvatar } from '@/types/game';
import CompanionSelect from '@/components/ui/CompanionSelect';

const HEAD_SHAPES = ['rund', 'eckig', 'dreieckig', 'oval'] as const;
const SKIN_COLORS = ['#F5D0A9', '#D4A574', '#8D6E63', '#5D4037', '#FFCC80', '#FFF3E0'];
const HAIR_COLORS = ['#2C1810', '#5C4033', '#8B7355', '#FFD700', '#FF6B35', '#C62828', '#1565C0', '#7B1FA2', '#2E7D32'];
const HAIR_STYLES = ['kurz', 'lang', 'locken', 'zopf', 'irokese', 'glatze'];
const EYE_COLORS = ['#4A90D9', '#2E7D32', '#5D4037', '#1A1A1A', '#7B1FA2', '#FF6B35'];
const CLOTHING_COLORS = ['#E74C3C', '#3498DB', '#27AE60', '#9B59B6', '#F39C12', '#1ABC9C', '#E91E63', '#FF5722'];
const ACCESSORIES = ['keine', 'brille', 'muetze', 'kopfhoerer', 'schal'];

function AvatarPreview({ avatar }: { avatar: PlayerAvatar }) {
  return (
    <group>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      {/* Body */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[0.8, 1.2, 0.5]} />
        <meshStandardMaterial color={avatar.kleidungFarbe} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.6, 0]}>
        {avatar.kopfForm === 'rund' && <sphereGeometry args={[0.45, 16, 16]} />}
        {avatar.kopfForm === 'eckig' && <boxGeometry args={[0.8, 0.8, 0.7]} />}
        {avatar.kopfForm === 'dreieckig' && <coneGeometry args={[0.45, 0.8, 4]} />}
        {avatar.kopfForm === 'oval' && <sphereGeometry args={[0.4, 16, 12]} />}
        <meshStandardMaterial color={avatar.hautfarbe} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.15, 0.65, 0.35]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color={avatar.augenFarbe} />
      </mesh>
      <mesh position={[0.15, 0.65, 0.35]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color={avatar.augenFarbe} />
      </mesh>
      {/* Hair */}
      {avatar.haarStil !== 'glatze' && (
        <mesh position={[0, 0.95, 0]}>
          <boxGeometry args={[0.7, 0.3, 0.6]} />
          <meshStandardMaterial color={avatar.haarFarbe} />
        </mesh>
      )}
      {/* Legs */}
      <mesh position={[-0.2, -1.4, 0]}>
        <boxGeometry args={[0.3, 0.6, 0.4]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
      <mesh position={[0.2, -1.4, 0]}>
        <boxGeometry args={[0.3, 0.6, 0.4]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
    </group>
  );
}

export default function AvatarCreator() {
  const { setAvatar, setScreen, setPlayerName } = useGameStore();
  const [step, setStep] = useState<'name' | 'body' | 'companion'>('name');
  const [name, setName] = useState('');

  const [avatar, setAvatarState] = useState<PlayerAvatar>({
    kopfForm: 'rund',
    hautfarbe: SKIN_COLORS[0],
    haarFarbe: HAIR_COLORS[0],
    haarStil: HAIR_STYLES[0],
    augenFarbe: EYE_COLORS[0],
    kleidungFarbe: CLOTHING_COLORS[0],
    goldenShimmer: false,
  });

  const updateAvatar = (key: keyof PlayerAvatar, value: string) => {
    setAvatarState((prev) => ({ ...prev, [key]: value }));
  };

  const handleComplete = () => {
    setAvatar(avatar);
    setPlayerName(name);
    setStep('companion');
  };

  const handleCompanionSelected = () => {
    setScreen('mood_checkin');
  };

  if (step === 'name') {
    return (
      <div className="w-full h-full bg-gradient-to-b from-indigo-950 to-purple-950 flex items-center justify-center">
        <div className="text-center animate-fade-in max-w-md">
          <h2 className="text-3xl font-bold text-white mb-2">Wie heißt du?</h2>
          <p className="text-white/60 mb-8">
            Dein Name bleibt geheim – nur du und dein Companion kennen ihn.
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Dein Name..."
            maxLength={20}
            className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white text-center text-xl placeholder-white/30 focus:outline-none focus:border-amber-400 transition-colors"
            autoFocus
          />
          <button
            onClick={() => name.trim() && setStep('body')}
            disabled={!name.trim()}
            className="mt-6 px-8 py-3 bg-indigo-600 text-white rounded-xl text-lg font-bold hover:bg-indigo-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Weiter
          </button>
        </div>
      </div>
    );
  }

  if (step === 'companion') {
    return <CompanionSelect onComplete={handleCompanionSelected} />;
  }

  return (
    <div className="w-full h-full bg-gradient-to-b from-indigo-950 to-purple-950 flex">
      {/* 3D Preview */}
      <div className="w-1/2 h-full relative">
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
          <AvatarPreview avatar={avatar} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Canvas>
        <div className="absolute bottom-4 left-0 right-0 text-center text-white/40 text-sm">
          Ziehe zum Drehen
        </div>
      </div>

      {/* Options Panel */}
      <div className="w-1/2 h-full overflow-y-auto p-6 space-y-6">
        <h2 className="text-2xl font-bold text-white">Erstelle deinen Avatar</h2>

        {/* Head Shape */}
        <div>
          <label className="text-white/70 text-sm font-bold mb-2 block">Kopfform</label>
          <div className="flex gap-2">
            {HEAD_SHAPES.map((shape) => (
              <button
                key={shape}
                onClick={() => updateAvatar('kopfForm', shape)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                  avatar.kopfForm === shape
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {shape}
              </button>
            ))}
          </div>
        </div>

        {/* Skin Color */}
        <div>
          <label className="text-white/70 text-sm font-bold mb-2 block">Hautfarbe</label>
          <div className="flex gap-2 flex-wrap">
            {SKIN_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => updateAvatar('hautfarbe', color)}
                className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${
                  avatar.hautfarbe === color ? 'border-white scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Hair Color */}
        <div>
          <label className="text-white/70 text-sm font-bold mb-2 block">Haarfarbe</label>
          <div className="flex gap-2 flex-wrap">
            {HAIR_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => updateAvatar('haarFarbe', color)}
                className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${
                  avatar.haarFarbe === color ? 'border-white scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Hair Style */}
        <div>
          <label className="text-white/70 text-sm font-bold mb-2 block">Frisur</label>
          <div className="flex gap-2 flex-wrap">
            {HAIR_STYLES.map((style) => (
              <button
                key={style}
                onClick={() => updateAvatar('haarStil', style)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                  avatar.haarStil === style
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Eye Color */}
        <div>
          <label className="text-white/70 text-sm font-bold mb-2 block">Augenfarbe</label>
          <div className="flex gap-2 flex-wrap">
            {EYE_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => updateAvatar('augenFarbe', color)}
                className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${
                  avatar.augenFarbe === color ? 'border-white scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Clothing Color */}
        <div>
          <label className="text-white/70 text-sm font-bold mb-2 block">Kleidungsfarbe</label>
          <div className="flex gap-2 flex-wrap">
            {CLOTHING_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => updateAvatar('kleidungFarbe', color)}
                className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${
                  avatar.kleidungFarbe === color ? 'border-white scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Accessory */}
        <div>
          <label className="text-white/70 text-sm font-bold mb-2 block">Accessoire</label>
          <div className="flex gap-2 flex-wrap">
            {ACCESSORIES.map((acc) => (
              <button
                key={acc}
                onClick={() => updateAvatar('accessoire', acc)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                  (avatar.accessoire ?? 'keine') === acc
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {acc}
              </button>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleComplete}
          className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl text-lg font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/30"
        >
          Avatar fertig!
        </button>
      </div>
    </div>
  );
}
