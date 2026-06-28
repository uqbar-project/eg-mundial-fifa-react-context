import './fixture.css'

import { type ChangeEvent, useState } from 'react'

import { countryService } from '../services/countryService'
import { PositionTable } from './positionTable'
import { Results } from './results'
import { SelectGroup } from './selectGroup'

const Fixture = () => {
  const [group, setGroup] = useState('')
  const groups = countryService.getGroups()
  const filterGroup = (event: ChangeEvent) => {
    const group = (event.target as HTMLSelectElement).value
    setGroup(group)
  }

  return (
    <div className="fixture">
      <div className="search">
        <div className="formControl">
          <SelectGroup value={group} onChange={filterGroup} groups={groups} />
        </div>
      </div>
      <div className="container">
        <div>
          <Results group={group} />
        </div>
        <div>
          <PositionTable group={group} />
        </div>
      </div>
    </div>
  )
}

export default Fixture
