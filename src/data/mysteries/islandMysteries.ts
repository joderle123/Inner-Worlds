// ============================================================
// INNER WORLDS – Island Mysteries
// Jede Insel hat ein 4-Kapitel-Mysterium als Umwelt-Erzählung
// ============================================================
import type { IslandMystery } from '@/types/game';

export const islandMysteries: Record<string, IslandMystery> = {
  // --- VULKAN: "Der erloschene Kern" ---
  vulkan: {
    islandId: 'vulkan',
    titel: 'Der erloschene Kern',
    kapitel: [
      {
        nummer: 1,
        titel: 'Das endlose Brüllen',
        beschreibung: 'Der Vulkan brüllt ständig. Tag und Nacht. Aber wenn du genau hinschaust, siehst du, dass niemand auf der Insel es noch hört. Sie haben sich daran gewöhnt. Sie haben aufgehört hinzuhören. Nahe dem Kraterrand findest du einen rissigen Stein mit einer seltsamen Inschrift.',
        fund: 'Ein rissiger Stein mit der Inschrift: "Ich schreie nicht, um zu zerstören. Ich schreie, weil niemand zuhört."',
      },
      {
        nummer: 2,
        titel: 'Der See unter der Lava',
        beschreibung: 'Unter der brodelnden Lava entdeckst du etwas Unerwartetes: Einen stillen, klaren See. Der Vulkan war nicht immer so. Er war einmal ein ruhiger Berg mit einem See in der Mitte. Friedlich. In der Asche findest du etwas, das dort nicht hingehört.',
        fund: 'Asche mit lebendigen Samen darin. Leben, das im Zerstörerischen wächst. Wut, die auch Kraft sein kann.',
      },
      {
        nummer: 3,
        titel: 'Die Ketten',
        beschreibung: 'Tiefer in den Vulkan hinein findest du die Wahrheit: Jemand hat den Vulkan in Ketten gelegt. Nicht um ihn zu beruhigen – sondern um ihn explodieren zu lassen. Wer auch immer das getan hat, wollte, dass der Vulkan wütend bleibt. Unkontrolliert. Gefährlich. Weil ein wütender Vulkan andere einschüchtert.',
        fund: 'Schwere Ketten um den Kern des Vulkans. Jede Kette hat ein Wort eingraviert: "Sei still." "Reiß dich zusammen." "Hör auf zu weinen." "Sei nicht so." – Die Worte, die Wut unterdrücken und sie gleichzeitig nähren.',
      },
      {
        nummer: 4,
        titel: 'Der befreite Kern',
        beschreibung: 'Du löst die Ketten. Nicht mit Gewalt – mit Verständnis. Du erkennst: Die Ketten sind die Botschaften, die uns sagen, dass Wut falsch ist. Und je mehr wir Wut unterdrücken, desto explosiver wird sie. Der Vulkan beginnt sich zu verändern. Er wird kleiner. Ruhiger. Er hört nicht auf zu brennen – aber er brennt jetzt kontrolliert. Warm, nicht zerstörerisch. An seinen Hängen beginnen Blumen zu wachsen.',
        fund: 'Der befreite Kern leuchtet warm statt glühend. Blumen wachsen an den Vulkanhängen. Die Insel verändert sich.',
        belohnung: 'Weisheitskarte "Der Kern" + Die Vulkaninsel verwandelt sich visuell: kleinerer Vulkan, Blumen an den Hängen, warmes statt bedrohliches Licht.',
      },
    ],
    metapher: 'Unterdrückte Wut explodiert. Verstandene Wut verwandelt sich. Wut ist nicht schlecht – aber eingekettete Wut wird zur Bombe.',
  },

  // --- OZEAN: "Das versunkene Schiff" ---
  ozean: {
    islandId: 'ozean',
    titel: 'Das versunkene Schiff',
    kapitel: [
      {
        nummer: 1,
        titel: 'Die Flaschenpost',
        beschreibung: 'Am Strand liegt eine Flasche. Darin ein Brief, der von Wasser verwischt ist. Nur Fragmente sind lesbar: "...habe nie gesagt... wollte dir sagen... zu spät..."',
        fund: 'Eine Flaschenpost mit einem unleserlichen Brief. Worte, die nie gesagt wurden. Gefühle, die unter der Oberfläche blieben.',
      },
      {
        nummer: 2,
        titel: 'Das versunkene Schiff',
        beschreibung: 'Unter der Wasseroberfläche liegt ein Schiff. Es ist nicht gesunken, weil es einen Sturm gab. Es ist gesunken, weil niemand das Leck bemerkt hat. Tropfen für Tropfen. Langsam. Leise. Im Schiff findest du eine Truhe.',
        fund: 'Eine Truhe voller Briefe – alle geschrieben, keiner abgeschickt. Gefühle, die gesammelt, aber nie geteilt wurden, bis das Gewicht das Schiff versenkt hat.',
      },
      {
        nummer: 3,
        titel: 'Der stille Sturm',
        beschreibung: 'Du findest heraus: Das Schiff gehörte jemandem, der gelernt hatte, seine Trauer zu verstecken. Jede Träne, die nicht geweint wurde, wurde zu einem Tropfen Wasser im Schiff. Und irgendwann... war es zu viel.',
        fund: 'Ein Logbuch mit einem einzigen wiederholten Satz auf jeder Seite: "Mir geht es gut." Der Satz, der das Schiff versenkt hat.',
      },
      {
        nummer: 4,
        titel: 'Die gehobene Fracht',
        beschreibung: 'Du hebst das Schiff nicht aus dem Wasser – du öffnest die Briefe. Einen nach dem anderen. Und mit jedem Brief, der gelesen wird, wird das Wasser klarer. Das Schiff hebt sich nicht – aber es verwandelt sich. Es wird zu einem Korallenriff. Neuem Leben. Trauer verschwindet nicht. Aber sie kann sich in etwas Lebendiges verwandeln.',
        fund: 'Das versunkene Schiff wird zum Korallenriff. Die Briefe lösen sich im Wasser auf und werden zu Nährstoff für neues Leben.',
        belohnung: 'Weisheitskarte "Das Riff" + Das Ozean-Wasser wird klarer, ein leuchtendes Korallenriff erscheint unter der Oberfläche.',
      },
    ],
    metapher: 'Unausgesprochene Trauer versenkt uns langsam. Geteilte Trauer verwandelt sich in etwas Neues – nicht weniger schmerzhaft, aber lebendig.',
  },

  // --- WALD: "Der Flüsterwald" ---
  wald: {
    islandId: 'wald',
    titel: 'Der Flüsterwald',
    kapitel: [
      {
        nummer: 1,
        titel: 'Die erste Stimme',
        beschreibung: 'Im Wald hörst du Stimmen. Aber nicht die der Bäume. Es sind Echos – Sätze, die dir jemand einmal gesagt hat. "Du bist nicht gut genug." "Was, wenn alle lachen?" "Bleib lieber zu Hause." Du findest eine Baumhöhle, in der die Stimmen lauter werden.',
        fund: 'In der Baumhöhle: Ein zerbrochener Spiegel. Die Scherben zeigen nicht dein Gesicht – sie zeigen deine schlimmsten Ängste.',
      },
      {
        nummer: 2,
        titel: 'Der Urbaum',
        beschreibung: 'Tiefer im Wald steht ein gewaltiger, uralter Baum. Sein Stamm pulsiert wie ein Herzschlag. An seinen Wurzeln findest du Botschaften, die in die Rinde geritzt sind – aber diese sind anders als die Flüsterstimmen.',
        fund: 'In die Rinde des Urbaums geritzt: Mut-Geschichten. "Ich hatte Angst vor der Dunkelheit. Jetzt bin ich die Dunkelheit." "Ich dachte, ich schaffe es nicht. Ich lag falsch."',
      },
      {
        nummer: 3,
        titel: 'Die Wurzeln der Angst',
        beschreibung: 'Die Wurzeln des Urbaums reichen bis zu den Baumhöhlen mit den Flüsterstimmen. Du verstehst: Die Stimmen kommen nicht von außen – sie kommen von den Wurzeln. Der Baum hat sie nicht gepflanzt. Jemand anders hat Angst-Samen an seine Wurzeln gelegt.',
        fund: 'Angst-Samen an den Wurzeln – kleine, schwarze Kugeln mit Worten: "Was werden die anderen denken?" "Du bist nicht genug." "Es ist sicherer, nichts zu versuchen." Jemand hat sie gepflanzt. Aber der Baum hat sie nicht gewählt.',
      },
      {
        nummer: 4,
        titel: 'Das Licht im Wald',
        beschreibung: 'Du entfernst die Angst-Samen. Nicht alle – manche gehören zum Baum, denn ein bisschen Vorsicht ist gesund. Aber die giftigen Samen, die aus Beschämung, Mobbing und Überforderung entstanden sind – die gehören nicht hierher. Der Wald verändert sich. Die Flüsterstimmen werden leiser. Godrays brechen durch die Baumkronen. Glühwürmchen erscheinen.',
        fund: 'Die entfernten Angst-Samen verwandeln sich in Glühwürmchen. Angst, die transformiert wird, kann leuchten.',
        belohnung: 'Weisheitskarte "Das Glühwürmchen" + Der Wald wird heller, Glühwürmchen erscheinen, die Flüsterstimmen werden zu ermutigendem Rascheln.',
      },
    ],
    metapher: 'Angst wird oft von außen eingepflanzt. Sie gehört nicht immer zu uns. Gesunde Vorsicht ja – aber giftige Angst kann entfernt werden. Und was übrig bleibt, leuchtet.',
  },

  // --- BERG: "Der zerbrochene Spiegel" ---
  berg: {
    islandId: 'berg',
    titel: 'Der zerbrochene Spiegel',
    kapitel: [
      {
        nummer: 1,
        titel: 'Der Spiegel am Gipfel',
        beschreibung: 'Am Gipfel des Berges steht ein riesiger Spiegel. Aber er zeigt kein normales Spiegelbild. Er zeigt dich... wie du glaubst, dass andere dich sehen. Verzerrt. Kleiner. Weniger.',
        fund: 'Vor dem Spiegel: Eine Sammlung von Etiketten auf dem Boden. "Zu laut." "Zu leise." "Nicht gut genug." "Zu viel." "Zu wenig." Etiketten, die andere dir aufgeklebt haben.',
      },
      {
        nummer: 2,
        titel: 'Der Weg der Vergleiche',
        beschreibung: 'Der Pfad zum Gipfel ist mit Fotos gepflastert – perfekte Bilder von perfekten Menschen. Aber wenn du genau hinschaust, siehst du: Jedes Foto hat einen Rahmen. Und im Rahmen steht klein geschrieben: "Bearbeitet." "Filter." "Nur die guten Momente." "Dritter Versuch."',
        fund: 'Hinter den perfekten Fotos: Die Outtakes. Die Momente, die niemand zeigt. Das Weinen vor dem Lächeln. Die Angst hinter der Sicherheit.',
      },
      {
        nummer: 3,
        titel: 'Der wahre Spiegel',
        beschreibung: 'Hinter dem verzerrten Spiegel findest du einen zweiten, kleineren Spiegel. Dieser zeigt dich, wie du wirklich bist. Nicht perfekt. Nicht kaputt. Einfach... du. Mit Rissen und Licht und allem dazwischen.',
        fund: 'Der wahre Spiegel hat einen goldenen Rahmen mit der Inschrift: "Risse sind Geschichten. Und Geschichten machen dich einzigartig."',
      },
      {
        nummer: 4,
        titel: 'Der befreite Gipfel',
        beschreibung: 'Du zerschlägst den verzerrten Spiegel. Nicht aus Wut – aus Befreiung. Die Scherben verwandeln sich in Windlichter, die den ganzen Berg erhellen. Der wahre Spiegel wächst und wird zu einem Fenster – eines, das in beide Richtungen schaut. Nach innen und nach außen.',
        fund: 'Die Scherben des falschen Spiegels werden zu Windlichtern. Der Berg leuchtet von innen.',
        belohnung: 'Weisheitskarte "Das Windlicht" + Der Berg erstrahlt in warmem Licht, der verzerrte Spiegel ist verschwunden, Windlichter leuchten überall.',
      },
    ],
    metapher: 'Wir sehen uns durch die Augen anderer – verzerrt, bearbeitet, nie genug. Der wahre Spiegel zeigt: Du bist nicht das Etikett. Du bist die Geschichte.',
  },

  // --- GARTEN: "Die gebrochenen Brücken" ---
  garten: {
    islandId: 'garten',
    titel: 'Die gebrochenen Brücken',
    kapitel: [
      {
        nummer: 1,
        titel: 'Die erste Brücke',
        beschreibung: 'Der Garten besteht aus kleinen Inseln, verbunden durch Brücken. Aber die meisten Brücken sind zerbrochen. Auf der ersten zerbrochenen Brücke findest du etwas.',
        fund: 'Ein Schloss ohne Schlüssel an der Brücke. Eingraviert: "Ich habe mich verschlossen, nachdem du gegangen bist."',
      },
      {
        nummer: 2,
        titel: 'Der verwilderte Garten',
        beschreibung: 'Im Zentrum des Gartens steht ein Gewächshaus. Drinnen: Pflanzen, die ohne Pflege gewachsen sind. Einige sind wild und wunderschön, andere sind verdorrt. Aber alle haben überlebt.',
        fund: 'Im Gewächshaus: Ein Bewässerungssystem, das abgestellt wurde. An den Reglern steht: "Vertrauen", "Ehrlichkeit", "Zeit", "Geduld". Alle auf Null gedreht.',
      },
      {
        nummer: 3,
        titel: 'Die unsichtbare Mauer',
        beschreibung: 'Du findest eine unsichtbare Mauer im Garten. Sie ist nicht aus Stein – sie ist aus Erinnerungen. Jede schmerzhaften Erinnerung an Verletzung, Verrat oder Verlust hat einen Baustein hinzugefügt. Die Mauer schützt – aber sie isoliert auch.',
        fund: 'Die Bausteine der Mauer tragen Geschichten: "Sie hat mein Geheimnis weitererzählt." "Er hat mich vor allen ausgelacht." "Sie haben gesagt, ich gehöre nicht dazu." Jeder Stein ein Grund, Mauern zu bauen.',
      },
      {
        nummer: 4,
        titel: 'Der neue Garten',
        beschreibung: 'Du baust keine neuen Brücken – du reparierst die alten. Nicht alle. Manche Brücken müssen zerbrochen bleiben, weil die Verbindung nicht gesund war. Aber andere verdienen eine zweite Chance. Du drehst die Bewässerungsregler langsam auf. Und der Garten beginnt zu blühen.',
        fund: 'Die reparierten Brücken tragen jetzt Blumen. Die unsichtbare Mauer wird durchsichtig – nicht verschwunden, aber man kann durch sie hindurchsehen.',
        belohnung: 'Weisheitskarte "Die Brücke" + Der Garten blüht auf, Brücken werden repariert, Schmetterlinge erscheinen.',
      },
    ],
    metapher: 'Mauern schützen, aber isolieren. Nicht jede zerbrochene Brücke muss repariert werden – aber die richtigen verdienen eine zweite Chance.',
  },

  // --- NACHT: "Das verlorene Lied" ---
  nacht: {
    islandId: 'nacht',
    titel: 'Das verlorene Lied',
    kapitel: [
      {
        nummer: 1,
        titel: 'Der Lärm der Stille',
        beschreibung: 'Die Nachtinsel ist nicht still. Sie ist voller Geräusche – aber nicht natürlicher. Piepen, Klingeln, Vibrieren. Die Geräusche von tausend Benachrichtigungen. Irgendwo in der Nacht findest du ein leuchtendes Rechteck.',
        fund: 'Ein riesiges, leuchtendes Rechteck – ein Handy-Bildschirm so groß wie ein Haus. Es scrollt endlos. Darauf: Gesichter, Stimmen, Meinungen. Alle laut. Alle gleichzeitig.',
      },
      {
        nummer: 2,
        titel: 'Die vergessene Melodie',
        beschreibung: 'Hinter dem Lärm der Benachrichtigungen hörst du etwas anderes. Leise. Fast unhörbar. Eine Melodie. Sie kommt von dir. Aus deinem Inneren. Aber je lauter der Bildschirm leuchtet, desto leiser wird die Melodie.',
        fund: 'Eine kaum hörbare Melodie – deine eigene innere Stimme. Sie singt ein Lied, das du als Kind kanntest. Aber du hast es vergessen.',
      },
      {
        nummer: 3,
        titel: 'Die Stille hinter dem Bildschirm',
        beschreibung: 'Du gehst hinter den großen Bildschirm. Dahinter: Nichts. Nur Stille. Und in der Stille findest du etwas Überraschendes – einen kleinen Garten, der im Dunkeln leuchtet. Biolumineszierende Pilze, Glühwürmchen, Sterne.',
        fund: 'Hinter dem Bildschirm: Ein Garten der Stille. Und eine Inschrift am Eingang: "Hier findet dich nur, wer den Mut hat, abzuschalten."',
      },
      {
        nummer: 4,
        titel: 'Das wiedergefundene Lied',
        beschreibung: 'Du schaltest den großen Bildschirm aus. Es ist zuerst beängstigend – die Stille ist LAUT. Aber dann hörst du die Melodie wieder. Deine Melodie. Sie war nie weg. Sie wurde nur übertönt. Der Garten der Stille leuchtet jetzt heller. Und du hörst dich selbst zum ersten Mal seit langer Zeit.',
        fund: 'Der große Bildschirm erlischt und verwandelt sich in einen Sternenhimmel. Deine Melodie erfüllt die Nacht.',
        belohnung: 'Weisheitskarte "Die Melodie" + Die Nachtinsel verwandelt sich: Der Bildschirm-Lärm verstummt, der Sternenhimmel leuchtet intensiver, biolumineszierende Pflanzen erhellen die Landschaft.',
      },
    ],
    metapher: 'Digitaler Lärm übertönt die innere Stimme. Sie ist nie weg – aber du musst den Mut haben, abzuschalten, um sie zu hören.',
  },

  // --- REGENBOGEN: "Die Maskensammlung" ---
  regenbogen: {
    islandId: 'regenbogen',
    titel: 'Die Maskensammlung',
    kapitel: [
      {
        nummer: 1,
        titel: 'Die erste Maske',
        beschreibung: 'Die Regenbogeninsel ist voller Masken. Sie hängen an Bäumen, liegen auf dem Boden, schweben in der Luft. Jede Maske zeigt ein anderes Gesicht – das coole Gesicht, das brave Gesicht, das lustige Gesicht, das starke Gesicht.',
        fund: 'Deine erste Maske: Sie sieht aus wie das Gesicht, das du in der Schule trägst. Auf der Rückseite steht: "Wenn ich das trage, lassen sie mich in Ruhe."',
      },
      {
        nummer: 2,
        titel: 'Der Maskenball',
        beschreibung: 'Tiefer auf der Insel findest du einen Maskenball – Figuren, die tanzen, lachen, reden. Aber niemand zeigt sein echtes Gesicht. Alle tragen Masken. Und alle sind... einsam.',
        fund: 'Unter einer Tanzfläche: Ein Haufen abgelegter Masken. Und darunter: Gesichter, die sich ähneln. Verletzliche, unsichere, suchende Gesichter. Alle gleich – hinter verschiedenen Masken.',
      },
      {
        nummer: 3,
        titel: 'Der Spiegel ohne Maske',
        beschreibung: 'In der Mitte der Insel steht ein Spiegel. Aber hier kannst du keine Maske tragen. Der Spiegel zeigt nur, was wirklich da ist. Manche Figuren weichen erschrocken zurück. Andere stehen still. Und manche... lächeln.',
        fund: 'Der Spiegel zeigt nicht EIN Gesicht, sondern viele – dein trauriges, dein wütendes, dein fröhliches, dein ängstliches, dein mutiges. Alle gleichzeitig. Alle echt.',
      },
      {
        nummer: 4,
        titel: 'Die befreite Identität',
        beschreibung: 'Du sammelst alle Masken ein – nicht um sie zu zerstören, sondern um sie in eine Truhe zu legen. Sie gehören zu dir. Sie waren Werkzeuge. Aber sie definieren dich nicht. Die Insel hört auf, ihre Farben zu wechseln. Stattdessen: Alle Farben gleichzeitig. Ein Regenbogen, der nicht wechselt, sondern leuchtet.',
        fund: 'Die Masken in der Truhe. Und auf der Truhe: "Ich muss mich nicht entscheiden, wer ich bin. Ich bin alle. Und keiner. Und das ist meine Stärke."',
        belohnung: 'Weisheitskarte "Das Mosaik" + Die Regenbogeninsel stabilisiert sich: Alle Farben leuchten gleichzeitig, harmonisch und schön.',
      },
    ],
    metapher: 'Masken sind nicht schlecht – sie sind Werkzeuge. Aber wenn du vergisst, wer du ohne sie bist, werden sie zum Gefängnis. Identität ist kein einzelnes Gesicht – es ist ein Mosaik.',
  },

  // --- ZUHAUSE: "Die letzte Tür" ---
  zuhause: {
    islandId: 'zuhause',
    titel: 'Die letzte Tür',
    kapitel: [
      {
        nummer: 1,
        titel: 'Das Haus der Erinnerungen',
        beschreibung: 'Die Zuhause-Insel ist ein Haus. Aber nicht ein bestimmtes Haus – es ist das Gefühl von Zuhause. In jedem Raum findest du Erinnerungen an die anderen Inseln. Der Vulkan-Raum ist warm. Der Ozean-Raum riecht nach Meer.',
        fund: 'In der Eingangshalle: Acht Türen, eine für jede Insel. Und eine neunte Tür, die verschlossen ist. Sie hat kein Schloss – nur einen Spiegel, in dem du dich siehst.',
      },
      {
        nummer: 2,
        titel: 'Die gesammelten Weisheiten',
        beschreibung: 'In jedem Raum liegt eine der Weisheiten, die du auf den anderen Inseln gesammelt hast. Zusammen ergeben sie ein Bild – wie ein Puzzle, bei dem jedes Teil allein keinen Sinn ergibt, aber zusammen...',
        fund: 'Ein goldenes Buch in der Bibliothek. Leer – bis du es öffnest. Dann füllt es sich mit allem, was du gelernt hast. Jede Weisheitskarte wird zu einer Seite.',
      },
      {
        nummer: 3,
        titel: 'Der Brief an mich',
        beschreibung: 'Im letzten Raum vor der verschlossenen Tür findest du einen Schreibtisch. Darauf: Ein Brief. An dich. Von dir. Du hast ihn noch nicht geschrieben – aber er ist trotzdem da. Es ist der Brief, den dein zukünftiges Ich dir schickt.',
        fund: 'Der Brief sagt: "Es wird nicht immer einfach. Aber du bist nicht allein. Du warst nie allein. Und du wirst es auch in Zukunft nicht sein. Dein zukünftiges Ich."',
      },
      {
        nummer: 4,
        titel: 'Die geöffnete Tür',
        beschreibung: 'Die neunte Tür öffnet sich. Dahinter: Kein neuer Raum. Sondern die Welt. Deine Welt. Die echte Welt. Die Tür zeigt dir den Weg zurück – aber du bist jetzt anders. Du bist ganz. Nicht perfekt. Aber ganz.',
        fund: 'Die neunte Tür führt nach draußen. Und draußen wartet... dein Leben. Mit all seinen Herausforderungen und Möglichkeiten.',
        belohnung: 'Weisheitskarte "Die Tür" + Das Zuhause-Haus erstrahlt in goldenem Licht. Alle Inseln am Horizont leuchten in ihren wahren Farben.',
      },
    ],
    metapher: 'Zuhause ist kein Ort – es ist ein Gefühl. Und das Gefühl entsteht, wenn du alle Teile von dir willkommen heißt. Die letzte Tür öffnet sich nicht mit einem Schlüssel, sondern mit Selbstakzeptanz.',
  },
};
