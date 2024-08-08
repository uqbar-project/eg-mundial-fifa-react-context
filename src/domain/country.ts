export class Country {
  constructor(public name = '', public group = '') {
  }

  get flag() {
    return this.key + '.png'
  }

  get key() {
    return this.name.replaceAll(' ', '-').toLowerCase()
  }

  /** Funciones auxiliares para búsquedas */
  matches(country: Country): boolean {
    return this.match('name', country) && this.match('group', country)
  }

  match(property: keyof Country, other: Country): boolean {
    return (this[property] as unknown as string).toLowerCase().includes((other[property] as unknown as string).toLowerCase())
  }
}