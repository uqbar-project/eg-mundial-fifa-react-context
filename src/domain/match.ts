import { Country } from "./country"

export class Match {

  teamA: Country
  goalsA: number | undefined
  teamB: Country
  goalsB: number | undefined

  constructor(teamA: Country, goalsA: number | undefined, teamB: Country, goalsB: number | undefined) {
    if (!teamA) {
      throw new Error('Debe ingresar el primer equipo')
    }
    if (!teamB) {
      throw new Error('Debe ingresar el segundo equipo')
    }
    if (teamA.group !== teamB.group) {
      throw new Error('Los equipos son de diferentes grupos')
    }
    this.teamA = teamA
    this.teamB = teamB
    this.goalsA = goalsA
    this.goalsB = goalsB
  }

  get key() {
    return this.teamA.key + "_" + this.teamB.key
  }

  group() {
    return this.teamA.group
  }

  matchesGroup(group: string) {
    return !group || this.group().includes(group)
  }

  updateScore(teamName: string, goals: number) {
    if (this.teamA.name === teamName) {
      this.goalsA = goals
    } else {
      this.goalsB = goals
    }
  }
}