export type Perspective = 'victim' | 'witness' | 'poster'

export type Choice = {
  id: string
  label: string
  nextStep: string
}

export type EvidenceOption = {
  id: string
  label: string
  important: boolean
}

export type Step = {
  id: string
  sender?: string
  messages: string[]
  choices?: Choice[]
  consequence?: string
  evidenceOptions?: EvidenceOption[]
  perspectiveSwitchTo?: string
}

export type Scenario = {
  id: string
  title: string
  perspective: Perspective
  description: string
  maxSituations: number
  startStep: string
  steps: Step[]
}
