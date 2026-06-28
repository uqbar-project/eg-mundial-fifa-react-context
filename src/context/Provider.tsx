import { type ReactNode, useState } from 'react'
import type { Match } from '../domain/match'
import { matchService } from '../services/matchService'
import { Context } from './Context'

export const Provider = ({ children }: { children: ReactNode }) => {
  const [matches, setMatches] = useState(() =>
    matchService.getMatches().map((match) => match.clone())
  )
  const value = {
    matches,
    updateMatch: (matchToUpdate: Match) => {
      setMatches((prev) =>
        prev.map((match) =>
          match.key === matchToUpdate.key ? matchToUpdate : match
        )
      )
    },
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}
