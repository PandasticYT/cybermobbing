import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Compass, MessageSquareText, ShieldAlert, Users } from 'lucide-react'
import { HelpCompass } from './components/HelpCompass'
import { ScenarioPlayer } from './components/ScenarioPlayer'
import { helpResources } from './data/helpResources'
import { scenarios } from './data/scenarios'

function App() {
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null)
  const [activePerspective, setActivePerspective] = useState<'victim' | 'witness' | 'poster' | null>(null)

  const filteredScenarios = useMemo(
    () =>
      activePerspective
        ? scenarios.filter((scenario) => scenario.perspective === activePerspective)
        : scenarios,
    [activePerspective],
  )

  const activeScenario = scenarios.find((scenario) => scenario.id === activeScenarioId) ?? null

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-6 md:px-8 md:py-10">
        <section className="space-y-6 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Was würdest du tun?</p>
            <h1 className="text-3xl font-black leading-tight md:text-5xl">Cybermobbing passiert schneller, als man denkt.</h1>
            <p className="max-w-2xl text-sm text-slate-600 md:text-base">
              Hier kannst du ausprobieren, was du in einer Cybermobbing-Situation tun würdest.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setActivePerspective('witness')
              setActiveScenarioId('witness-class-chat')
            }}
            className="w-full rounded-2xl bg-slate-900 px-5 py-5 text-left text-white md:w-auto"
          >
            <span className="text-sm font-semibold uppercase tracking-wide text-slate-300">Simulation starten</span>
            <span className="mt-1 block text-lg font-semibold">Erlebe eine Situation und entscheide selbst.</span>
          </button>

          <div className="grid gap-3 md:grid-cols-4">
            {[
              { id: 'victim', title: 'Mir passiert das', icon: ShieldAlert },
              { id: 'witness', title: 'Ich sehe es', icon: Users },
              { id: 'poster', title: 'Ich habe etwas getan', icon: MessageSquareText },
              { id: 'help', title: 'Hilfe & Wissen', icon: Compass },
            ].map((card) => (
              <button
                key={card.id}
                type="button"
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-slate-400"
                onClick={() => {
                  if (card.id === 'help') {
                    document.getElementById('hilfe-wissen')?.scrollIntoView({ behavior: 'smooth' })
                    return
                  }
                  setActivePerspective(card.id as 'victim' | 'witness' | 'poster')
                  setActiveScenarioId(null)
                }}
              >
                <card.icon className="mb-3 h-5 w-5 text-slate-700" />
                <p className="text-sm font-semibold text-slate-800">{card.title}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {([
              ['witness', 'Zeug:in'],
              ['victim', 'Betroffene Person'],
              ['poster', 'Ich habe gepostet'],
            ] as const).map(([perspective, label]) => (
              <button
                key={perspective}
                type="button"
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  activePerspective === perspective
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-700'
                }`}
                onClick={() => {
                  setActivePerspective(perspective)
                  setActiveScenarioId(null)
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {!activeScenario && (
            <div className="grid gap-3 md:grid-cols-2">
              {filteredScenarios.map((scenario) => (
                <motion.button
                  key={scenario.id}
                  whileHover={{ y: -2 }}
                  type="button"
                  onClick={() => setActiveScenarioId(scenario.id)}
                  className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-900">{scenario.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{scenario.description}</p>
                </motion.button>
              ))}
            </div>
          )}

          {activeScenario && (
            <ScenarioPlayer
              scenario={activeScenario}
              onExit={() => setActiveScenarioId(null)}
              onSwitchPerspective={(scenarioId) => {
                const target = scenarios.find((scenario) => scenario.id === scenarioId)
                if (!target) return
                setActivePerspective(target.perspective)
                setActiveScenarioId(target.id)
              }}
            />
          )}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Mir passiert das</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
              <li>Ruhe bewahren und nicht zurückeskalieren</li>
              <li>Beweise sichern</li>
              <li>Blockieren, melden, Unterstützung holen</li>
            </ul>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Ich sehe es</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
              <li>Du musst nicht alleine eingreifen</li>
              <li>Betroffene privat unterstützen</li>
              <li>Erwachsene oder Vertrauenspersonen informieren</li>
            </ul>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Ich habe etwas getan</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
              <li>Beitrag löschen und nicht weiter verbreiten</li>
              <li>Verantwortung übernehmen und entschuldigen</li>
              <li>Bei Unsicherheit Unterstützung holen</li>
            </ul>
          </article>
        </section>

        <HelpCompass />

        <section id="hilfe-wissen" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <h2 className="text-2xl font-black">Hilfe & Wissen</h2>
          <p className="mt-1 text-sm text-slate-600">
            Externe Hilfsangebote (seriöse Anlaufstellen in Deutschland)
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {helpResources.map((resource) => (
              <a
                key={resource.title}
                href={resource.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-400"
              >
                <p className="text-sm font-bold text-slate-900">{resource.title}</p>
                <p className="text-sm font-semibold text-slate-700">{resource.subtitle}</p>
                <p className="mt-1 text-sm text-slate-600">{resource.description}</p>
              </a>
            ))}
          </div>

          <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
            <AlertTriangle className="h-4 w-4" />
            Bei akuter Bedrohung sofort Erwachsene informieren oder den Notruf 110 wählen.
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
