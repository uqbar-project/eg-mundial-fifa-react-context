import './results.css'

import { useContext } from 'react'
import MatchRow from './matchRow'
import { Context } from '../context/Context'

export const Results = ({ group }: { group: string }) => {
  const { matches } = useContext(Context)!
  const groupMatches = matches.filter((match) => match.matchesGroup(group))
  return (
    groupMatches.map(match =>
      <div key={`container_${match.key}`} >
        <MatchRow data-testid={match.key} match={match} key={match.key} />
        <hr/>
      </div>
    )
  )
}
