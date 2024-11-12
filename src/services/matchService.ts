import { Match } from '../domain/match'
import { countryService } from './countryService'

class MatchService {

  build(teamA: string, teamB: string, goalA?: number, goalB?: number) {
    return new Match(this.getTeam(teamA), goalA, this.getTeam(teamB), goalB)
  }

  getTeam(teamName: string) {
    return countryService.getCountry(teamName)
  }

  getMatches() {
    return matches
  }

}

export const matchService = new MatchService()

const matches = [
  matchService.build('Qatar', 'Ecuador', 1, 3),
  matchService.build('Senegal', 'Países Bajos', 2, 1),
  matchService.build('Qatar', 'Senegal'),
  matchService.build('Países Bajos', 'Ecuador'),
  matchService.build('Ecuador', 'Senegal'),
  matchService.build('Países Bajos', 'Qatar'),
  matchService.build('Inglaterra', 'Irán'),
  matchService.build('Estados Unidos', 'Gales'),
  matchService.build('Gales', 'Irán'),
  matchService.build('Inglaterra', 'Estados Unidos'),
  matchService.build('Gales', 'Inglaterra'),
  matchService.build('Irán', 'Estados Unidos'),
  matchService.build('México', 'Polonia'),
  matchService.build('Argentina', 'Arabia Saudita'),
  matchService.build('Polonia', 'Arabia Saudita'),
  matchService.build('Argentina', 'México'),
  matchService.build('Polonia', 'Argentina'),
  matchService.build('Arabia Saudita', 'México'),
  matchService.build('Francia', 'Australia'),
  matchService.build('Dinamarca', 'Túnez'),
  matchService.build('Túnez', 'Australia'),
  matchService.build('Francia', 'Dinamarca'),
  matchService.build('Australia', 'Dinamarca'),
  matchService.build('Túnez', 'Francia'),
  matchService.build('España', 'Costa Rica'),
  matchService.build('Alemania', 'Japón'),
  matchService.build('Japón', 'Costa Rica'),
  matchService.build('España', 'Alemania'),
  matchService.build('Japón', 'España'),
  matchService.build('Costa Rica', 'Alemania'),
  matchService.build('Bélgica', 'Canadá'),
  matchService.build('Marruecos', 'Croacia'),
  matchService.build('Bélgica', 'Marruecos'),
  matchService.build('Croacia', 'Canadá'),
  matchService.build('Croacia', 'Bélgica'),
  matchService.build('Canadá', 'Marruecos'),
  matchService.build('Suiza', 'Camerún'),
  matchService.build('Brasil', 'Serbia'),
  matchService.build('Camerún', 'Serbia'),
  matchService.build('Brasil', 'Suiza'),
  matchService.build('Serbia', 'Suiza'),
  matchService.build('Camerún', 'Brasil'),
  matchService.build('Uruguay', 'Corea del Sur'),
  matchService.build('Portugal', 'Ghana'),
  matchService.build('Corea del Sur', 'Ghana'),
  matchService.build('Portugal', 'Uruguay'),
  matchService.build('Ghana', 'Uruguay'),
  matchService.build('Corea del Sur', 'Portugal')
]
