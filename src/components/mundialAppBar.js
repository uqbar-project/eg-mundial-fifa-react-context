import EditIcon from '@mui/icons-material/Edit'
import FlagIcon from '@mui/icons-material/Flag'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import PropTypes from 'prop-types'
import React from 'react'

import { withRouter } from '../utils/withRouter'

const MundialAppBar = ({ props }) => {
    const navigate = props.navigate

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

MundialAppBar.propTypes = {
    navigate: PropTypes.func,
}

export default withRouter(MundialAppBar)