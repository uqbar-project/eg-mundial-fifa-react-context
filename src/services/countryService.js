import { Country } from '../domain/country'

const countries = [
  new Country('Alemania', 'E'),
  new Country('Arabia Saudita', 'C'),
  new Country('Argentina', 'C'),
  new Country('Australia', 'D'),
  new Country('Brasil', 'G'),
  new Country('Bélgica', 'F'),
  new Country('Camerún', 'G'),
  new Country('Canadá', 'F'),
  new Country('Corea del Sur', 'G'),
  new Country('Costa Rica', 'E'),
  new Country('Croacia', 'F'),
  new Country('Dinamarca', 'D'),
  new Country('Ecuador', 'A'),
  new Country('España', 'E'),
  new Country('Estados Unidos', 'B'),
  new Country('Francia', 'D'),
  new Country('Gales', 'B'),
  new Country('Ghana', 'G'),
  new Country('Inglaterra', 'B'),
  new Country('Irán', 'B'),
  new Country('Japón', 'E'),
  new Country('Marruecos', 'F'),
  new Country('México', 'C'),
  new Country('Países Bajos', 'A'),
  new Country('Polonia', 'C'),
  new Country('Portugal', 'G'),
  new Country('Qatar', 'A'),
  new Country('Senegal', 'A'),
  new Country('Serbia', 'G'),
  new Country('Suiza', 'G'),
  new Country('Túnez', 'D'),
  new Country('Uruguay', 'G'),
]

class CountryService {

    getAllCountries() { return countries }

    getCountries(countrySearch) {
        return countries.filter(country => country.matches(countrySearch))
    }

    getCountry(name) {
        const country = countries.find(country => country.name.toLowerCase() === name.toLowerCase())
        if (!country) throw new Error(`Equipo ${name} no encontrado`)
        return country
    }

    getGroups() {
        const groups = countries.map(country => country.group)
        return [...new Set(groups)].sort()
    }
}

export const countryService = new CountryService()