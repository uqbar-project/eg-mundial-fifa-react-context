import { Match } from '../domain/match'
import { countryService } from './countryService'

export class MatchService {

  static build(teamA: string, teamB: string, goalA?: number, goalB?: number) {
    return new Match(MatchService.getTeam(teamA), goalA, MatchService.getTeam(teamB), goalB)
  }

  static getTeam(teamName: string) {
    return countryService.getCountry(teamName)
  }

  getMatches() {
    return matches
  }

}

export const matchService = new MatchService()

const matches = [
  MatchService.build('Qatar', 'Ecuador', 1, 3),
  MatchService.build('Senegal', 'Países Bajos', 2, 1),
  MatchService.build('Qatar', 'Senegal'),
  MatchService.build('Países Bajos', 'Ecuador'),
  MatchService.build('Ecuador', 'Senegal'),
  MatchService.build('Países Bajos', 'Qatar'),
  MatchService.build('Inglaterra', 'Irán'),
  MatchService.build('Estados Unidos', 'Gales'),
  MatchService.build('Gales', 'Irán'),
  MatchService.build('Inglaterra', 'Estados Unidos'),
  MatchService.build('Gales', 'Inglaterra'),
  MatchService.build('Irán', 'Estados Unidos'),
  MatchService.build('México', 'Polonia'),
  MatchService.build('Argentina', 'Arabia Saudita'),
  MatchService.build('Polonia', 'Arabia Saudita'),
  MatchService.build('Argentina', 'México'),
  MatchService.build('Polonia', 'Argentina'),
  MatchService.build('Arabia Saudita', 'México'),
  MatchService.build('Francia', 'Australia'),
  MatchService.build('Dinamarca', 'Túnez'),
  MatchService.build('Túnez', 'Australia'),
  MatchService.build('Francia', 'Dinamarca'),
  MatchService.build('Australia', 'Dinamarca'),
  MatchService.build('Túnez', 'Francia'),
  MatchService.build('España', 'Costa Rica'),
  MatchService.build('Alemania', 'Japón'),
  MatchService.build('Japón', 'Costa Rica'),
  MatchService.build('España', 'Alemania'),
  MatchService.build('Japón', 'España'),
  MatchService.build('Costa Rica', 'Alemania'),
  MatchService.build('Bélgica', 'Canadá'),
  MatchService.build('Marruecos', 'Croacia'),
  MatchService.build('Bélgica', 'Marruecos'),
  MatchService.build('Croacia', 'Canadá'),
  MatchService.build('Croacia', 'Bélgica'),
  MatchService.build('Canadá', 'Marruecos'),
  MatchService.build('Suiza', 'Camerún'),
  MatchService.build('Brasil', 'Serbia'),
  MatchService.build('Camerún', 'Serbia'),
  MatchService.build('Brasil', 'Suiza'),
  MatchService.build('Serbia', 'Suiza'),
  MatchService.build('Camerún', 'Brasil'),
  MatchService.build('Uruguay', 'Corea del Sur'),
  MatchService.build('Portugal', 'Ghana'),
  MatchService.build('Corea del Sur', 'Ghana'),
  MatchService.build('Portugal', 'Uruguay'),
  MatchService.build('Ghana', 'Uruguay'),
  MatchService.build('Corea del Sur', 'Portugal')
]
