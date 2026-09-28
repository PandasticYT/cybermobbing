import type { Scenario } from '../types/scenario'

export const scenarios: Scenario[] = [
  {
    id: 'witness-class-chat',
    title: 'Klassenchat als Zeug:in',
    perspective: 'witness',
    description: 'Du siehst, wie Max im Klassenchat ausgelacht wird.',
    maxSituations: 5,
    startStep: 'start',
    steps: [
      {
        id: 'start',
        messages: ['Leon: "Wer hat das Bild von Max gesehen? 😂"', 'Tim: "💀💀💀"', 'Max: "Bitte löscht das ..."'],
        choices: [
          { id: 'join-in', label: 'Mitmachen', nextStep: 'join-in' },
          { id: 'silent', label: 'Nichts tun', nextStep: 'silent' },
          { id: 'speak-up', label: 'Im Chat widersprechen', nextStep: 'speak-up' },
          { id: 'dm-max', label: 'Max privat schreiben', nextStep: 'dm-max' },
        ],
      },
      {
        id: 'join-in',
        sender: 'System',
        messages: [
          'Du schickst ein weiteres Meme.',
          'Die Gruppe reagiert mit noch mehr Spott.',
          'Max schreibt nichts mehr im Chat.',
        ],
        consequence: 'Die Situation eskaliert. Auch Mitmachen hat Folgen.',
      },
      {
        id: 'silent',
        sender: 'System',
        messages: [
          'Du bleibst still.',
          'Die Nachrichten laufen weiter.',
          'Max verlässt kurz darauf den Chat.',
        ],
        consequence: 'Nichtstun verändert den Verlauf ebenfalls.',
      },
      {
        id: 'speak-up',
        sender: 'System',
        messages: [
          'Du schreibst: "Stop, das geht zu weit."',
          'Zwei Mitschüler:innen reagieren mit 👍.',
          'Einige machen trotzdem weiter.',
        ],
        consequence: 'Widerspruch kann unterstützen, braucht aber oft weitere Schritte.',
        evidenceOptions: [
          { id: 'message', label: 'Nachricht selbst', important: true },
          { id: 'username', label: 'Nutzername', important: true },
          { id: 'time', label: 'Uhrzeit', important: true },
          { id: 'context', label: 'Kontext-Nachrichten', important: true },
          { id: 'mood', label: '"War nur Spaß"-Kommentar', important: false },
        ],
      },
      {
        id: 'dm-max',
        sender: 'System',
        messages: ['Du schreibst Max privat.', 'Max antwortet: "Danke, ich wusste nicht, wen ich fragen soll."'],
        consequence: 'Private Unterstützung kann eine wichtige Entlastung sein.',
      },
    ],
  },
  {
    id: 'victim-direct',
    title: 'Direkt betroffen im Gruppenchat',
    perspective: 'victim',
    description: 'Du bist selbst Ziel von verletzenden Nachrichten.',
    maxSituations: 5,
    startStep: 'start',
    steps: [
      {
        id: 'start',
        messages: [
          'Unbekannt: "Warum bist du überhaupt noch in der Gruppe?"',
          'Unbekannt: "Alle finden dich peinlich."',
          'Unbekannt: "Warte ab, morgen in der Schule."',
        ],
        choices: [
          { id: 'retaliate', label: 'Zurückbeleidigen', nextStep: 'retaliate' },
          { id: 'collect', label: 'Beweise sichern', nextStep: 'collect' },
          { id: 'block-report', label: 'Blockieren & melden', nextStep: 'block-report' },
          { id: 'ask-help', label: 'Vertrauensperson informieren', nextStep: 'ask-help' },
        ],
      },
      {
        id: 'retaliate',
        messages: ['Du beleidigst zurück.', 'Die Gegenseite teilt neue Screenshots.', 'Der Ton wird noch aggressiver.'],
        consequence: 'Die Lage wird unübersichtlicher und belastender.',
      },
      {
        id: 'collect',
        messages: ['Du machst Screenshots und notierst Datum/Uhrzeit.', 'Du speicherst auch frühere Nachrichten im Verlauf.'],
        consequence: 'Belege helfen, wenn du die Situation meldest oder Unterstützung suchst.',
        evidenceOptions: [
          { id: 'msg', label: 'Beleidigende Nachricht', important: true },
          { id: 'profile', label: 'Profil/Account', important: true },
          { id: 'date', label: 'Datum', important: true },
          { id: 'time', label: 'Uhrzeit', important: true },
          { id: 'favorite-color', label: 'Profilfarbe', important: false },
        ],
      },
      {
        id: 'block-report',
        messages: ['Du blockierst den Account und nutzt die Meldefunktion.', 'Die Plattform bestätigt den Eingang der Meldung.'],
        consequence: 'Du reduzierst direkte Angriffe und startest offizielle Schritte.',
      },
      {
        id: 'ask-help',
        messages: ['Du zeigst einer Lehrkraft die Screenshots.', 'Gemeinsam besprecht ihr das weitere Vorgehen.'],
        consequence: 'Unterstützung von Erwachsenen kann Sicherheit schaffen.',
      },
    ],
  },
  {
    id: 'poster-regret',
    title: 'Ich habe etwas gepostet',
    perspective: 'poster',
    description: 'Du merkst, dass ein verletzender Post weiter verbreitet wurde.',
    maxSituations: 5,
    startStep: 'start',
    steps: [
      {
        id: 'start',
        messages: [
          'Du hast aus Wut etwas über einen Mitschüler gepostet.',
          'Nach kurzer Zeit wird der Beitrag in mehreren Gruppen geteilt.',
          'Du merkst, dass die Situation außer Kontrolle gerät.',
        ],
        choices: [
          { id: 'double-down', label: 'Noch etwas schreiben', nextStep: 'double-down' },
          { id: 'joke', label: 'Als Spaß darstellen', nextStep: 'joke' },
          { id: 'delete-apologize', label: 'Löschen & entschuldigen', nextStep: 'delete-apologize' },
          { id: 'seek-support', label: 'Erwachsene Hilfe holen', nextStep: 'seek-support' },
        ],
      },
      {
        id: 'double-down',
        messages: ['Du postest nach.', 'Weitere Leute steigen ein.', 'Die betroffene Person zieht sich zurück.'],
        consequence: 'Die Verletzung verstärkt sich und kann rechtliche Folgen haben.',
      },
      {
        id: 'joke',
        messages: ['Du schreibst: "War doch nur Spaß."', 'Die betroffene Person meldet sich trotzdem nicht mehr.', 'Einige in der Gruppe finden es weiterhin lustig.'],
        consequence: 'Abwiegeln löst den Schaden meist nicht.',
      },
      {
        id: 'delete-apologize',
        messages: ['Du löschst den Beitrag.', 'Du entschuldigst dich direkt und ohne Ausreden.', 'Die Lage beruhigt sich langsam.'],
        consequence: 'Verantwortung übernehmen ist ein wichtiger Deeskalationsschritt.',
      },
      {
        id: 'seek-support',
        messages: ['Du sprichst mit einer Vertrauensperson.', 'Ihr besprecht, wie du Schaden begrenzen und Verantwortung übernehmen kannst.'],
        consequence: 'Hilfe holen ist auch in dieser Rolle sinnvoll.',
      },
    ],
  },
]

export const perspectiveSwitchMap: Record<string, string> = {
  'witness-class-chat': 'victim-direct',
  'victim-direct': 'witness-class-chat',
  'poster-regret': 'victim-direct',
}
