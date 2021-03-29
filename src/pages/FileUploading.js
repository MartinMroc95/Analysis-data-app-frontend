import React, { useState } from 'react'
import { SheetJSFT } from '../utils/types'
import CustomizedButton from '../components/Button'

import { Box, Divider, Grid, makeStyles, Snackbar, Typography } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import BeatLoader from 'react-spinners/BeatLoader'
import { postSelectedFiles } from '../api/postCalls'

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
  const [disabledUpload, setDisabledUpload] = useState(true)

  const [openSuccesAlert, setOpenSuccesAlert] = useState(false)
  const [openErrorAlert, setOpenErrorAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const onCloseClick = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenErrorAlert(false)
    setOpenSuccesAlert(false)
  }

  const onSubmitClick = () => {
    setLoading(true)
    postSelectedFiles(data, setAlertMessage, setOpenSuccesAlert, setDisabledUpload, setLoading)
  }

  const onInputChange = (event) => {
    /* console.log(Object.values(event.target.files).map((value) => console.log(value.type))) */

    /*   for (let i = 0; i < event.target.files.length; i++) {
      console.log(event.target.files[i])
    }
 */
    /* Object.values(event.target.files).map((file) => console.log(file.type)) */

    /*   if (event.target.files[0].type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setAlertMessage('The selected files are the wrong type.')
      setOpenErrorAlert(true)
      setDisabledUpload(true)
      return
    } else { */
    const files = event.target.files
    const formData = new FormData()

    if (files && files[0]) {
      Object.values(files).forEach((file) => formData.append('files', file))

      setAlertMessage('Your files has been selected successfully.')
      setData(formData)
      setOpenSuccesAlert(true)
      setDisabledUpload(false)
    }
    /*  } */
  }

  return (
    <Grid className={classes.root}>
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

      {loading ? (
        <Box className={classes.loading}>
          <BeatLoader color={'#3f51b5'} loading={loading} size={15} />
          <Typography style={{ marginTop: '5px' }}>Uploading files... </Typography>
        </Box>
      ) : null}

      <Snackbar open={openSuccesAlert} autoHideDuration={3000} onClose={onCloseClick}>
        <Alert onClose={onCloseClick} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>

      <Snackbar open={openErrorAlert} autoHideDuration={3000} onClose={onCloseClick}>
        <Alert onClose={onCloseClick} severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default FileUploading
