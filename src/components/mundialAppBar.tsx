import './mundialAppBar.css'

import { useNavigate } from 'react-router-dom'

export const MundialAppBar = () => {
  const navigate = useNavigate()

  return (
    <div className='appbar' color='default'>
      <button onClick={() => navigate('/')}>
        <img className="iconMenu" src="/src/assets/search.png" />
        <label className="labelMenu">Buscá los países</label>
      </button>
      <button onClick={() => navigate('/fixture')}>
        <img className="iconMenu" src="/src/assets/ranking.png" />
        <label className="labelMenu">¡Cargá los resultados y mirá las posiciones!</label>
      </button>
    </div>
  )
}
