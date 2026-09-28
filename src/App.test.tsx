import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('starts the simulation and shows choices', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /simulation starten/i }))

    expect(screen.getByText(/klassenchat als zeug:in/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /mitmachen/i })).toBeInTheDocument()
  })

  it('resets decisions with the restart button', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /simulation starten/i }))
    await user.click(screen.getByRole('button', { name: /^mitmachen$/i }))

    expect(screen.getByText(/die situation eskaliert/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /entscheidung ändern/i }))

    expect(screen.getByRole('button', { name: /^mitmachen$/i })).toBeInTheDocument()
  })
})
