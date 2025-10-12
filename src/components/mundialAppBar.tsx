import './mundialAppBar.css'

import { useNavigate } from 'react-router-dom'

export const MundialAppBar = () => {
  const navigate = useNavigate()

  return (
    <div className='appbar'>
      <button onClick={() => navigate('/')} className='buttonMenu'>
        <img className="iconMenu" src="/src/assets/search.png" />
        <span className="labelMenu desktop">Buscá los países</span>
        <span className="labelMenu mobile">Países</span>
      </button>
      <button onClick={() => navigate('/fixture')} className='buttonMenu'>
        <img className="iconMenu" src="/src/assets/ranking.png" />
        <span className="labelMenu desktop">¡Cargá los resultados y mirá las posiciones!</span>
        {/* <label className="labelMenu mobile">Resultados</label> */}
      </button>
    </div>
    )
}
