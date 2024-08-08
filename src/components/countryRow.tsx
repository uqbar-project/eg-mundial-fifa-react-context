import { Country } from '../domain/country'

export const CountryRow = ({ testId, country }: { testId: string, country: Country }) => {
  return (
    <div data-testid={testId} className="countryRow">
      <img className="flag" src={'/src/assets/' + country.flag} alt={country.name} height="32" width="50" />
      {country.name}
    </div>
  )
}