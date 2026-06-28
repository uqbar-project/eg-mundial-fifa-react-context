import './results.css'

import { useContext } from 'react'
import { Context } from '../context/Context'
import MatchRow from './matchRow'

export const Results = ({ group }: { group: string }) => {
  const context = useContext(Context)
  if (!context) {
    return null
  }
  const { matches } = context
  const groupMatches = matches.filter((match) => match.matchesGroup(group))
  return groupMatches.map((match) => (
    <div key={`container_${match.key}`}>
      <MatchRow data-testid={match.key} match={match} key={match.key} />
      <hr />
    </div>
  ))
}
