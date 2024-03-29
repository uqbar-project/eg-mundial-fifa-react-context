import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useContext } from 'react'
import PropTypes from 'prop-types'

import { Context } from '../context/Context'
import { Match } from '../domain/match'
import { CountryRow } from './countryRow'
import { Country } from '../domain/country'

const MatchRow = ({ match }) => {
    const { updateMatch } = useContext(Context)

    const changeGoal = (team, goals) => {
        match.updateScore(team.name, Math.trunc(goals))
        updateMatch(match)
    }

    return (
        <Card data-testid={match.key}>
            <CardContent>
                <Grid container item xs={12}>
                    <MatchTeam item xs={6} match={match} team={match.teamA} goal={match.goalsA} changeGoal={changeGoal} />
                    <MatchTeam item xs={6} match={match} team={match.teamB} goal={match.goalsB} changeGoal={changeGoal} />
                </Grid>
            </CardContent>
        </Card>
    )
}

MatchRow.propTypes = {
    match: PropTypes.instanceOf(Match)
}

export default MatchRow

const MatchTeam = ({ match, team, goal, changeGoal }) => {
    return (
        <>
            <Grid item xs={9} sm={4}>
                <CountryRow country={team} testId="countryRow"/>
            </Grid>
            <Grid item xs={3} sm={2}>
                <TextField
                    required
                    inputProps={{ 'data-testid': `${match.key}_${team.key}_goles` }}
                    type="number"
                    className="goles"
                    variant="standard"
                    value={goal}
                    onChange={(event) => changeGoal(team, event.target.value)}
                    margin="normal"
                />
            </Grid>
        </>
    )
}

MatchTeam.propTypes = {
    match: PropTypes.instanceOf(Match),
    team: PropTypes.instanceOf(Country),
    goal: PropTypes.number,
    changeGoal: PropTypes.func
}