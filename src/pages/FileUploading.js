import React, { useState } from 'react'
import { SheetJSFT } from '../utils/types'
import CustomizedButton from '../components/Button'

import { Divider, Grid, makeStyles, Snackbar, Typography } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

import { postSelectedFiles } from '../api/postCalls'
import { LoadingSpinner } from '../components/LoadingSpinner'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
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
}))

const FileUploading = () => {
  const classes = useStyles()

  const [data, setData] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [disabledUpload, setDisabledUpload] = useState(true)

  const [alert, setAlert] = useState({ type: '', message: '', isOpen: false })

  const onCloseClick = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setAlert((prevState) => ({ ...prevState, isOpen: false }))
  }

  const onSubmitClick = () => {
    setIsLoading(true)
    postSelectedFiles(data, setAlert, setDisabledUpload, setIsLoading)
  }

  const onInputChange = (event) => {
    const files = event.target.files
    const formData = new FormData()

    if (files && files[0]) {
      Object.values(files).forEach((file) => formData.append('files', file))

      setAlert({
        type: 'success',
        message: 'Your files has been selected successfully.',
        isOpen: true,
      })
      setData(formData)
      setDisabledUpload(false)
    }
  }

  return (
    <Grid className={classes.root}>
      <LoadingSpinner loading={isLoading}>Uploading files...</LoadingSpinner>

      <Typography gutterBottom style={{ fontWeight: 'bold' }}>
        Vyberte súbor vo formáte .xls alebo .xlsx
      </Typography>

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
        disabled={disabledUpload}
      >
        Upload files
      </CustomizedButton>

      <Snackbar open={alert.isOpen} autoHideDuration={5000} onClose={onCloseClick}>
        <Alert onClose={onCloseClick} severity={alert.type}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default FileUploading
