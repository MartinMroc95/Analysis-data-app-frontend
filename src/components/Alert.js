import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const MyAlert = (props) => {
    return (
        <Snackbar open={props.open} onClose={props.onCloseClick} {...props}>
            <Alert onClose={props.onClose} severity={props.severity}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}

export default MyAlert
