import EditIcon from '@mui/icons-material/Edit'
import FlagIcon from '@mui/icons-material/Flag'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const MundialAppBar = () => {
    const navigate = useNavigate()

    return (
        <AppBar position="static" color='default'>
            <Toolbar>
                <Button className="iconButton" onClick={() => navigate('/')}>
                    <FlagIcon />
                    <span>
                        Buscar países
                    </span>
                </Button>
                <Button className='iconButton' onClick={() => navigate('/fixture')}>
                    <EditIcon />
                    <span>
                        ¡Cargá los resultados y mirá las posiciones!
                    </span>
                </Button>
            </Toolbar>
        </AppBar>
    )
}
