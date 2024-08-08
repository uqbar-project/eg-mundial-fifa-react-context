import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CountrySearch } from './components/countrySearch'
import { MundialAppBar } from './components/mundialAppBar'
import { Results } from './components/results'
import { Provider } from './context/Context'

describe('tests de app', () => {

  test('searching countries by text', async () => {
    render(<CountrySearch />)
    const countrySearch = screen.getByTestId('country')
    // bajo nivel fireEvent.change(countrySearch, { target: { value: 'F' }})
    // alto nivel
    await userEvent.type(countrySearch, 'F')
    const allCountries = await screen.findAllByTestId('countryRow')
    expect(allCountries[0].textContent).toBe('Francia')
  })
  
  // Material UI tiene un select imposible de testear por ahora
  // native = "true" permite ver las opciones pero deja de funcionar la app
  // anteriormente podía buscarse a mano el botón, ahora fue reemplazado por un svg que está oculto
  // incluso usando MenuItems no es posible encontrar opciones, solo utilizando <option> funciona
  
  // it('searching A group returns the corresponding countries', async () => {
  //   render(<CountrySearch />)
  //   const comboGroup = screen.getByTestId('group')
  //   await userEvent.selectOptions(comboGroup, 'A')
    
  //   const allCountries = await screen.findAllByTestId('countryRow')
  //   expect(allCountries.length).toBe(4)
  //   const groupACountries = allCountries.map(country => country.textContent).sort((a, b) => a >= b)
  //   expect(groupACountries).toStrictEqual(['Ecuador', 'Países Bajos', 'Qatar', 'Senegal'])
  // })
  
  test('results show how many goals scored one of the teams', () => {
    render(
      <Provider>
        <Results group='' />
      </Provider >
    )
    const goalsHomeTeam = screen.getByTestId('qatar_ecuador_qatar_goles') as HTMLInputElement
    expect(goalsHomeTeam.value).toBe('1')
  })
  
  test('has a smoke test for App', () => {
    render(<Provider><App/></Provider>)
    expect(screen.getByTestId('app')).toBeTruthy()
  })
  
  test('AppBar has two routes', () => {
    render(<BrowserRouter><MundialAppBar/></BrowserRouter>)
    expect(screen.getAllByRole('button').length).toBe(2)
  })

})