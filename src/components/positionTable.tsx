import './positionTable.css'

import { useContext } from 'react'

import { Context } from '../context/Context'
import { GroupPosition, type PositionItem } from '../domain/groupPosition'
import { CountryRow } from './countryRow'

export const PositionTable = ({ group }: { group: string }) => {
  const context = useContext(Context)
  if (!context) {
    return null
  }
  const { matches } = context
  const positions = new Map<string, GroupPosition>()
  matches
    .filter((match) => match.matchesGroup(group))
    .forEach((match) => {
      const groupKey = match.group()
      const groupPosition =
        positions.get(groupKey) || new GroupPosition(groupKey)
      groupPosition.processMatch(match)
      positions.set(groupKey, groupPosition)
    })

  return (
    <div key={'cardPosiciones'}>
      <div className="cardPosicionesContent" key={'contentPosiciones'}>
        <h2>Tabla de posiciones</h2>
        {[...positions].map((itemGroup) => {
          const group = itemGroup[0]
          const positions = itemGroup[1].positions()
          return (
            <PositionGroupTable
              group={group}
              positions={positions}
              id={`positions_group_${group}`}
              key={`position_${group}`}
            />
          )
        })}
      </div>
    </div>
  )
}

export const PositionGroupTable = ({
  group,
  positions,
  id,
}: {
  group: string
  positions: PositionItem[]
  id: string
}) => {
  return (
    <div>
      <h4>Grupo {group}</h4>
      <div className="positionGroupTable tableHeader" key={id}>
        <div className="equipo">Equipo</div>
        <div>G</div>
        <div>E</div>
        <div>P</div>
        <div>GF</div>
        <div>GC</div>
        <div>Pts</div>
      </div>
      {positions.map((item, index) => (
        <PositionRow value={item} key={item.key} index={index} group={group} />
      ))}
      <br />
    </div>
  )
}

export const PositionRow = ({
  value,
  index,
  group,
}: {
  value: PositionItem
  index: number
  group: string
}) => {
  const testId = `${group}-${index}`
  return (
    <div className="positionGroupTable">
      <div>
        <CountryRow country={value.team} testId={testId} />
      </div>
      <div>{value.won}</div>
      <div>{value.tied}</div>
      <div>{value.lost}</div>
      <div>{value.goalsOwn}</div>
      <div>{value.goalsAgainst}</div>
      <div>
        <b>{value.points}</b>
      </div>
    </div>
  )
}
