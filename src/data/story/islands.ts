// ============================================================
// INNER WORLDS – Island Definitions
// ============================================================
import type { Island } from '@/types/game';

export const islands: Island[] = [
  {
    id: 'vulkan',
    name: 'Vulkaninsel',
    emotion: 'wut',
    description: 'Eine Insel aus glühender Lava und rissiger Erde. Der Vulkan in der Mitte brüllt ständig – aber niemand hört hin. Unter der Oberfläche brodelt mehr als nur Feuer.',
    color: '#E74C3C',
    unlocked: true,
    completed: false,
    ambiance: {
      timeOfDay: 'daemmerung',
      weather: 'asche',
      musicTrack: 'vulkan_ambient',
      ambientSounds: ['lava_bubbling', 'distant_rumble', 'wind_hot'],
    },
    shadowSelfScene: {
      islandId: 'vulkan',
      appearance: { glitchIntensity: 1.0, colorAmount: 0.0, description: '' },
      dialogue: [],
      botschaft: '',
      lernerfahrung: '',
    },
    mystery: {
      islandId: 'vulkan',
      titel: '',
      kapitel: [],
      metapher: '',
    },
  },
  {
    id: 'ozean',
    name: 'Ozeaninsel',
    emotion: 'trauer',
    description: 'Endlose Weite aus tiefem Blau. Wellen, die kommen und gehen wie Erinnerungen. Manchmal sanft, manchmal überwältigend. Unter der Oberfläche liegt mehr, als man sehen kann.',
    color: '#3498DB',
    unlocked: false,
    completed: false,
    ambiance: {
      timeOfDay: 'abend',
      weather: 'regen',
      musicTrack: 'ozean_ambient',
      ambientSounds: ['waves_gentle', 'rain_soft', 'seagulls_distant'],
    },
    shadowSelfScene: {
      islandId: 'ozean',
      appearance: { glitchIntensity: 0.85, colorAmount: 0.15, description: '' },
      dialogue: [],
      botschaft: '',
      lernerfahrung: '',
    },
    mystery: {
      islandId: 'ozean',
      titel: '',
      kapitel: [],
      metapher: '',
    },
  },
  {
    id: 'wald',
    name: 'Waldinsel',
    emotion: 'angst',
    description: 'Ein dichter, uralter Wald voller Schatten und Flüstern. Godrays brechen durch die Baumkronen. Je tiefer du gehst, desto dichter wird der Nebel – und desto lauter die Stimmen.',
    color: '#27AE60',
    unlocked: false,
    completed: false,
    ambiance: {
      timeOfDay: 'morgen',
      weather: 'nebel',
      musicTrack: 'wald_ambient',
      ambientSounds: ['leaves_rustling', 'owl_distant', 'crickets', 'wind_through_trees'],
    },
    shadowSelfScene: {
      islandId: 'wald',
      appearance: { glitchIntensity: 0.7, colorAmount: 0.3, description: '' },
      dialogue: [],
      botschaft: '',
      lernerfahrung: '',
    },
    mystery: {
      islandId: 'wald',
      titel: '',
      kapitel: [],
      metapher: '',
    },
  },
  {
    id: 'berg',
    name: 'Berginsel',
    emotion: 'selbstwert',
    description: 'Ein gewaltiger Berg, der über den Wolken ragt. Kalt, windig, aber mit einer atemberaubenden Aussicht. Am Gipfel steht ein Spiegel – und was er zeigt, ist nicht immer das, was du erwartest.',
    color: '#95A5A6',
    unlocked: false,
    completed: false,
    ambiance: {
      timeOfDay: 'mittag',
      weather: 'klar',
      musicTrack: 'berg_ambient',
      ambientSounds: ['wind_mountain', 'eagle_cry', 'snow_crunch'],
    },
    shadowSelfScene: {
      islandId: 'berg',
      appearance: { glitchIntensity: 0.55, colorAmount: 0.45, description: '' },
      dialogue: [],
      botschaft: '',
      lernerfahrung: '',
    },
    mystery: {
      islandId: 'berg',
      titel: '',
      kapitel: [],
      metapher: '',
    },
  },
  {
    id: 'garten',
    name: 'Garteninsel',
    emotion: 'verbindung',
    description: 'Ein verwilderter Garten voller gebrochener Brücken und verwelkter Blumen. Aber zwischen den Rissen wachsen bereits neue Knospen. Hier geht es um die Verbindungen, die wir aufbauen – und die, die wir verloren haben.',
    color: '#E67E22',
    unlocked: false,
    completed: false,
    ambiance: {
      timeOfDay: 'morgen',
      weather: 'sonnenschein',
      musicTrack: 'garten_ambient',
      ambientSounds: ['birds_singing', 'water_stream', 'bees_buzzing'],
    },
    shadowSelfScene: {
      islandId: 'garten',
      appearance: { glitchIntensity: 0.4, colorAmount: 0.6, description: '' },
      dialogue: [],
      botschaft: '',
      lernerfahrung: '',
    },
    mystery: {
      islandId: 'garten',
      titel: '',
      kapitel: [],
      metapher: '',
    },
  },
  {
    id: 'nacht',
    name: 'Nachtinsel',
    emotion: 'achtsamkeit',
    description: 'Ewige Nacht, aber nicht dunkel – biolumineszierende Pilze, Sternbilder und eine Milchstraße, die den Himmel durchzieht. Ein Ort der Stille, wenn du dich traust, sie zuzulassen.',
    color: '#8E44AD',
    unlocked: false,
    completed: false,
    ambiance: {
      timeOfDay: 'immer_nacht',
      weather: 'klar',
      musicTrack: 'nacht_ambient',
      ambientSounds: ['crickets_night', 'owl_hoot', 'water_drip_cave'],
    },
    shadowSelfScene: {
      islandId: 'nacht',
      appearance: { glitchIntensity: 0.25, colorAmount: 0.75, description: '' },
      dialogue: [],
      botschaft: '',
      lernerfahrung: '',
    },
    mystery: {
      islandId: 'nacht',
      titel: '',
      kapitel: [],
      metapher: '',
    },
  },
  {
    id: 'regenbogen',
    name: 'Regenbogeninsel',
    emotion: 'identitaet',
    description: 'Eine Insel, die ständig ihre Farben wechselt. Nichts bleibt gleich – Landschaften morphen, Wege ändern sich. Ein Ort, der so vielfältig ist wie du selbst.',
    color: '#F39C12',
    unlocked: false,
    completed: false,
    ambiance: {
      timeOfDay: 'mittag',
      weather: 'sonnenschein',
      musicTrack: 'regenbogen_ambient',
      ambientSounds: ['wind_chimes', 'crystal_tones', 'birds_exotic'],
    },
    shadowSelfScene: {
      islandId: 'regenbogen',
      appearance: { glitchIntensity: 0.1, colorAmount: 0.9, description: '' },
      dialogue: [],
      botschaft: '',
      lernerfahrung: '',
    },
    mystery: {
      islandId: 'regenbogen',
      titel: '',
      kapitel: [],
      metapher: '',
    },
  },
  {
    id: 'zuhause',
    name: 'Zuhause-Insel',
    emotion: 'integration',
    description: 'Die letzte Insel. Sie sieht aus wie ein warmes Zuhause – aber nicht ein bestimmtes Haus. Es ist das Gefühl von Zuhause. Hier kommt alles zusammen.',
    color: '#FFD700',
    unlocked: false,
    completed: false,
    ambiance: {
      timeOfDay: 'abend',
      weather: 'sonnenschein',
      musicTrack: 'zuhause_ambient',
      ambientSounds: ['fireplace_crackle', 'wind_gentle', 'music_box_distant'],
    },
    shadowSelfScene: {
      islandId: 'zuhause',
      appearance: { glitchIntensity: 0.0, colorAmount: 1.0, description: '' },
      dialogue: [],
      botschaft: '',
      lernerfahrung: '',
    },
    mystery: {
      islandId: 'zuhause',
      titel: '',
      kapitel: [],
      metapher: '',
    },
  },
];

export const getIsland = (id: string): Island | undefined =>
  islands.find((i) => i.id === id);

export const getNextIsland = (currentId: string): Island | undefined => {
  const idx = islands.findIndex((i) => i.id === currentId);
  return idx < islands.length - 1 ? islands[idx + 1] : undefined;
};
