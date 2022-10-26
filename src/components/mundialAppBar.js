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
                <Button onClick={() => navigate('/')}>
                    <FlagIcon />
                    Buscar países
                    </Button>
                <Button onClick={() => navigate('/fixture')}>
                    <EditIcon />
                    ¡Cargá los resultados y mirá las posiciones!
                    </Button>
            </Toolbar>
        </AppBar>
    )
}
