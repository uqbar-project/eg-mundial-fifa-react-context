import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from '../context/Context'
import { PositionTable } from './positionTable'
import Fixture from './fixture'

describe("position table", () => {
  test("position table is correctly generated", () => {
    render(
      <Provider>
        <PositionTable />
      </Provider >
    )
    expect(screen.getByTestId('A-0')).toHaveTextContent('Russia')
    expect(screen.getByTestId('A-1')).toHaveTextContent('Uruguay')
    expect(screen.getByTestId('A-2')).toHaveTextContent('Egypt')
    expect(screen.getByTestId('A-3')).toHaveTextContent('Saudi Arabia')
  })

  it('changing score of Russia changes the position table accordingly', async () => {
    render(
      <Provider>
        <Fixture />
      </Provider >
    )
    const golesRussia = screen.getByTestId('russia_saudi-arabia_russia_goles')
    userEvent.type(golesRussia, "{backspace}0")
    expect(screen.getByTestId('A-0')).toHaveTextContent('Uruguay')
    expect(screen.getByTestId('A-1')).toHaveTextContent('Russia')
    expect(screen.getByTestId('A-2')).toHaveTextContent('Saudi Arabia')
    expect(screen.getByTestId('A-3')).toHaveTextContent('Egypt')
  })
})