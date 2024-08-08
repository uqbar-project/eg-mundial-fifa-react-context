import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from '../context/Context'
import { PositionTable } from './positionTable'
import Fixture from './fixture'
import { describe, expect, test } from 'vitest'

describe("position table", () => {
  test("position table is correctly generated", () => {
    render(
      <Provider>
        <PositionTable group='A' />
      </Provider >
    )
    expect(screen.getByTestId('A-0').textContent).toBe('Ecuador')
    expect(screen.getByTestId('A-1').textContent).toBe('Senegal')
    expect(screen.getByTestId('A-2').textContent).toBe('Países Bajos')
    expect(screen.getByTestId('A-3').textContent).toBe('Qatar')
  })

  test('changing score of a team changes the position table accordingly', async () => {
    render(
      <Provider>
        <Fixture />
      </Provider >
    )
    const ecuador_goals = screen.getByTestId('qatar_ecuador_ecuador_goles')
    await userEvent.type(ecuador_goals, "{backspace}0")
    expect(screen.getByTestId('A-0').textContent).toBe('Senegal')
    expect(screen.getByTestId('A-1').textContent).toBe('Qatar')
    expect(screen.getByTestId('A-2').textContent).toBe('Países Bajos')
    expect(screen.getByTestId('A-3').textContent).toBe('Ecuador')
  })
})