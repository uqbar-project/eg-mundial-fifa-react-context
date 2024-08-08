import './countrySearch.css'

import { ChangeEvent, useState } from 'react'

import { Country } from '../domain/country'
import { countryService } from '../services/countryService'
import { CountryList } from './countryList'
import { SelectGroup } from './selectGroup'

export const CountrySearch = () => {

  const [search, setSearch] = useState(new Country())
  const [countries, setCountries] = useState<Country[]>([])
  const groups = countryService.getGroups()

  const doSearch = (newSearch: Country) => {
    setSearch(newSearch)
    setCountries(countryService.getCountries(newSearch))
  }

  const handleChange = (value: string, property: 'name' | 'group') => {
    const delta = search
    delta[property] = value
    const newSearch = Object.assign(new Country(), delta)
    doSearch(newSearch)
  }

  return (
    <div>
      <div className="search">
        <div className="formControl">
          <label>País</label>
          <input type="text"
            data-testid="country"
            value={search.name}
            onChange={(event) => handleChange(event.target.value, 'name')}
          />
        </div>
        <div className="formControl">
          <SelectGroup
            value={search.group}
            onChange={(event: ChangeEvent) => handleChange((event.target as HTMLSelectElement).value, 'group')}
            groups={groups}
          />
        </div>
      </div>
      <CountryList countries={countries} />
    </div>
  )

}
