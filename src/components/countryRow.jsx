import { Country } from '../domain/country'
import PropTypes from 'prop-types'

export const CountryRow = ({ testId, country }) => {
    return (
        <div data-testid={testId} className="countryRow">
            <img className="flag" src={'/assets/' + country.flag} alt={country.name} height="32" width="50" />
            {country.name}
        </div>
    )
}

CountryRow.propTypes = {
    country: PropTypes.instanceOf(Country),
    testId: PropTypes.string,
}