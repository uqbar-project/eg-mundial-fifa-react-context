import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import React, { Component } from 'react'

import { Country } from '../domain/country'
import { countryService } from '../services/countryService'
import { CountryList } from './countryList'
import { SelectGroup } from './selectGroup'

export class CountrySearch extends Component {

  constructor(props) {
    super(props)
    this.groups = countryService.getGroups()
    this.state = {
      search: new Country(),
      countries: [],
    }
  }

  handleChange(property, event) {
    event.preventDefault()
    const search = this.state.search
    search[property] = event.target.value
    this.setState({
      search,
      countries: countryService.getCountries(search)
    })
  }

  render() {
    return (
      <div>
        <div className="search">
          <FormControl className="formControl">
            <FormHelperText>País</FormHelperText>
            <TextField
              inputProps={{ 'data-testid': 'country' }}
              value={this.state.search.name}
              onChange={this.handleChange.bind(this, 'name')}
            />
            <br />
            <SelectGroup
              inputProps={{ 'data-testid': 'group' }}
              value={this.state.search.group}
              onChange={this.handleChange.bind(this, 'group')}
              groups={this.groups}
            />
          </FormControl>
        </div>
        <CountryList countries={this.state.countries} />
      </div>
    )
  }

}
