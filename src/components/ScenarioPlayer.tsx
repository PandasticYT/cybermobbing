import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { perspectiveSwitchMap } from '../data/scenarios'
import type { Scenario, Step } from '../types/scenario'
import { EvidenceChecklist } from './EvidenceChecklist'

type ScenarioPlayerProps = {
  scenario: Scenario
  onExit: () => void
  onSwitchPerspective: (scenarioId: string) => void
}

export function ScenarioPlayer({
  scenario,
  onExit,
  onSwitchPerspective,
}: ScenarioPlayerProps) {
  const [stepId, setStepId] = useState(scenario.startStep)
  const [path, setPath] = useState<string[]>([])

  const stepsById = useMemo(
    () => Object.fromEntries(scenario.steps.map((step) => [step.id, step])),
    [scenario.steps],
  )

  const step = stepsById[stepId] as Step

  const switchTargetId = perspectiveSwitchMap[scenario.id]
  const switchLabel =
    switchTargetId === 'victim-direct'
      ? 'Wie erlebt die betroffene Person dieselbe Situation?'
      : 'Wie wirkt dieselbe Situation als Zeug:in?'

  return (
    <section className="mx-auto w-full max-w-3xl space-y-4">
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <header className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <button
            type="button"
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600"
            onClick={onExit}
          >
            <ArrowLeft className="h-4 w-4" /> Zurück
          </button>
          <div className="text-sm font-semibold text-slate-700">{scenario.title}</div>
          <div className="text-xs text-slate-500">Situation {Math.min(path.length + 1, scenario.maxSituations)}/{scenario.maxSituations}</div>
        </header>

        <div className="space-y-3 p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {step.messages.map((message) => (
                <div key={message} className="max-w-[90%] rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-700">
                  {message}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {step.consequence && (
            <p className="rounded-xl bg-indigo-50 p-3 text-sm text-indigo-700">{step.consequence}</p>
          )}

          {step.evidenceOptions && <EvidenceChecklist options={step.evidenceOptions} />}

          {step.choices ? (
            <div className="grid gap-2">
              {step.choices.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:border-slate-900"
                  onClick={() => {
                    setPath((current) => [...current, choice.id])
                    setStepId(choice.nextStep)
                  }}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">Simulation abgeschlossen</p>
              <p className="text-sm text-slate-600">
                Du hast {new Set(path).size} von {scenario.maxSituations} möglichen Handlungsschritten ausprobiert.
              </p>
              {switchTargetId && (
                <button
                  type="button"
                  className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                  onClick={() => onSwitchPerspective(switchTargetId)}
                >
                  {switchLabel}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          setStepId(scenario.startStep)
          setPath([])
        }}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
      >
        <RotateCcw className="h-4 w-4" /> ↩ Entscheidung ändern
      </button>
    </section>
  )
}
