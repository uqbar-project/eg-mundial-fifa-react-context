import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { Context } from '../context/Context'
import { GroupPosition, PositionItem } from '../domain/groupPosition'
import { CountryRow } from './countryRow'

export const PositionTable = ({ group }) => {
    const { matches } = useContext(Context)
    const positions = new Map()
    matches.filter((match) => match.matchesGroup(group)).forEach(match => {
        const group = match.group()
        const groupPosition = positions.get(group) || new GroupPosition(group)
        groupPosition.processMatch(match)
        positions.set(group, groupPosition)
    })
    if (positions.size === 0) {
        return <></>
    }

    return (
        <Card key={'cardPosiciones'}>
            <CardContent className='cardPosicionesContent' key={'contentPosiciones'}>
                <h3>Tabla de posiciones</h3>
                {[...positions].map((itemGroup) => {
                    const group = itemGroup[0]
                    const positions = itemGroup[1].positions()
                    return <PositionGroupTable group={group} positions={positions} key={'positions_group_' + group} />
                }
                )}
            </CardContent>
        </Card>
    )

}

PositionTable.propTypes = {
    group: PropTypes.string
}

export const PositionGroupTable = (props) => {
    return (
        <div>
            <h4>Grupo {props.group}</h4>
            <Table className='positionGroupTable'>
                <TableHead>
                    <TableRow>
                        <TableCell>Equipo</TableCell>
                        <TableCell>G</TableCell>
                        <TableCell>E</TableCell>
                        <TableCell>P</TableCell>
                        <TableCell>GF</TableCell>
                        <TableCell>GC</TableCell>
                        <TableCell>Pts</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.positions.map((item, index) => <PositionRow value={item} key={item.key} index={index} group={props.group}/>)}
                </TableBody>
            </Table>
            <br />
        </div>
    )
}

PositionGroupTable.propTypes = {
    group: PropTypes.string,
    positions: PropTypes.array,
}

export const PositionRow = ({ value, index, group }) => {
    const testId = group + '-' + index
    return (
        <TableRow >
            <TableCell>
                <CountryRow country={value.team} testId={testId}/>
            </TableCell>
            <TableCell>
                {value.won}
            </TableCell>
            <TableCell>
                {value.tied}
            </TableCell>
            <TableCell>
                {value.lost}
            </TableCell>
            <TableCell>
                {value.goalsOwn}
            </TableCell>
            <TableCell>
                {value.goalsAgainst}
            </TableCell>
            <TableCell>
                <b>
                    {value.points}
                </b>
            </TableCell>
        </TableRow>
    )
}

PositionRow.propTypes = {
    value: PropTypes.instanceOf(PositionItem)
}