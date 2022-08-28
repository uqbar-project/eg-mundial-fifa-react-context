import React, { Component } from 'react'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import FlagIcon from '@mui/icons-material/Flag'
import EditIcon from '@mui/icons-material/Edit'
import PropTypes from 'prop-types'
import { withRouter } from '../utils/withRouter'

class MundialAppBar extends Component {
    render() {
        const navigate = this.props.navigate

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

}

MundialAppBar.propTypes = {
    navigate: PropTypes.func,
}

export default withRouter(MundialAppBar)