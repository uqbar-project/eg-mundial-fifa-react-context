import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from '../context/Context'
import { PositionTable } from './positionTable'
import Fixture from './fixture'

describe("position table", () => {
  test("position table is correctly generated", async () => {
    const { queryAllByTestId } = render(
      <Provider>
        <PositionTable />
      </Provider >
    )
    const countries = await queryAllByTestId('countryRow')
    expect(countries[0]).toHaveTextContent('Russia')
    expect(countries[1]).toHaveTextContent('Uruguay')
    expect(countries[2]).toHaveTextContent('Egypt')
    expect(countries[3]).toHaveTextContent('Saudi Arabia')
  })

  it('changing score of Russia changes the position table accordingly', async () => {
    const { getByTestId, queryAllByTestId } = render(
      <Provider>
        <Fixture />
      </Provider >
    )
    const golesRussia = getByTestId('russia_saudi-arabia_russia_goles')
    userEvent.type(golesRussia, 0)
    waitFor(() => {
      const countries = queryAllByTestId('countryRow')
      expect(countries[0]).toHaveTextContent('Uruguay')
      expect(countries[1]).toHaveTextContent('Russia')
      expect(countries[2]).toHaveTextContent('Saudi Arabia')
      expect(countries[3]).toHaveTextContent('Egypt')
    })
  })
})