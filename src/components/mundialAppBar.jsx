import EditIcon from '@mui/icons-material/Edit'
import FlagIcon from '@mui/icons-material/Flag'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useNavigate } from 'react-router-dom'
import { IconButton } from './iconButton'

export const MundialAppBar = () => {
    const navigate = useNavigate()

    return (
        <AppBar position="static" color='default'>
            <Toolbar>
                <IconButton label="Buscar países" Icon={FlagIcon} onClick={() => navigate('/')} />
                <IconButton label="¡Cargá los resultados y mirá las posiciones!" Icon={EditIcon} onClick={() => navigate('/fixture')} />
            </Toolbar>
        </AppBar>
    )
}
