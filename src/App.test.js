import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CountrySearch } from './components/countrySearch'
import { MundialAppBar } from './components/mundialAppBar'
import { Results } from './components/results'
import { Provider } from './context/Context'


it('searching countries by text', async () => {
  render(<CountrySearch />)
  const countrySearch = screen.getByTestId('country')
  // bajo nivel fireEvent.change(countrySearch, { target: { value: 'F' }})
  // alto nivel
  userEvent.type(countrySearch, 'F')
  const allCountries = await screen.findAllByTestId('countryRow')
  expect(allCountries[0]).toHaveTextContent('Francia')
})

it('searching A group returns the corresponding countries', async () => {
  // Este test tira warnings muy molestos de una forma poco clara, la realidad es que 
  // no encontré la forma de eliminar esos warnings sin que se rompan los tests
  render(<CountrySearch />)
  fireEvent.mouseDown(screen.getByRole('button'))
  const listbox = within(screen.getByRole('listbox'))
  fireEvent.click(listbox.getByText(/A/i))
  const allCountries = await screen.findAllByTestId('countryRow')
  expect(allCountries.length).toBe(4)
  const groupACountries = allCountries.map(country => country.textContent).sort((a, b) => a >= b)
  expect(groupACountries).toStrictEqual(['Ecuador', 'Países Bajos', 'Qatar', 'Senegal'])
})

it('results show how many goals scored one of the teams', () => {
  render(
    <Provider>
      <Results />
    </Provider >
  )
  const goalsHomeTeam = screen.getByTestId('qatar_ecuador_qatar_goles')
  expect(goalsHomeTeam).toHaveValue(1)
})

it('has a smoke test for App', () => {
  render(<Provider><App/></Provider>)
  expect(screen.getByTestId('app')).toBeInTheDocument()
})

it('AppBar has two routes', () => {
  render(<BrowserRouter><MundialAppBar/></BrowserRouter>)
  expect(screen.getAllByRole('button').length).toBe(2)
})