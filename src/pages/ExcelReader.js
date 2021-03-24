import React, { useState } from 'react'
import { SheetJSFT } from '../utils/types'
import CustomizedButton from '../components/Button'

import { Container, Divider, Grid, makeStyles, Snackbar, Tooltip, Typography } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import axios from 'axios'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" style={{ backgroundColor: 'rgba(16, 185, 129, 1)' }} {...props} />
}

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  divider: {
    maxWidth: '300px',
    padding: '0 0 1px 0',
  },
}))

export default function Reader() {
  const classes = useStyles()

  const [state, setState] = useState('')
  const [disabled, setDisabled] = useState(true)

  const [openAlert, setOpenAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenAlert(false)
  }

  const handleSubmission = () => {
    axios
      .post('http://localhost:8082/api/upload', state, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        console.log(res.statusText)
        console.log(res.data)
        setAlertMessage('Your files has been uploaded successfully.')
      })
      .finally(() => {
        setOpenAlert(true)
        setDisabled(true)
      })
  }

  const handleChange = (event) => {
    const files = event.target.files
    const formData = new FormData()

    Object.values(files).forEach((file) => formData.append('files', file))

    setAlertMessage('Your files has been selected successfully.')
    setState(formData)
    setOpenAlert(true)
    setDisabled(false)

    /* if (files && files[0]) setState({ file: files[0] }) */
  }

  const Tooltip = React.forwardRef(function Tooltip(props, ref) {
    //  Spread the props to the underlying DOM element.
    return (
      <div {...props} ref={ref}>
        <CustomizedButton
          style={{ margin: '10px 0 0 0' }}
          buttoncolor="secondary"
          onClick={handleSubmission}
          disabled={disabled}
        >
          Upload files
        </CustomizedButton>
      </div>
    )
  })

  return (
    <Container maxWidth="xl">
      <Typography gutterBottom>Vyberte súbor vo formáte .xls alebo .xlsx</Typography>
      <Divider className={classes.divider} />
      <input
        accept={SheetJSFT}
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleChange}
      />
      <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
        <label htmlFor="contained-button-file">
          <CustomizedButton
            style={{ margin: '10px 10px 0 0' }}
            buttoncolor="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Choose files
          </CustomizedButton>
        </label>
        <Tooltip title="Firstly, you have to select files."></Tooltip>
      </Grid>

      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}
