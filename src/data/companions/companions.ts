// ============================================================
// INNER WORLDS – Companion Definitions
// Vier Begleiter mit Persönlichkeit, Backstory und Reaktionen
// ============================================================
import type { Companion, IslandId } from '@/types/game';

export const companions: Companion[] = [
  // --- LUPO (Wolf) ---
  {
    id: 'lupo',
    name: 'Lupo',
    tier: 'Wolf',
    beschreibung: 'Ein junger Wolf mit silbergrauem Fell und bernsteinfarbenen Augen. Kleiner als ein normaler Wolf – eher wie ein großer Fuchs. Sein linkes Ohr hat einen kleinen Riss.',
    persoenlichkeit: 'Loyal, mutig, direkt. Lupo sagt, was er denkt – manchmal unbequem, aber immer ehrlich. Er hat ein feines Gespür für Ungerechtigkeit.',
    backstory: 'Ich war einmal Teil eines Rudels. Eines Tages haben die anderen beschlossen, dass ich nicht dazugehöre. Nicht weil ich schwach war – sondern weil ich anders war. Ich habe Dinge gesehen, die die anderen nicht sehen wollten. Ich habe Fragen gestellt, die die anderen nicht hören wollten. Also haben sie mich ausgestoßen. Lange dachte ich: Mit mir stimmt etwas nicht. Ich bin falsch. Ich bin zu viel. Aber dann habe ich verstanden: Stärke ist nicht, alleine klarzukommen. Stärke ist, Hilfe anzunehmen. Und jetzt bin ich hier – bei dir. Nicht weil ich muss. Sondern weil ich will.',
    zuneigungLevel: 1,
    idleAnimations: [
      'schnueffelt_am_boden',
      'kratzt_sich_am_ohr',
      'legt_sich_hin_gaehnt',
      'schaut_in_die_ferne',
      'wedelt_mit_schwanz',
    ],
    islandReaktionen: {
      vulkan: 'Ich rieche... Asche. Hier brennt etwas – nicht nur der Vulkan. Sei vorsichtig. Aber hab keine Angst vor dem Feuer.',
      ozean: 'Das Wasser hier ist tief. Tiefer als es aussieht. Manchmal muss man untertauchen, um zu verstehen, was an der Oberfläche passiert.',
      wald: '*Ohren aufgestellt, angespannt* Hörst du das? Zwischen den Bäumen flüstert etwas. Aber Flüstern ist nur lautes Denken.',
      berg: 'Hoch oben sieht alles kleiner aus. Auch die Probleme. Aber vergiss nicht: Auch du bist von hier oben nicht kleiner.',
      garten: '*schnüffelt an einer verwelkten Blume* Hier hat mal etwas Schönes gewachsen. Es kann wieder wachsen. Aber es braucht Zeit und Wasser.',
      nacht: '*heult leise zum Mond* Die Nacht ist nicht dunkel. Sie ist nur... ruhiger. Hier kannst du dich selbst hören.',
      regenbogen: 'So viele Farben! Weißt du, was das Tolle an einem Regenbogen ist? Er braucht Sonne UND Regen.',
      zuhause: '*legt sich zu deinen Füßen* Wir sind weit gegangen, du und ich. Und weißt du was? Ich bin froh, dass du mich mitgenommen hast.',
    },
    dialogHinweise: {
      vulkan: [
        'Hm, ich glaube, dieser NPC ist wütender auf sich selbst als auf andere.',
        'Achte auf das, was er NICHT sagt. Manchmal ist die Stille lauter als die Worte.',
        'Wut ist wie ein Waldbrand. Man löscht ihn nicht, indem man ihn ignoriert.',
      ],
      ozean: [
        'Tränen sind nicht schwach. Wölfe heulen auch – und niemand nennt uns schwach.',
        'Manchmal muss man durch den Schmerz hindurch, nicht um ihn herum.',
        'Dieser NPC braucht keine Lösung. Er braucht jemanden, der zuhört.',
      ],
      wald: [
        'Ich kenne diese Angst. Sie riecht nach kaltem Schweiß und schnellem Herzschlag.',
        'Die Angst will dich beschützen. Aber manchmal beschützt sie dich vor Dingen, die gar nicht gefährlich sind.',
        'Mut ist nicht, keine Angst zu haben. Mut ist, trotzdem weiterzugehen.',
      ],
      berg: [
        'Dieser NPC schaut nur nach oben – auf das, was er nicht erreicht hat. Hilf ihm, auch zurückzuschauen.',
        'Der höchste Berg ist der, den du in deinem Kopf baust.',
        'Du bist mehr als deine Noten. Mehr als deine Likes. Mehr als das, was andere sehen.',
      ],
      garten: [
        'Beziehungen sind wie Pflanzen. Man muss sie gießen, aber man kann sie nicht zum Wachsen zwingen.',
        'Dieser NPC hat Mauern gebaut. Aber Mauern halten nicht nur andere draußen – sie halten auch dich drinnen.',
        'Vertrauen ist ein Risiko. Aber allein sein ist kein Schutz.',
      ],
      nacht: [
        'Die Stille hier ist laut, oder? Das ist normal. Dein Kopf ist es nicht gewohnt, nichts zu tun.',
        'Das Handy ist ein Fenster in eine andere Welt. Aber vergiss nicht, in welcher Welt DU lebst.',
        'Schlaf ist kein Luxus. Er ist Nahrung für die Seele.',
      ],
      regenbogen: [
        'Wer sagt, dass du nur EINE Sache sein kannst? Ein Wolf ist gleichzeitig sanft und stark.',
        'Masken schützen. Aber sie werden schwer, wenn man sie nie abnimmt.',
        'Die beste Version von dir ist nicht die perfekte. Es ist die echte.',
      ],
      zuhause: [
        'Wir sind fast am Ende. Aber jedes Ende ist auch ein Anfang.',
        'Schau zurück auf alles, was du gelernt hast. Du bist gewachsen.',
        'Das Schatten-Selbst ist kein Feind. Es war nie einer.',
      ],
    },
  },

  // --- SOPHIA (Eule) ---
  {
    id: 'sophia',
    name: 'Sophia',
    tier: 'Eule',
    beschreibung: 'Eine kleine Schleiereule mit herzförmigem Gesicht und großen, dunklen Augen. Ihr Gefieder schimmert leicht golden an den Spitzen.',
    persoenlichkeit: 'Weise, ruhig, beobachtend. Sophia sieht Dinge, die andere übersehen. Sie stellt Fragen, die zum Nachdenken bringen – nie belehrend, immer neugierig.',
    backstory: 'Ich konnte schon immer im Dunkeln sehen. Das klingt toll, oder? Ist es aber nicht immer. Ich habe Dinge gesehen, die andere nicht sehen – den Schmerz hinter dem Lächeln, die Einsamkeit hinter der Fassade, die Angst hinter der Wut. Und weißt du, was das Schwerste daran war? Niemand wollte hören, was ich gesehen habe. "Du übertreibst", haben sie gesagt. "Du denkst zu viel nach." Also habe ich aufgehört zu reden. Ich habe mich in die Dunkelheit zurückgezogen und nur noch zugeschaut. Aber das war auch keine Lösung. Denn Sehen ohne Handeln – das ist wie ein Leuchtturm ohne Licht. Jetzt bin ich bei dir. Und dieses Mal bleibe ich nicht still.',
    zuneigungLevel: 1,
    idleAnimations: [
      'dreht_kopf_langsam',
      'blinzelt_langsam',
      'putzt_federn',
      'streckt_fluegel',
      'kippt_kopf_neugierig',
    ],
    islandReaktionen: {
      vulkan: 'Interessant... die Lava fließt in Mustern. Hast du das bemerkt? Wut hat auch Muster. Wenn du die erkennst, kannst du sie verändern.',
      ozean: 'Das Meer erinnert sich an alles. Jede Welle trägt eine Erinnerung. Manche sind sanft, manche schlagen hart an.',
      wald: 'Hm, ich glaube, dieser Wald flüstert nicht, um dir Angst zu machen. Er versucht, dir etwas zu sagen. Hör genau hin.',
      berg: '*kippt den Kopf* Von hier oben sieht die Welt anders aus. Aber die Frage ist: Siehst DU dich anders?',
      garten: 'Jede Pflanze hier erzählt eine Geschichte. Manche sind verwelkt – aber schau: Die Wurzeln leben noch.',
      nacht: '*Augen leuchten* Das ist meine Welt. Die Nacht. Hier sehe ich am besten. Und du? Was siehst du, wenn du die Augen schließt?',
      regenbogen: 'So viele Farben, so viele Möglichkeiten. Weißt du, was ich gelernt habe? Du musst dich nicht für eine Farbe entscheiden.',
      zuhause: '*setzt sich auf deine Schulter* Du hast viel gelernt. Aber das Wichtigste war nicht, was du über andere gelernt hast. Es war, was du über dich gelernt hast.',
    },
    dialogHinweise: {
      vulkan: [
        'Hm, ich glaube, dieser NPC sagt nicht die ganze Wahrheit. Achte auf seine Augen.',
        'Wut hat immer eine Ursache. Und die Ursache ist selten das, woran man zuerst denkt.',
        'Frag nicht "Warum bist du wütend?" Frag: "Was hat wehgetan?"',
      ],
      ozean: [
        'Trauer ist keine Krankheit. Sie ist der Preis, den wir für Liebe zahlen.',
        'Dieser NPC braucht keine Aufheiterung. Er braucht Erlaubnis, traurig zu sein.',
        'Manche Wunden heilen nicht – sie verwandeln sich. Und das ist auch okay.',
      ],
      wald: [
        'Angst macht den Blick eng. Hilf diesem NPC, wieder weiter zu schauen.',
        'Was wäre, wenn die Angst nicht der Feind ist, sondern ein Wächter, der seinen Job zu ernst nimmt?',
        'Die schlimmste Angst ist die vor der Angst selbst.',
      ],
      berg: [
        'Dieser NPC misst seinen Wert an den falschen Dingen. Aber wer hat ihm das beigebracht?',
        'Perfektionismus ist getarnte Angst.',
        'Frag ihn nicht, was er kann. Frag ihn, wer er ist.',
      ],
      garten: [
        'Verbindung braucht Verletzlichkeit. Und Verletzlichkeit braucht Mut.',
        'Man kann nicht gleichzeitig Mauern bauen und Brücken.',
        'Einsamkeit in einer Menschenmenge ist die schlimmste Art von Einsamkeit.',
      ],
      nacht: [
        'Die Stille zeigt dir, was du im Lärm überhörst.',
        'Beschäftigung kann eine Form von Flucht sein.',
        'Langeweile ist keine Leere – sie ist Raum. Und Raum kann man füllen oder genießen.',
      ],
      regenbogen: [
        'Identität ist kein Puzzle mit einem fertigen Bild. Es ist ein Mosaik, das sich ständig verändert.',
        'Die Masken, die wir tragen, schützen uns. Aber sie zeigen auch, was wir verstecken wollen.',
        'Sei vorsichtig mit "Sei du selbst." Manchmal weiß man noch nicht, wer das ist. Und das ist okay.',
      ],
      zuhause: [
        'Das Ende einer Reise ist nicht das Ziel. Es ist der Moment, in dem du zurückschaust und siehst, wie weit du gegangen bist.',
        'Integration heißt nicht, alle Teile perfekt zusammenzufügen. Es heißt, alle Teile willkommen zu heißen.',
        'Du bist bereit.',
      ],
    },
  },

  // --- FELIX (Fuchs) ---
  {
    id: 'felix',
    name: 'Felix',
    tier: 'Fuchs',
    beschreibung: 'Ein kleiner Rotfuchs mit buschigem Schwanz und einem schelmischen Grinsen. Hat einen weißen Fleck über dem linken Auge.',
    persoenlichkeit: 'Verspielt, neugierig, warmherzig. Felix bringt Leichtigkeit in schwere Momente – nicht durch Verleugnung, sondern durch Perspektivwechsel. Er ist der Freund, der dich zum Lachen bringt, wenn du es am meisten brauchst.',
    backstory: 'Alle haben immer gesagt: "Felix, du nimmst nichts ernst." Und ich habe gelacht und gesagt: "Stimmt!" Aber das war gelogen. Ich habe alles ernst genommen. Jedes Wort, jeden Blick, jede Enttäuschung. Ich habe nur gelernt, es hinter einem Lachen zu verstecken. Denn wenn du lachst, stellen die Leute keine Fragen. Wenn du lachst, lassen sie dich in Ruhe. Irgendwann konnte ich nicht mehr unterscheiden: Lache ich, weil etwas lustig ist? Oder lache ich, weil es wehtut? Es hat gedauert, bis ich verstanden habe: Humor kann ein Schild sein – oder eine Brücke. Ich will eine Brücke sein. Zu dir. Zu der Welt. Zu den Gefühlen, die wehtun, aber auch zu denen, die schön sind.',
    zuneigungLevel: 1,
    idleAnimations: [
      'spielt_mit_schwanz',
      'springt_auf_steine',
      'rollt_sich_zusammen',
      'jagt_schmetterling',
      'streckt_sich_lang',
    ],
    islandReaktionen: {
      vulkan: 'Whoa, warm hier! *springt von einem Fuß auf den anderen* Weißt du, was ich an Feuer mag? Es kann zerstören – aber es kann auch wärmen. Kommt drauf an, wie du es nutzt.',
      ozean: '*taucht Pfote ins Wasser, zieht sie sofort zurück* Brrr! Aber weißt du... manchmal muss man ins kalte Wasser. Nicht um zu schwimmen. Sondern um zu merken, dass man es kann.',
      wald: '*Ohren zucken nervös* Okay, ich gebe es zu: Wälder machen mir ein bisschen Angst. Aber hey – wenn ich es schaffe, schaffst du es auch, oder?',
      berg: '*schaut nach oben* Das ist ein GROSSER Berg. Aber weißt du, wie man einen großen Berg besteigt? Einen Schritt nach dem anderen. Und zwischendurch Pausen machen. Pausen sind kein Aufgeben!',
      garten: '*schnüffelt an einer Blume* Hey, riech mal! Auch zwischen den kaputten Dingen wächst was Schönes. Das ist doch... irgendwie hoffnungsvoll, oder?',
      nacht: '*gähnt demonstrativ* Stille ist nicht mein Ding, ehrlich gesagt. Aber ich versuche es. Für dich. Und vielleicht... auch ein bisschen für mich.',
      regenbogen: '*dreht sich im Kreis, um alle Farben zu sehen* Das ist ja WAHNSINN! So viele Farben! Weißt du, was ich am Regenbogen liebe? Keine Farbe ist falsch.',
      zuhause: '*rollt sich an deine Seite* Hey. Ich wollte dir sagen: Danke. Nicht nur für die Reise. Sondern dafür, dass du mich so genommen hast, wie ich bin.',
    },
    dialogHinweise: {
      vulkan: [
        'Hey, ich weiß, das klingt komisch von mir – aber manchmal hilft es, NICHT zu lachen. Einfach... fühlen.',
        'Dieser NPC erinnert mich an mich. Das Lächeln ist echt – aber der Schmerz dahinter auch.',
        'Wut ist wie ein Vulkan – wenn du den Deckel draufhältst, wird der Ausbruch nur schlimmer.',
      ],
      ozean: [
        'Weinen ist wie Regen für die Seele. Danach wächst was Neues.',
        'Ich habe mal einen ganzen Tag geweint. Und danach fühlte ich mich wie nach einem Gewitter – frisch.',
        'Sei einfach da. Manchmal ist das genug.',
      ],
      wald: [
        'Okay, ich habe auch Angst. Aber zusammen haben wir weniger Angst als allein. Das ist Mathe!',
        'Was wäre, wenn der Wald gar nicht unheimlich ist? Was wäre, wenn wir nur das sehen, was wir erwarten?',
        'Angst ist wie ein Schatten – je mehr Licht du machst, desto kleiner wird er.',
      ],
      berg: [
        'Hey, dieser NPC vergleicht sich mit anderen. Weißt du, was ich sage? Vergleiche dich mit dir von gestern.',
        'Perfekt sein ist langweilig. Echt sein ist mutig.',
        'Der wichtigste Applaus kommt von dir selbst.',
      ],
      garten: [
        'Freundschaft ist wie ein Garten – du musst ihn pflegen. Aber du kannst niemanden zwingen, eine Blume zu sein.',
        'Manchmal ist der mutigste Schritt: jemandem zu sagen, dass man ihn braucht.',
        'Alleinsein und Einsamsein sind zwei verschiedene Dinge.',
      ],
      nacht: [
        'Ich habe mal drei Tage ohne Schlaf verbracht. Spoiler: Keine gute Idee.',
        'Das Handy ist wie eine Taschenlampe in der Dunkelheit – hilfreich, aber blendend, wenn du sie dir ins Gesicht hältst.',
        'Was wäre, wenn Stille nicht leer ist, sondern voll? Voll mit dir?',
      ],
      regenbogen: [
        'Du musst nicht wissen, wer du bist. Du musst nur wissen, dass du OKAY bist.',
        'Masken sind manchmal nötig. Aber vergiss nicht, wie sich dein Gesicht anfühlt.',
        'Die coolsten Leute sind die, die sich trauen, uncool zu sein.',
      ],
      zuhause: [
        'Wir haben es geschafft! Und das Beste: Du hast es geschafft.',
        'Das Schatten-Selbst war nie dein Feind. Es war der Teil von dir, der am lautesten nach Hilfe gerufen hat.',
        'Hey. Vergiss nicht: Du bist toll. Nicht trotz deiner Risse – sondern mit ihnen.',
      ],
    },
  },

  // --- CLEO (Schildkröte) ---
  {
    id: 'cleo',
    name: 'Cleo',
    tier: 'Schildkröte',
    beschreibung: 'Eine kleine Meeresschildkröte mit einem türkis-goldenen Panzer, in den geheimnisvolle Muster eingeritzt sind. Sie bewegt sich langsam, aber mit Absicht.',
    persoenlichkeit: 'Geduldig, besonnen, einfühlsam. Cleo nimmt sich Zeit – für alles. Sie erinnert daran, dass Langsamkeit keine Schwäche ist, sondern eine Superkraft in einer Welt, die immer schneller wird.',
    backstory: 'Ich bin langsam. Das weißt du. Alle wissen das. Und lange Zeit dachte ich, das macht mich weniger wert. Die anderen Tiere waren schneller, lauter, auffälliger. Und ich? Ich bin einfach... da. Langsam. Leise. Aber weißt du, was ich gelernt habe, als ich langsam durch die Welt gegangen bin? Ich habe alles gesehen. Jede Blume. Jeden Stein. Jedes Gesicht. Die schnellen Tiere sind an all dem vorbeigerannt. Ich nicht. Mein Panzer wurde lange für einen Rückzugsort gehalten. "Cleo versteckt sich wieder." Aber ich habe mich nicht versteckt. Ich habe nachgedacht. Und jetzt, nach all der Zeit des Nachdenkens, bin ich bereit – bereit, meine Gedanken zu teilen. Mit dir.',
    zuneigungLevel: 1,
    idleAnimations: [
      'zieht_kopf_in_panzer',
      'streckt_kopf_langsam_raus',
      'schaut_nach_oben',
      'bewegt_sich_im_kreis',
      'ruht_auf_stein',
    ],
    islandReaktionen: {
      vulkan: '*zieht sich kurz in den Panzer zurück* Es ist heiß hier. Aber weißt du... ich habe gelernt, dass man sich vor Hitze nicht verstecken muss. Man muss nur lernen, wie man damit umgeht. Langsam. Schritt für Schritt.',
      ozean: '*schwimmt freudig im Wasser* Das ist mein Element! Wasser trägt dich. Auch wenn du denkst, du gehst unter – das Wasser hält dich. Genau wie die Menschen, die dich lieben.',
      wald: 'Ich kenne diesen Wald. Er sieht beängstigend aus, aber er ist alt und weise. Alte Dinge sind selten gefährlich – sie haben nur viele Geschichten zu erzählen.',
      berg: '*schaut langsam nach oben* Dieser Berg ist hoch. Aber ich habe Zeit. Und du auch. Es gibt keinen Zeitdruck für Wachstum.',
      garten: 'Ein Garten braucht Geduld. Samen wachsen nicht schneller, wenn man an ihnen zieht. Manchmal muss man einfach... warten und vertrauen.',
      nacht: '*Panzer-Muster beginnt leicht zu leuchten* In der Stille höre ich die Welt atmen. Und mich selbst. Versuch es mal. Einfach... atmen.',
      regenbogen: 'Weißt du, mein Panzer hat sich über die Jahre verändert. Neue Muster, neue Kratzer, neue Farben. Ich bin nicht mehr die Schildkröte, die ich einmal war. Und das ist wunderbar.',
      zuhause: '*legt sich neben dich* Manche Reisen braucht man, um zu verstehen, dass man schon immer genug war. Du warst schon immer genug.',
    },
    dialogHinweise: {
      vulkan: [
        'Nimm dir Zeit. Nicht jede Antwort muss sofort kommen.',
        'Dieser NPC ist wie ein Vulkan – unter der harten Oberfläche brodelt viel.',
        'Manchmal ist die stärkste Reaktion: Nicht reagieren. Sondern erst fühlen.',
      ],
      ozean: [
        'Trauer ist wie der Ozean – sie kommt in Wellen. Manche sind groß, manche klein. Aber sie hören nie ganz auf. Und das ist normal.',
        'Erlaube diesem NPC, in seinem eigenen Tempo zu trauern.',
        'Manche Dinge kann man nicht reparieren. Aber man kann lernen, mit dem Zerbrochenen zu leben.',
      ],
      wald: [
        'Angst macht schnell. Aber die besten Entscheidungen kommen langsam.',
        'Was wäre, wenn du dir erlaubst, Angst zu haben? Ohne sie zu bekämpfen? Einfach... sie da sein lassen?',
        'Sicherheit kommt nicht davon, alles zu kontrollieren. Sie kommt davon, zu vertrauen.',
      ],
      berg: [
        'Wert kann man nicht messen. Nicht in Noten, nicht in Likes, nicht in Platzierungen.',
        'Dieser NPC versucht, genug zu sein. Aber "genug" ist kein Ziel – es ist ein Zustand. Und er ist es bereits.',
        'Wachstum braucht Zeit. Und manchmal sieht Wachstum aus wie Stillstand.',
      ],
      garten: [
        'Die tiefsten Verbindungen entstehen langsam. Wie ein Baum, der Wurzeln schlägt.',
        'Vertrauen ist wie mein Panzer – es braucht Jahre, um aufgebaut zu werden. Und Sekunden, um beschädigt zu werden.',
        'Aber beschädigte Dinge können repariert werden. Wenn beide es wollen.',
      ],
      nacht: [
        'Stille ist nicht leer. Sie ist der Raum, in dem du dich selbst findest.',
        'Jede Nacht endet mit einem Morgen. Aber die Nacht hat auch ihre eigene Schönheit.',
        'Atme. Ein. Aus. Mehr musst du gerade nicht tun.',
      ],
      regenbogen: [
        'Du veränderst dich. Das ist keine Schwäche – das ist Leben.',
        'Identität ist keine Festung. Sie ist ein Fluss. Fließend, sich anpassend, aber immer du.',
        'Du musst nicht alles sein. Du musst nur du sein.',
      ],
      zuhause: [
        'Die Reise ist vorbei. Aber die Geschichte geht weiter. Deine Geschichte.',
        'Du hast gelernt, zu fühlen. Zu verstehen. Zu akzeptieren. Das sind die größten Geschenke.',
        'Sei sanft mit dir. Immer.',
      ],
    },
  },
];

export const getCompanion = (id: string): Companion | undefined =>
  companions.find((c) => c.id === id);

export const companionLevels = [
  { level: 1 as const, name: 'Begleiter', beschreibung: 'Folgt dir still und ist an deiner Seite.' },
  { level: 2 as const, name: 'Vertrauter', beschreibung: 'Gibt dir Hinweise in Szenarien und reagiert auf deine Entscheidungen.' },
  { level: 3 as const, name: 'Seelenverwandter', beschreibung: 'Erzählt dir seine eigene Geschichte – ehrlich und verletzlich.' },
  { level: 4 as const, name: 'Herzensfreund', beschreibung: 'Spezial-Animationen freigeschaltet. Euer Band ist stark.' },
  { level: 5 as const, name: 'Seelenpartner', beschreibung: 'Einzigartiges Finale-Element. Ihr seid eins.' },
];
