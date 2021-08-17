import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import PropTypes from 'prop-types'

export const SelectGroup = ({ value, onChange, groups }) => {
    return <>
        <FormHelperText>Grupo</FormHelperText>
        <Select
            id='group'
            value={value}
            onChange={onChange}
            inputProps={{
                name: 'group',
                id: 'group'
            }}
        >
            <MenuItem value="">
                <em>Todos</em>
            </MenuItem>
            {groups.map(group => <MenuItem value={group} key={group}>{`Grupo ${group}`}</MenuItem>)}
        </Select>
    </>
}

SelectGroup.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    groups: PropTypes.array
}
