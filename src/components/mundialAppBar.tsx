import './mundialAppBar.css'

import { useLocation, useNavigate } from 'react-router-dom'

export const MundialAppBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="appbar" aria-label="Navegación principal">
      <button
        onClick={() => navigate('/')}
        type="button"
        className={`buttonMenu ${location.pathname === '/' ? 'active' : ''}`}
        aria-current={location.pathname === '/' ? 'page' : undefined}
      >
        <img className="iconMenu" src="/src/assets/search.png" alt="" />
        <span className="labelMenu desktop">Buscá los países</span>
        <span className="labelMenu mobile">Países</span>
      </button>
      <button
        onClick={() => navigate('/fixture')}
        type="button"
        className={`buttonMenu ${location.pathname === '/fixture' ? 'active' : ''}`}
        aria-current={location.pathname === '/fixture' ? 'page' : undefined}
      >
        <img className="iconMenu" src="/src/assets/ranking.png" alt="" />
        <span className="labelMenu desktop">
          ¡Cargá los resultados y mirá las posiciones!
        </span>
        <span className="labelMenu mobile">Resultados</span>
      </button>
    </nav>
  )
}
