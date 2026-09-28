import { useMemo, useState } from 'react'

const paths = [
  { id: 'victim', label: 'Mir passiert das gerade' },
  { id: 'witness', label: 'Ich sehe es' },
  { id: 'poster', label: 'Ich habe etwas gepostet, das ich bereue' },
] as const

type PathId = (typeof paths)[number]['id']

const victimQuestions = [
  'Gibt es Drohungen?',
  'Werden private oder intime Inhalte verbreitet?',
  'Kennst du die Person?',
] as const

const witnessQuestions = [
  'Hast du es selbst gesehen?',
  'Traust du dir direktes Eingreifen zu?',
  'Möchtest du anonym Hilfe holen?',
] as const

const posterQuestions = [
  'Wurde dein Beitrag bereits weitergeleitet?',
  'Möchtest du Verantwortung übernehmen?',
  'Brauchst du Unterstützung für das nächste Gespräch?',
] as const

const baseActions = [
  'Situation nicht weiter eskalieren',
  'Beweise sichern',
  'Inhalt/Account melden',
  'Person blockieren',
  'Vertrauensperson einbeziehen',
] as const

export function HelpCompass() {
  const [path, setPath] = useState<PathId | null>(null)
  const [answers, setAnswers] = useState<Record<string, boolean>>({})

  const questions = useMemo(() => {
    if (path === 'victim') return victimQuestions
    if (path === 'witness') return witnessQuestions
    if (path === 'poster') return posterQuestions
    return []
  }, [path])

  const recommendations = useMemo(() => {
    if (!path) return []

    if (path === 'victim') {
      return [
        ...baseActions,
        answers['Gibt es Drohungen?'] || answers['Werden private oder intime Inhalte verbreitet?']
          ? 'Bei akuter Bedrohung sofort Erwachsene oder Polizei (110) einschalten'
          : 'Passende Beratungsstelle kontaktieren',
      ]
    }

    if (path === 'witness') {
      return [
        'Du musst nicht alleine eingreifen',
        answers['Traust du dir direktes Eingreifen zu?']
          ? 'Im Chat ruhig widersprechen und Unterstützung holen'
          : 'Vertrauensperson informieren',
        'Betroffene Person privat unterstützen',
        'Beweise sichern und weitergeben',
      ]
    }

    return [
      'Beitrag löschen und nicht weiter verbreiten',
      answers['Möchtest du Verantwortung übernehmen?']
        ? 'Direkt und ohne Ausreden entschuldigen'
        : 'Vor der Reaktion kurz reflektieren: Was wolltest du erreichen?',
      'Privates Gespräch suchen',
      'Bei Unsicherheit Unterstützung durch Erwachsene holen',
      'Beleidigungen/Drohungen können rechtliche Folgen haben',
    ]
  }, [answers, path])

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">Hilfe-Kompass</h2>
      <p className="mt-1 text-sm text-slate-600">Was ist deine Situation?</p>

      <div className="mt-4 grid gap-2 md:grid-cols-3">
        {paths.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`rounded-xl border px-3 py-2 text-left text-sm font-semibold transition ${
              path === item.id
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
            }`}
            onClick={() => {
              setPath(item.id)
              setAnswers({})
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {questions.length > 0 && (
        <div className="mt-4 space-y-3">
          {questions.map((question) => (
            <div key={question} className="rounded-xl bg-slate-50 p-3">
              <p className="text-sm font-medium text-slate-700">{question}</p>
              <div className="mt-2 flex gap-2">
                {(['Ja', 'Nein'] as const).map((choice) => {
                  const value = choice === 'Ja'
                  return (
                    <button
                      key={choice}
                      type="button"
                      className={`rounded-lg px-3 py-1 text-sm ${
                        answers[question] === value
                          ? 'bg-slate-900 text-white'
                          : 'bg-white text-slate-700'
                      }`}
                      onClick={() => setAnswers((current) => ({ ...current, [question]: value }))}
                    >
                      {choice}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          <ol className="space-y-2 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
            {recommendations.map((entry, index) => (
              <li key={entry}>
                <span className="font-semibold text-slate-900">{index + 1}.</span> {entry}
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  )
}
