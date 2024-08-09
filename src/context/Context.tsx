import { createContext, ReactNode, useState } from 'react'
import { Match } from 'src/domain/match'
import { MatchService } from 'src/services/matchService'

export type MatchContext = {
  matches: Match[],
  updateMatch: (matchToUpdate: Match) => void,
}

export const Context = createContext<MatchContext | null>(null)

export const Provider = ({ children }: { children: ReactNode }) => {
  const [matches, setMatches] = useState(new MatchService().getMatches())
  const value = {
    matches,
    updateMatch: (matchToUpdate: Match) => {
      const indexMatchToReplace = matches.findIndex((match) => match.key === matchToUpdate.key)
      matches[indexMatchToReplace] = matchToUpdate
      setMatches([...matches])
    }
  }
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}
