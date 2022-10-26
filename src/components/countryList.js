import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import PropTypes from 'prop-types'
import React from 'react'

import { CountryRow } from './countryRow'

export const CountryList = ({ countries }) => {

    const countryList = countries.map(country =>
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

CountryList.propTypes = {
    countries: PropTypes.array
}