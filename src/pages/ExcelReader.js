import React, { useState } from 'react'
import { SheetJSFT } from '../utils/types'

import { Button, Container, Divider, makeStyles, Typography } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

import Fade from 'react-reveal/Fade'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  divider: {
    maxWidth: '300px',
    padding: '0 0 1px 0',
  },
  button: {
    margin: '10px 10px 0 0',
  },
}))

export default function Reader() {
  const classes = useStyles()

  const [state, setState] = useState('')
  const [disabled, setDisabled] = useState(true)

  const handleSubmission = () => {
    axios
      .post('http://localhost:8082/api/upload', state, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        console.log(res.statusText)
        console.log(res.data)
      })
  }

  const handleChange = (event) => {
    const files = event.target.files
    const formData = new FormData()

    Object.values(files).forEach((file) => formData.append('files', file))

    setState(formData)
    setDisabled(false)

    /* if (files && files[0]) setState({ file: files[0] }) */
  }

  return (
    <Container maxWidth="xl">
      <Fade>
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
        <label htmlFor="contained-button-file">
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Choose files
          </Button>
          <Button
            className={classes.button}
            color="default"
            variant="outlined"
            onClick={handleSubmission}
            disabled={disabled}
          >
            Upload files
          </Button>
        </label>
      </Fade>
    </Container>
  )
}
