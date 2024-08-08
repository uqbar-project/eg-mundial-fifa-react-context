import './countryList.css'

import { Country } from 'src/domain/country'
import { CountryRow } from './countryRow'

export const CountryList = ({ countries }: { countries: Country[] }) => {

  const countryList = countries.map(country =>
    <div className='countryRowContainer' key={'content' + country.name}>
      <CountryRow country={country} key={country.name} testId="countryRow" />
    </div>
  )

  return (
    <div className="countryList">
      {countryList}
    </div>
  )

}