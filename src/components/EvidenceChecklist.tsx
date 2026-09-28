import { useMemo, useState } from 'react'
import { CheckCircle2, ShieldCheck } from 'lucide-react'
import type { EvidenceOption } from '../types/scenario'

type EvidenceChecklistProps = {
  options: EvidenceOption[]
}

export function EvidenceChecklist({ options }: EvidenceChecklistProps) {
  const [selected, setSelected] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  const importantIds = useMemo(
    () => options.filter((option) => option.important).map((option) => option.id),
    [options],
  )

  const isComplete =
    importantIds.every((id) => selected.includes(id)) &&
    selected.every((id) => importantIds.includes(id))

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
        <ShieldCheck className="h-4 w-4" />
        Beweise sichern
      </div>
      <p className="mb-3 text-sm text-slate-600">
        Wähle aus, was du dokumentieren würdest.
      </p>

      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.id} className="flex items-center gap-2 rounded-lg bg-white p-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={selected.includes(option.id)}
              onChange={(event) => {
                setSubmitted(false)
                setSelected((current) =>
                  event.target.checked
                    ? [...current, option.id]
                    : current.filter((item) => item !== option.id),
                )
              }}
            />
            {option.label}
          </label>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setSubmitted(true)}
        className="mt-3 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
      >
        Auswahl prüfen
      </button>

      {submitted && (
        <p className="mt-3 rounded-lg bg-white p-3 text-sm text-slate-700">
          {isComplete ? (
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Diese Informationen können später hilfreich sein, wenn du meldest oder Unterstützung suchst.
            </span>
          ) : (
            'Fast: Für eine Meldung sind meist Nachricht, Account, Datum/Uhrzeit und Kontext besonders wichtig.'
          )}
        </p>
      )}
    </section>
  )
}
