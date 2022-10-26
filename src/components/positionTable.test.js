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
    expect(screen.getByTestId('A-0')).toHaveTextContent('Ecuador')
    expect(screen.getByTestId('A-1')).toHaveTextContent('Senegal')
    expect(screen.getByTestId('A-2')).toHaveTextContent('Países Bajos')
    expect(screen.getByTestId('A-3')).toHaveTextContent('Qatar')
  })

  it('changing score of Russia changes the position table accordingly', async () => {
    render(
      <Provider>
        <Fixture />
      </Provider >
    )
    const golesRussia = screen.getByTestId('qatar_ecuador_ecuador_goles')
    userEvent.type(golesRussia, "{backspace}0")
    expect(screen.getByTestId('A-0')).toHaveTextContent('Senegal')
    expect(screen.getByTestId('A-1')).toHaveTextContent('Qatar')
    expect(screen.getByTestId('A-2')).toHaveTextContent('Países Bajos')
    expect(screen.getByTestId('A-3')).toHaveTextContent('Ecuador')
  })
})