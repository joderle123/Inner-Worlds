// ============================================================
// INNER WORLDS – Overarching Story Arc & Shadow Self
// Die durchgehende Rahmenerzählung, die alle 8 Inseln verbindet
// ============================================================
import type { ShadowSelfScene, IslandId, DialogueLine } from '@/types/game';

// --- PRÄMISSE ---
// Der Spieler ist ein Kind, das eines Nachts in eine innere Traumwelt
// gezogen wird – seine eigene Gefühlswelt, die aus dem Gleichgewicht
// geraten ist. Jede Insel repräsentiert eine Emotion, die "korrumpiert"
// wurde – nicht weil die Emotion schlecht ist, sondern weil sie
// unterdrückt, missverstanden oder überwältigend geworden ist.
// Der Spieler muss jede Insel nicht "heilen", sondern verstehen
// und integrieren.

// --- KERNKONFLIKT ---
// Ein "Schatten-Selbst" (kein Bösewicht, sondern der verdrängte Teil
// des Spielers) erscheint auf jeder Insel und stellt unbequeme
// Wahrheiten dar. Am Ende des Spiels wird das Schatten-Selbst nicht
// besiegt, sondern umarmt.

export const introSequence: DialogueLine[] = [
  {
    sprecher: 'Erzähler',
    text: 'Es ist spät. Zu spät, um noch wach zu sein. Aber dein Kopf hört nicht auf zu denken.',
    delay: 500,
  },
  {
    sprecher: 'Erzähler',
    text: 'Gedanken kreisen. Erinnerungen an heute. Worte, die wehgetan haben. Worte, die du nie gesagt hast.',
    delay: 300,
  },
  {
    sprecher: 'Erzähler',
    text: 'Und dann – ein Ziehen. Wie ein Sog. Nicht im Magen, sondern tiefer. In dir drin.',
    delay: 300,
  },
  {
    sprecher: 'Erzähler',
    text: 'Du öffnest die Augen. Du stehst auf einer kleinen Insel, umgeben von endlosem Wasser. Am Himmel leuchten keine Sterne – sondern Gefühle. Farben, die pulsieren.',
    delay: 300,
  },
  {
    sprecher: 'Erzähler',
    text: 'Eine Stimme flüstert – deine eigene Stimme, aber anders. Dunkler.',
    delay: 500,
  },
  {
    sprecher: 'Schatten-Selbst',
    text: 'Endlich bist du hier. Ich habe lange gewartet.',
    isSchattenSelbst: true,
    delay: 800,
  },
  {
    sprecher: 'Erzähler',
    text: 'Bevor du antworten kannst, verschwindet die Gestalt. Aber acht Inseln leuchten am Horizont. Jede in einer anderen Farbe. Jede ruft dich.',
    delay: 300,
  },
  {
    sprecher: 'Erzähler',
    text: 'Dies ist deine innere Welt. Und sie braucht dich.',
    delay: 500,
  },
];

export const shadowSelfScenes: Record<IslandId, ShadowSelfScene> = {
  // --- INSEL 1: VULKAN (Wut) ---
  vulkan: {
    islandId: 'vulkan',
    appearance: {
      glitchIntensity: 1.0,
      colorAmount: 0.0,
      description: 'Eine komplett schwarze Silhouette mit weißen, leuchtenden Augen. Starkes Glitching – die Figur flackert und teleportiert alle paar Sekunden. Umgeben von dunklen, wirbelnden Partikeln.',
    },
    dialogue: [
      {
        sprecher: 'Schatten-Selbst',
        text: 'Da bist du also. Der Teil von dir, der immer lächelt und so tut, als wäre alles okay.',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Du versuchst, mich zu löschen. Mich runterzuschlucken. Mich zu ignorieren.',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Aber ich bin dein Feuer. Und Feuer lässt sich nicht einsperren.',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Ich bin nicht dein Feind. Ich bin der Teil von dir, der sagt: Das ist nicht fair. Ich bin der Teil, der kämpft. Ohne mich wärst du nur... leer.',
        isSchattenSelbst: true,
      },
    ],
    botschaft: 'Du versuchst, mich zu löschen. Aber ich bin dein Feuer.',
    lernerfahrung: 'Wut ist nicht der Feind. Unkontrollierte Wut schon. Wut zeigt dir, dass dir etwas wichtig ist.',
  },

  // --- INSEL 2: OZEAN (Trauer) ---
  ozean: {
    islandId: 'ozean',
    appearance: {
      glitchIntensity: 0.85,
      colorAmount: 0.15,
      description: 'Die Silhouette sitzt zusammengesunken am Ufer. Weniger Glitching als zuvor. Tropfen aus dunklem Licht fallen von ihr herunter – wie Tränen. Ein Hauch von Dunkelblau schimmert durch das Schwarz.',
    },
    dialogue: [
      {
        sprecher: 'Schatten-Selbst',
        text: 'Oh, du bist überrascht mich zu sehen? Ich bin immer da. Besonders nachts.',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Du hast aufgehört zu weinen, oder? Irgendwann hast du entschieden: Weinen ist schwach. Weinen ist peinlich.',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Wer weint für dich? Wer trauert um die Dinge, die du verloren hast?',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Niemand. Weil du es dir verbietest. Und das... das ist der eigentliche Schmerz.',
        isSchattenSelbst: true,
      },
    ],
    botschaft: 'Du hast aufgehört zu weinen, um stark zu sein. Aber wer weint für dich?',
    lernerfahrung: 'Trauer zuzulassen ist Stärke, nicht Schwäche. Tränen sind kein Zeichen von Versagen – sie sind ein Zeichen, dass dir etwas bedeutet hat.',
  },

  // --- INSEL 3: WALD (Angst) ---
  wald: {
    islandId: 'wald',
    appearance: {
      glitchIntensity: 0.7,
      colorAmount: 0.3,
      description: 'Die Silhouette versteckt sich hinter Bäumen, nur teilweise sichtbar. Flüstert aus verschiedenen Richtungen. Grünliche Schimmer durchbrechen das Schwarz. Das Glitching ist nervöser – wie zitternde Hände.',
    },
    dialogue: [
      {
        sprecher: 'Schatten-Selbst',
        text: 'Psst... hier drüben. Nein, da. Überall.',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Ich bin die Stimme, die sagt: Du schaffst das nicht. Die Stimme, die dich warnt: Die anderen werden lachen. Die flüstert: Bleib lieber zu Hause.',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Aber hör genau hin. Hör hinter die Worte. Ich sage nicht: Du bist schwach.',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Ich sage: Ich habe Angst. Und Angst ist nichts anderes als... Liebe. Liebe zu dem, was du verlieren könntest.',
        isSchattenSelbst: true,
      },
    ],
    botschaft: 'Ich bin die Stimme, die sagt: Du schaffst das nicht. Aber hör genau hin – ich habe Angst.',
    lernerfahrung: 'Angst ist ein Schutzmechanismus, kein Versagen. Sie zeigt dir, was dir wichtig ist – und dass du etwas zu verlieren hast, das Wert hat.',
  },

  // --- INSEL 4: BERG (Selbstwert) ---
  berg: {
    islandId: 'berg',
    appearance: {
      glitchIntensity: 0.55,
      colorAmount: 0.45,
      description: 'Die Silhouette steht aufrecht am Gipfel, aber schaut in einen Spiegel, der ein verzerrtes Bild zeigt. Silberne und graue Farbtöne mischen sich in das Schwarz. Das Glitching ist langsamer, schwerer.',
    },
    dialogue: [
      {
        sprecher: 'Schatten-Selbst',
        text: 'Schau in den Spiegel. Was siehst du?',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Nicht dich. Du siehst, was andere sehen. Was sie sagen. Was sie denken könnten. Du hast vergessen, wie du aussiehst – wirklich.',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Du suchst deinen Wert in Noten, in Likes, in den Augen anderer. Aber was, wenn die alle wegschauen? Wer bist du dann?',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Ich sage dir, wer: Du bist immer noch du. Mit all deinen Rissen. Und Risse... sind, wo das Licht reinkommt.',
        isSchattenSelbst: true,
      },
    ],
    botschaft: 'Du siehst dich, wie andere dich sehen. Wann hast du zuletzt hingeschaut – wirklich?',
    lernerfahrung: 'Selbstwert kommt von innen, nicht von Bestätigung. Du bist nicht die Summe der Meinungen anderer.',
  },

  // --- INSEL 5: GARTEN (Verbindung) ---
  garten: {
    islandId: 'garten',
    appearance: {
      glitchIntensity: 0.4,
      colorAmount: 0.6,
      description: 'Die Silhouette steht in einem Garten voller gebrochener Brücken. Grüne und rosa Farbtöne leuchten durch. Das Glitching ist sanft, fast wie ein Herzschlag. Unsichtbare Mauern umgeben die Figur.',
    },
    dialogue: [
      {
        sprecher: 'Schatten-Selbst',
        text: 'Siehst du diese Mauern? Ich habe sie gebaut. Jede einzelne. Eine für jeden Moment, in dem mich jemand verletzt hat.',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Die erste Mauer: Als sie gesagt haben, ich sei komisch. Die zweite: Als mein bester Freund mich ausgelacht hat. Die dritte: Als ich gemerkt habe, dass Erwachsene auch lügen.',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Die Mauern sollten mich schützen. Und das tun sie. Aber jetzt... bin ich eingesperrt.',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Sich zu öffnen ist ein Risiko. Aber allein zu bleiben... das ist keine Sicherheit. Das ist ein Gefängnis.',
        isSchattenSelbst: true,
      },
    ],
    botschaft: 'Ich habe Mauern gebaut, um mich zu schützen. Aber jetzt bin ich eingesperrt.',
    lernerfahrung: 'Verletzlichkeit ist die Grundlage von Verbindung. Mauern schützen, aber sie isolieren auch.',
  },

  // --- INSEL 6: NACHT (Achtsamkeit) ---
  nacht: {
    islandId: 'nacht',
    appearance: {
      glitchIntensity: 0.25,
      colorAmount: 0.75,
      description: 'Die Silhouette sitzt und scrollt endlos durch ein leuchtendes Rechteck – ein Handy aus Licht. Die Augen sind leer, der Blick fixiert. Dunkelblaue und violette Farbtöne dominieren. Kaum noch Glitching.',
    },
    dialogue: [
      {
        sprecher: 'Schatten-Selbst',
        text: '*scrollt weiter, ohne aufzuschauen*',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Was? Oh. Du. Sekunde, ich muss nur noch... kurz... dieses eine Video...',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Je lauter die Welt wird, desto weniger höre ich mich selbst. Ich weiß nicht mal mehr, was ich mag. Was ICH will. Nicht was TikTok mir sagt, dass ich wollen soll.',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Stille macht mir Angst. Weißt du warum? Weil in der Stille die Gefühle kommen. Und die... die sind laut.',
        isSchattenSelbst: true,
      },
    ],
    botschaft: 'Je lauter die Welt wird, desto weniger höre ich mich selbst.',
    lernerfahrung: 'Stille ist kein Feind. Langeweile ist kein Problem. In der Ruhe findest du dich selbst.',
  },

  // --- INSEL 7: REGENBOGEN (Identität) ---
  regenbogen: {
    islandId: 'regenbogen',
    appearance: {
      glitchIntensity: 0.1,
      colorAmount: 0.9,
      description: 'Die Silhouette wechselt ständig ihr Aussehen – verschiedene Gesichter, Körperformen, Stile. Fast alle Farben des Regenbogens schimmern durch. Nur noch minimales Glitching. Die Figur wirkt fast... menschlich.',
    },
    dialogue: [
      {
        sprecher: 'Schatten-Selbst',
        text: 'Erkennst du mich? Wahrscheinlich nicht. Ich erkenne mich selbst nicht.',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'In der Schule bin ich jemand anders als zu Hause. Online bin ich nochmal jemand anders. Bei meinen Großeltern. Bei meinen Freunden. So viele Masken.',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Ich habe so viele Masken getragen, dass ich vergessen habe, wie mein Gesicht aussieht.',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Aber vielleicht... gibt es kein EINES Gesicht. Vielleicht bin ich alle davon. Und keines davon. Und das ist... vielleicht okay?',
        isSchattenSelbst: true,
      },
    ],
    botschaft: 'Ich habe so viele Masken getragen, dass ich vergessen habe, wie mein Gesicht aussieht.',
    lernerfahrung: 'Identität ist vielfältig, und das ist okay. Du musst dich nicht auf eine Version von dir festlegen.',
  },

  // --- INSEL 8: ZUHAUSE (Integration) ---
  zuhause: {
    islandId: 'zuhause',
    appearance: {
      glitchIntensity: 0.0,
      colorAmount: 1.0,
      description: 'Kein Schatten mehr. Die Figur sieht aus wie der Spieler-Avatar, aber in warmen, goldenen Farben. Kein Glitching. Umgeben von sanftem Licht. Zwei Figuren stehen sich gegenüber – der Spieler und sein Schatten-Selbst.',
    },
    dialogue: [
      {
        sprecher: 'Schatten-Selbst',
        text: 'Du bist den ganzen Weg gegangen. Durch das Feuer, das Wasser, den Wald, über den Berg, durch den Garten, die Nacht, den Regenbogen. Bis hierher.',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Ich habe dir Angst gemacht, oder? Ich war die Stimme, die du zum Schweigen bringen wolltest. Der Teil, den du versteckt hast.',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Aber jetzt stehst du hier. Und du siehst mich. Wirklich.',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Ich bin deine Wut, die sagt: Das ist nicht fair. Deine Trauer, die sagt: Das hat wehgetan. Deine Angst, die sagt: Sei vorsichtig. Dein Zweifel, der sagt: Schau genauer hin.',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Ich bin kein Monster. Ich bin du.',
        isSchattenSelbst: true,
      },
    ],
    botschaft: 'Ich bin kein Monster. Ich bin du.',
    lernerfahrung: 'Alle Teile von dir gehören zu dir. Selbstakzeptanz bedeutet nicht, perfekt zu sein – sondern ganz.',
  },
};

// Finale Szene – Die Verschmelzung
export const finaleScene: DialogueLine[] = [
  {
    sprecher: 'Erzähler',
    text: 'Zwei Figuren stehen sich gegenüber. Du und dein Schatten. Zum ersten Mal fühlt es sich nicht bedrohlich an.',
    delay: 500,
  },
  {
    sprecher: 'Schatten-Selbst',
    text: 'Was wirst du tun? Mich wieder einsperren? Mich ignorieren? Mich bekämpfen?',
    isSchattenSelbst: true,
    delay: 800,
  },
  {
    sprecher: 'Erzähler',
    text: 'Du hast eine Wahl. Die wichtigste Wahl dieser ganzen Reise.',
    delay: 500,
  },
];

export const finaleChoices = [
  {
    id: 'umarmen',
    text: 'Ich sehe dich. Du gehörst zu mir.',
    followUp: [
      {
        sprecher: 'Schatten-Selbst',
        text: '... Danke. Das hat noch nie jemand gesagt.',
        isSchattenSelbst: true,
        emotion: 'trauer' as const,
      },
      {
        sprecher: 'Erzähler',
        text: 'Das Schatten-Selbst tritt näher. Und dann – verschmelzt es mit dir. Nicht mit Gewalt. Nicht mit Schmerz. Wie ein Puzzlestück, das endlich seinen Platz findet.',
      },
      {
        sprecher: 'Erzähler',
        text: 'Dein Avatar verändert sich. Ein goldener Schimmer legt sich über dich. Du fühlst dich... vollständiger. Nicht perfekt. Aber ganz.',
      },
    ],
  },
  {
    id: 'zuhoeren',
    text: 'Erzähl mir alles. Ich höre zu.',
    followUp: [
      {
        sprecher: 'Schatten-Selbst',
        text: 'Du willst wirklich zuhören? Nicht nur die netten Sachen?',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Schatten-Selbst',
        text: 'Okay. Ich bin müde. Müde davon, versteckt zu werden. Müde davon, der Bösewicht zu sein. Ich will einfach nur... dazugehören.',
        isSchattenSelbst: true,
        emotion: 'trauer' as const,
      },
      {
        sprecher: 'Erzähler',
        text: 'Das Schatten-Selbst lächelt. Zum ersten Mal. Und verschmilzt sanft mit dir. Ein goldenes Licht umhüllt dich beide.',
      },
    ],
  },
  {
    id: 'hand_reichen',
    text: '*Du reichst deine Hand aus, ohne ein Wort zu sagen.*',
    followUp: [
      {
        sprecher: 'Schatten-Selbst',
        text: '*Schaut auf deine Hand. Zögert. Greift zu.*',
        isSchattenSelbst: true,
      },
      {
        sprecher: 'Erzähler',
        text: 'Manchmal braucht es keine Worte. Manchmal reicht eine ausgestreckte Hand. Das Schatten-Selbst wird wärmer, heller – und wird ein Teil von dir.',
      },
      {
        sprecher: 'Erzähler',
        text: 'Ein goldener Schimmer. Du bist nicht mehr gespalten. Du bist eins.',
      },
    ],
  },
];

// Post-Finale
export const postFinaleSequence: DialogueLine[] = [
  {
    sprecher: 'Erzähler',
    text: 'Die Inseln leuchten auf. Alle acht. Nicht mehr in korrumpierten Farben, sondern klar und warm.',
    delay: 500,
  },
  {
    sprecher: 'Erzähler',
    text: 'Der Vulkan atmet ruhig. Der Ozean wiegt sich sanft. Der Wald raschelt friedlich. Der Berg steht stark. Der Garten blüht. Die Nacht leuchtet. Der Regenbogen strahlt.',
    delay: 300,
  },
  {
    sprecher: 'Erzähler',
    text: 'Und du – du stehst mittendrin. In deiner inneren Welt. Die jetzt nicht mehr fremd ist. Sondern... dein Zuhause.',
    delay: 500,
  },
  {
    sprecher: 'Erzähler',
    text: 'Diese Reise ist vorbei. Aber die echte Reise – die da draußen, in deinem Leben – die geht weiter. Und du hast jetzt etwas, das du vorher nicht hattest:',
    delay: 300,
  },
  {
    sprecher: 'Erzähler',
    text: 'Du kennst dich selbst. Und das ist die größte Superkraft, die es gibt.',
    delay: 800,
  },
];
