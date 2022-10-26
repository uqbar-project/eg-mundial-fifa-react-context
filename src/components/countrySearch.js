import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import React, { useEffect, useState } from 'react'

import { Country } from '../domain/country'
import { countryService } from '../services/countryService'
import { CountryList } from './countryList'
import { SelectGroup } from './selectGroup'

export const CountrySearch = (props) => {

  const [search, setSearch] = useState(new Country())
  const [countries, setCountries] = useState([])
  const [groups, setGroups] = useState([])

  useEffect(() => {
    const fetchGroups = () => {
      setGroups(countryService.getGroups())
    }

    fetchGroups()
  }, [])

  useEffect(() => {
    const searchCountries = () => {
      setCountries(countryService.getCountries(search))
    }

    searchCountries()
  }, [search])

  const handleChange = (value, property) => {
    const delta = search
    delta[property] = value
    const newSearch = Object.assign(new Country(), delta)
    setSearch(newSearch)
  }

  return (
    <div>
      <div className="search">
        <FormControl className="formControl">
          <FormHelperText>País</FormHelperText>
          <TextField
            inputProps={{ 'data-testid': 'country' }}
            value={search.name}
            onChange={(event) => handleChange(event.target.value, 'name')}
          />
          <br />
          <SelectGroup
            inputProps={{ 'data-testid': 'group' }}
            value={search.group}
            onChange={(event) => handleChange(event.target.value, 'group')}
            groups={groups}
          />
        </FormControl>
      </div>
      <CountryList countries={countries} />
    </div>
  )

}
