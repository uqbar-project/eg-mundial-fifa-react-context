import { createContext } from 'react'
import { Match } from 'src/domain/match'

export type MatchContext = {
  matches: Match[],
  updateMatch: (matchToUpdate: Match) => void,
}

export const Context = createContext<MatchContext | null>(null)
