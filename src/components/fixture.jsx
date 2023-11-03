import { FormControl } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useState } from 'react'

import { countryService } from '../services/countryService'
import { PositionTable } from './positionTable'
import { Results } from './results'
import { SelectGroup } from './selectGroup'


const Fixture = () => {
    const [group, setGroup] = useState('')
    const groups = countryService.getGroups()
    const filterGroup = (event) => {
        const group = event.target.value
        setGroup(group)
    }

    return (
        <div>
            <div className="search">
                <FormControl className="formControl">
                    <SelectGroup
                        value={group}
                        onChange={filterGroup}
                        groups={groups}
                    />
                </FormControl>
            </div>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={7} xl={7}>
                    <Results group={group} />
                </Grid>
                <Grid item xs={12} sm={12} md={5} xl={5}>
                    <PositionTable group={group} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Fixture