# Mundial FIFA (React Context)

[![Build React App](https://github.com/uqbar-project/eg-mundial-fifa-react-context/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/uqbar-project/eg-mundial-fifa-react-context/actions/workflows/build.yml) [![codecov](https://codecov.io/gh/uqbar-project/eg-mundial-fifa-react-context/graph/badge.svg?token=QJ2MJX1Y5B)](https://codecov.io/gh/uqbar-project/eg-mundial-fifa-react-context)

<img src="video/demo1.gif"/>

<hr/>

<img src="video/demo2.gif">

<hr/>

La aplicación permite la reutilización de varios componentes:

- `countryRow`: muestra la bandera y el nombre de un país, y lo utilizamos en la búsqueda de países que participan del mundial, en la fila que nos permite cargar los resultados de los partidos y en la tabla de posiciones.
- `selectGroup`: permite seleccionar un grupo para filtrar los países participantes de la copa o bien para seleccionar la tabla de posiciones y la carga de los resultados de los partidos

# Rutas

- la ruta raíz '/' muestra la búsqueda de países que participan del mundial
- la ruta '/fixture' permite ver/cargar los resultados de los partidos y la tabla de posiciones

# Fixture: resultados + tabla de posiciones

## Armado de la tabla de posiciones

Para armar la tabla de posiciones, tomamos como input la lista de partido y hacemos un doble corte de control:

- primero por grupo
- luego por país

Es decir, tenemos un mapa:

![image](images/TablaPosiciones.png)

Recorremos los partidos generando o actualizando el mapa por grupo y país (archivo _positionTable.tsx_):

```ts
export const PositionTable = ({ group }: { group: string }) => {
  const { matches } = useContext(Context)!
  const positions = new Map()
  matches.filter((match) => match.matchesGroup(group)).forEach(match => {
    const group = match.group()
    const groupPosition = positions.get(group) || new GroupPosition(group)
    groupPosition.processMatch(match)
    positions.set(group, groupPosition)
  })
```

El método processMatch de PositionGroup hace el procesamiento para el equipo local y el visitante:

```ts
processMatch(match: Match) {
  this.searchPositionItem(match.teamA).processMatch(match.goalsA!, match.goalsB!)
  this.searchPositionItem(match.teamB).processMatch(match.goalsB!, match.goalsA!)
}

searchPositionItem(team: Country) {
  let result = this.positionItems.find(item => item.team.matches(team))
  if (!result) {
    result = new PositionItem(team)
    this.positionItems.push(result)
  }
  return result
}
```

Veamos el método processMatch del objeto de negocio positionItem, que representa una línea dentro de la tabla de posiciones:

```ts
processMatch(goalsOwn: number, goalsAgainst: number) {
  if (goalsOwn === undefined || goalsAgainst === undefined) return
  this.goalsOwn += goalsOwn
  this.goalsAgainst += goalsAgainst
  if (goalsOwn > goalsAgainst) this.won++
  if (goalsOwn < goalsAgainst) this.lost++
  if (goalsOwn === goalsAgainst) this.tied++
}
```

> Ojo que no es conveniente preguntar `if (!goalsOwn || !goalsAgainst)`, porque 0 es falsy. Por lo tanto cualquier partido en el que alguno de los equipos no haya metido goles no va a sumar en la tabla de posiciones.

Para mostrar la tabla, el componente PositionTable (vista) en su método render dibuja la tabla de la siguiente manera:

```tsx
return (
  <div key={'cardPosiciones'}>
    <div className='cardPosicionesContent' key={'contentPosiciones'}>
      <h2>Tabla de posiciones</h2>
      {[...positions].map((itemGroup) => {
        const group = itemGroup[0]
        const positions = itemGroup[1].positions()
        return <PositionGroupTable group={group} positions={positions} id={'positions_group_' + group} key={`position_${group}`} />
      }
      )}
    </div>
  </div>
)
```

Partimos de positions, que es el mapa que construimos previamente. Como el mapa de ECMAScript no conoce la función map, tenemos que pasarlo a una lista utilizando el _spread operator_ `[...positions]`. Esto nos da una lista de objetos que tiene `{grupo: nombre_grupo, groupPosition: lista_de_equipos}`. Pero como la lista de equipos no está ordenada, llamamos a un método en groupPosition que ordena los equipos por puntos:

```ts
// en GroupPosition
positions() {
  return this.positionItems.sort((a, b) => b.order - a.order)
}

// PositionItem
get points() {
  return this.won * 3 + this.tied
}

get order() {
  return this.points * 10000 + this.goalAverage * 100 + this.goalsOwn
}
```

Bueno, no solo por puntos, también por diferencia de gol y goles a favor.


# React-Context: Estado compartido entre componentes

Tenemos dos componentes que tienen un estado compartido: 

- el componente Results toma como input los partidos del mundial para eventualmente filtrar los de una zona seleccionada (o directamente mostrar todos), y permite editar los resultados del mundial
- el componente PositionTable toma como input los partidos del mundial para armar las tablas de posiciones (y adicionalmente filtrar por zona)

Pero además, si alguien modifica un resultado (componente _MatchRow_ hijo del componente padre _Results_), eso debería actualizar la tabla de posiciones. React tiene mecanismos para actualizar estados desde un componente hacia otros, pero esta es una buena ocasión para incorporar **React Context** a nuestra aplicación, que nos va a permitir manejar un estado compartido entre componentes para simplificar el esquema de notificaciones ante un cambio.

Para una explicación más detallada podés consultar [el ejemplo del contador con React Context](https://github.com/uqbar-project/eg-contador-react-context)

Veamos cómo se implementa dentro del ejemplo del mundial.

## Context

El context va a guardar los resultados, inicialmente tendrá la lista de partidos vacía.

Dentro de nuestro archivo _Context.tsx_, definimos nuestro `Provider` que va a tener el estado global de nuesta aplicación :

```tsx
export const Context = createContext<MatchContext | null>(null)

export const Provider = ({ children }: { children: ReactNode }) => {
  const [matches, setMatches] = useState(matchService.getMatches())
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
```

Mediante los [hooks](https://react.dev/reference/react-dom/hooks)

- `useState` mantenemos el estado del contexto, que son los partidos disputados
- `value` nos ofrece un mecanismo para mutar ese estado cada vez que nos pasen el partido a actualizar. Simplemente lo que hacemos es buscarlo en la lista de partidos, pisar el resultado del partido con el nuevo (ej. en lugar de Polonia 0 Arabia Saudita 0 podríamos decirle Polonia 1 Arabia Saudita 0) y luego debemos llamar al setMatches para que se propague ese cambio a cada uno de los hijos (en nuestro caso los que lo deben tomar son el de carga de partidos, para ver el input cambiado y la tabla de posiciones que se recalcula en base a los partidos)

Sabiendo esto ahora podemos conectar nuestro componente `Results` al contexto

```tsx
export const Results = ({ group }: { group: string }) => {
  const { matches } = useContext(Context)!
  const groupMatches = matches.filter((match) => match.matchesGroup(group))
  return (
    groupMatches.map(match =>
      <div key={`container_${match.key}`} >
        <MatchRow data-testid={match.key} match={match} key={match.key} />
        <hr/>
      </div>
    )
  )
}
```

Y nuestro componente `MatchRow` ahora utiliza la función `updateMatch` del contexto para actualizar el partido y que el cambio se vea reflejado en la tabla de posiciones

```tsx
const MatchRow = ({ match }: { match: Match }) => {
  const { updateMatch } = useContext(Context)!

  const changeGoal = (team: Country, goals: number) => {
    match.updateScore(team.name, Math.trunc(goals))
    updateMatch(match)
  }

  ...
```

## Testing

Tenemos tres test bastante integrales, los dos primeros nos sirven para probar los dos escenarios básicos de la búsqueda de países

- por letras
- por grupo

```ts
test('searching countries by text', async () => {
  render(<CountrySearch />)
  const countrySearch = screen.getByTestId('country')
  // bajo nivel fireEvent.change(countrySearch, { target: { value: 'F' }})
  // alto nivel
  await userEvent.type(countrySearch, 'F')
  const allCountries = await screen.findAllByTestId('countryRow')
  expect(allCountries[0].textContent).toBe('Francia')
})

test('searching A group returns the corresponding countries', async () => {
  render(<CountrySearch />)
  const comboGroup = screen.getByTestId('group')
  await userEvent.selectOptions(comboGroup, 'A')
  
  const allCountries = await screen.findAllByTestId('countryRow')
  expect(allCountries.length).toBe(4)
  const groupACountries = allCountries.map(country => country.textContent).sort((a, b) => a >= b)
  expect(groupACountries).toStrictEqual(['Ecuador', 'Países Bajos', 'Qatar', 'Senegal'])
})
```

Algunos trucos que utilizamos:

- en el primer test
  - `userEvent.type(countrySearch, 'F')` es una variante más feliz que tener que disparar un `fireEvent.change` respetando el json `{ target: { value: 'F' }}`
  - una vez que seleccionamos, tenemos que esperar a que se actualice el estado y vuelva a renderizar, por eso invocamos a `screen.findAllByTestId('countryRow)`
- en el segundo test
  - simular la búsqueda del combo requiere presionar el botón que está a la derecha para abrir la lista desplegable, posicionarse en el listbox y presionar la opción que tiene el grupo A, esas son las tres líneas mouseDown, getByRole y luego un click
  - luego hay que esperar que renderice nuevamente la página, tomamos los valores `innerHTML` de cada componente `countryRow`, y para estar seguros de que filtró los países que queremos los ordenamos alfabétiamente

Por último el test que verifica la carga de un resultado requiere ser específico respecto al data-testid que queremos, por eso cada input debe considerar

- el partido: Qatar vs. Ecuador `qatar_ecuador`
- el equipo que se está cargando: `qatar`
- y algún identificador de qué input es: `goles`

eso nos permite accederlo rápidamente

```tsx
test('results show how many goals scored one of the teams', () => {
  render(
    <Provider>
      <Results group='' />
    </Provider >
  )
  const goalsHomeTeam = screen.getByTestId('qatar_ecuador_qatar_goles') as HTMLInputElement
  expect(goalsHomeTeam.value).toBe('1')
})
```
