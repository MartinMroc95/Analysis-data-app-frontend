import React, { useState } from 'react'
import { SheetJSFT } from '../utils/types'
import CustomizedButton from '../components/Button'

import { Box, Container, Divider, Grid, makeStyles, Snackbar, Typography } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import BeatLoader from 'react-spinners/BeatLoader'
import axios from 'axios'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" style={{ backgroundColor: 'rgba(16, 185, 129, 1)' }} {...props} />
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '80vh',
  },
  input: {
    display: 'none',
  },
  divider: {
    maxWidth: '300px',
    padding: '0 0 1px 0',
  },
  loading: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const FileUploading = () => {
  const classes = useStyles()

  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)

  const [openAlert, setOpenAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const onCloseClick = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenAlert(false)
  }

  const onSubmitClick = () => {
    setLoading(true)
    axios
      .post('http://localhost:8082/api/upload', data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        console.log(res.statusText)
        setAlertMessage('Your files has been uploaded successfully.')
      })
      .finally(() => {
        setOpenAlert(true)
        setDisabled(true)
        setLoading(false)
      })
  }

  const onInputChange = (event) => {
    const files = event.target.files
    const formData = new FormData()

    if (files && files[0]) {
      Object.values(files).forEach((file) => formData.append('files', file))

      setAlertMessage('Your files has been selected successfully.')
      setData(formData)
      setOpenAlert(true)
      setDisabled(false)
    }
  }

  return (
    <Grid className={classes.root}>
      <Typography gutterBottom>Vyberte súbor vo formáte .xls alebo .xlsx</Typography>

      <Divider className={classes.divider} />
      <input
        accept={SheetJSFT}
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={onInputChange}
      />

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
      <CustomizedButton
        style={{ margin: '10px 0 0 0' }}
        buttoncolor="secondary"
        onClick={onSubmitClick}
        disabled={disabled}
      >
        Upload files
      </CustomizedButton>

      {loading ? (
        <Box className={classes.loading}>
          <BeatLoader color={'#3f51b5'} loading={loading} size={15} />
          <Typography style={{ marginTop: '5px' }}>Uploading files... </Typography>
        </Box>
      ) : null}

      <Snackbar open={openAlert} autoHideDuration={3000} onClose={onCloseClick}>
        <Alert onClose={onCloseClick} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default FileUploading
