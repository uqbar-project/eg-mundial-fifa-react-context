import React, { Component } from 'react'
import { Country } from '../domain/country'
import PropTypes from 'prop-types'

export class CountryRow extends Component {

    render() {
        return (
            <div data-testid="countryRow" className="countryRow">
                <img className="flag" src={'/assets/' + this.props.country.flag} alt={this.props.country.name} />
                {this.props.country.name}
            </div>
        )
    }

}

CountryRow.propTypes = {
    country: PropTypes.instanceOf(Country)
}