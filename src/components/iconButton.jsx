import Button from '@mui/material/Button'
import PropTypes from 'prop-types'

export const IconButton = ({ label, Icon, onClick }) => {
    return <Button className="iconButton" startIcon={<Icon />} onClick={onClick}>
        <label>{label}</label>
    </Button>
}

IconButton.propTypes = {
    label: PropTypes.string,
    Icon: PropTypes.elementType,
    onClick: PropTypes.func
}
