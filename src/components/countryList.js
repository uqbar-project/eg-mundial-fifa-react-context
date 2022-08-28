import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CountryRow } from './countryRow'

export class CountryList extends Component {

    render() {
        const countryList = this.props.countries.map(country =>
            <Grid item xs={2} key={'grid' + country.name}>
                <Card key={'card' + country.name}>
                    <CardContent key={'content' + country.name}>
                        <CountryRow country={country} key={country.name} testId="countryRow" />
                    </CardContent>
                </Card>
            </Grid>
        )

        return (
            <Grid container fluid="true" item xs={12} spacing={3}>
                {countryList}
            </Grid>
        )
    }

}

CountryList.propTypes = {
    countries: PropTypes.array
}