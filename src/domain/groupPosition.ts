import type { Country } from './country'
import type { Match } from './match'

export class GroupPosition {
  constructor(
    public group: string,
    public positionItems: PositionItem[] = []
  ) {}

  processMatch(match: Match) {
    this.searchPositionItem(match.teamA).processMatch(
      match.goalsA,
      match.goalsB
    )
    this.searchPositionItem(match.teamB).processMatch(
      match.goalsB,
      match.goalsA
    )
  }

  searchPositionItem(team: Country) {
    let result = this.positionItems.find((item) => item.team.matches(team))
    if (!result) {
      result = new PositionItem(team)
      this.positionItems.push(result)
    }
    return result
  }

  positions() {
    return this.positionItems.sort((itemA, itemB) => {
      const orderDiff = itemB.order - itemA.order
      if (orderDiff !== 0) {
        return orderDiff
      }
      return itemA.team.name.localeCompare(itemB.team.name)
    })
  }
}

export class PositionItem {
  constructor(
    public team: Country,
    public won = 0,
    public lost = 0,
    public tied = 0,
    public goalsOwn = 0,
    public goalsAgainst = 0
  ) {}

  processMatch(goalsOwn: number | undefined, goalsAgainst: number | undefined) {
    // ojo, no va !goalsOwn porque el 0 es falsy
    if (goalsOwn === undefined || goalsAgainst === undefined) {
      return
    }
    //
    this.goalsOwn += goalsOwn
    this.goalsAgainst += goalsAgainst
    if (goalsOwn > goalsAgainst) {
      this.won++
    }
    if (goalsOwn < goalsAgainst) {
      this.lost++
    }
    if (goalsOwn === goalsAgainst) {
      this.tied++
    }
  }

  get points() {
    return this.won * 3 + this.tied
  }

  get order() {
    return this.points * 10000 + this.goalAverage * 100 + this.goalsOwn
  }

  get goalAverage() {
    return this.goalsOwn - this.goalsAgainst
  }

  get key() {
    return `p${this.team.key}`
  }
}
