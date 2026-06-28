import { type ReactNode, useState } from 'react'
import type { Match } from '../domain/match'
import { matchService } from '../services/matchService'
import { Context } from './Context'

export const Provider = ({ children }: { children: ReactNode }) => {
  const [matches, setMatches] = useState(matchService.getMatches())
  const value = {
    matches,
    updateMatch: (matchToUpdate: Match) => {
      const indexMatchToReplace = matches.findIndex(
        (match) => match.key === matchToUpdate.key
      )
      matches[indexMatchToReplace] = matchToUpdate
      setMatches([...matches])
    },
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}
