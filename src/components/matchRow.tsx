import './matchRow.css'

import { useContext } from 'react'

import { Context } from '../context/Context'
import type { Country } from '../domain/country'
import type { Match } from '../domain/match'
import { CountryRow } from './countryRow'

const MatchRow = ({ match }: { match: Match }) => {
  const context = useContext(Context)
  if (!context) {
    return null
  }
  const { updateMatch } = context

  const changeGoal = (team: Country, goals: number) => {
    match.updateScore(team.name, Math.trunc(goals))
    updateMatch(match)
  }

  return (
    <div data-testid={match.key} className="matchRow">
      <MatchTeam
        match={match}
        team={match.teamA}
        goal={match.goalsA}
        changeGoal={changeGoal}
      />
      <MatchTeam
        match={match}
        team={match.teamB}
        goal={match.goalsB}
        changeGoal={changeGoal}
      />
    </div>
  )
}

export default MatchRow

const MatchTeam = ({
  match,
  team,
  goal,
  changeGoal,
}: {
  match: Match
  team: Country
  goal: number | undefined
  changeGoal: (team: Country, goal: number) => void
}) => {
  return (
    <>
      <CountryRow country={team} testId="countryRow" />
      <input
        required
        data-testid={`${match.key}_${team.key}_goles`}
        type="number"
        className="goles"
        value={goal ?? ''}
        onChange={(event) => changeGoal(team, +event.target.value)}
      />
    </>
  )
}
