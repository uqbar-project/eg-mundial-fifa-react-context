import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CountrySearch } from './components/countrySearch'
import MundialAppBar from './components/mundialAppBar'
import { Results } from './components/results'
import { Provider } from './context/Context'


it('buscar F devuelve la lista con un solo país, Francia', async () => {
  const { getByTestId } = render(<CountrySearch />)
  const countrySearch = getByTestId('country')
  // bajo nivel fireEvent.change(countrySearch, { target: { value: 'F' }})
  // alto nivel
  userEvent.type(countrySearch, 'F')
  const allCountries = await screen.findAllByTestId('countryRow')
  expect(allCountries[0]).toHaveTextContent('France')
})

it('buscar el grupo A devuelve los países que particpan en él', async () => {
  const { getByRole } = render(<CountrySearch />)
  fireEvent.mouseDown(getByRole('button'))
  const listbox = within(getByRole('listbox'))
  fireEvent.click(listbox.getByText(/A/i))
  const allCountries = await screen.findAllByTestId('countryRow')
  expect(allCountries.length).toBe(4)
  const groupACountries = allCountries.map(country => country.textContent).sort((a, b) => a >= b)
  expect(groupACountries).toStrictEqual(['Egypt', 'Russia', 'Saudi Arabia', 'Uruguay'])
})

it('results show Russia made 5 goals against Saudi Arabia', () => {
  const { getByTestId } = render(
    <Provider>
      <Results />
    </Provider >
  )
  const golesRussia = getByTestId('russia_saudi-arabia_russia_goles')
  expect(golesRussia).toHaveValue(5)
})

it('has a smoke test for App', () => {
  const { getByTestId } = render(<Provider><App/></Provider>)
  expect(getByTestId('app')).toBeInTheDocument()
})

it('AppBar has two routes', () => {
  const { getAllByRole } = render(<BrowserRouter><MundialAppBar/></BrowserRouter>)
  expect(getAllByRole('button').length).toBe(2)
})