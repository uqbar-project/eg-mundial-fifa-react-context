import './mundialAppBar.css'

import { useNavigate } from 'react-router-dom'

export const MundialAppBar = () => {
  const navigate = useNavigate()

  return (
    <div className='appbar'>
      <button onClick={() => navigate('/')}>
        <img className="iconMenu" src="/src/assets/search.png" />
        <label className="labelMenu desktop">Buscá los países</label>
        <label className="labelMenu mobile">Países</label>
      </button>
      <button onClick={() => navigate('/fixture')}>
        <img className="iconMenu" src="/src/assets/ranking.png" />
        <label className="labelMenu desktop">¡Cargá los resultados y mirá las posiciones!</label>
        <label className="labelMenu mobile">Resultados</label>
      </button>
    </div>
  )
}
