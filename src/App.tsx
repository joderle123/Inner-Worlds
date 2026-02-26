// ============================================================
// INNER WORLDS – Main App Component
// ============================================================
import { useGameStore } from '@/stores/gameStore';
import TitleScreen from '@/components/screens/TitleScreen';
import AvatarCreator from '@/components/screens/AvatarCreator';
import MoodCheckIn from '@/components/ui/MoodCheckIn';
import IslandMap from '@/components/screens/IslandMap';
import IslandView from '@/components/screens/IslandView';
import ScenarioView from '@/components/screens/ScenarioView';
import JournalScreen from '@/components/screens/JournalScreen';
import FinaleScreen from '@/components/screens/FinaleScreen';
import SOSButton from '@/components/ui/SOSButton';
import TransitionOverlay from '@/components/ui/TransitionOverlay';

export default function App() {
  const screen = useGameStore((s) => s.screen);
  const accessibility = useGameStore((s) => s.accessibility);
  const isTransitioning = useGameStore((s) => s.isTransitioning);

  const fontClass =
    accessibility.fontSize === 'sehr_gross'
      ? 'font-scale-sehr-gross'
      : accessibility.fontSize === 'gross'
        ? 'font-scale-gross'
        : '';

  const contrastClass = accessibility.kontrast === 'hoch' ? 'high-contrast' : '';

  return (
    <div className={`w-full h-full relative ${fontClass} ${contrastClass}`}>
      {screen === 'titel' && <TitleScreen />}
      {screen === 'avatar_creator' && <AvatarCreator />}
      {screen === 'mood_checkin' && <MoodCheckIn />}
      {screen === 'insel_karte' && <IslandMap />}
      {(screen === 'insel_view' || screen === 'schatten_selbst') && <IslandView />}
      {(screen === 'szenario' || screen === 'dialog') && <ScenarioView />}
      {screen === 'tagebuch' && <JournalScreen />}
      {screen === 'finale' && <FinaleScreen />}

      {/* SOS Button always visible except on title */}
      {screen !== 'titel' && <SOSButton />}

      {/* Transition overlay */}
      {isTransitioning && <TransitionOverlay />}
    </div>
  );
}
