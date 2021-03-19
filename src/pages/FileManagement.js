import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
import Fade from 'react-reveal/Fade'
import { initCOCO2Chart } from '../components/Charts/COCO2Chart'
import { buttonError, buttonStatus, buttonSuccess } from '../components/Button'
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  makeStyles,
  Grid,
  Divider,
  Box,
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
  },
  select: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    border: '1px solid blue',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  buttonError: buttonError,
  buttonStatus: buttonStatus,
  buttonSuccess: buttonSuccess,
  chartBox: { display: 'flex', width: '100%', justifyContent: 'center' },
  chart: {
    maxWidth: '1280px',
  },
}))

const selectStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    cursor: 'pointer',
    ':hover': {
      borderRadius: '4px',
      borderColor: 'rgba(24, 144, 255, 0.4)',
      backgroundColor: 'rgba(24, 144, 255, 0.1)',
    },
  }),
  option: (styles, { data, isDisabled, isSelected }) => {
    return {
      ...styles,
      cursor: isDisabled ? 'not-allowed' : 'pointer',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.color : 'white'),
      },
    }
  },
}

const FileManagement = () => {
  const classes = useStyles()

  const [datas, setDatas] = useState([])
  const [selectedFile, setSelectedFile] = useState('')
  const [fileStatus, setFileStatus] = useState('')
  const [showDialog, setShowDialog] = useState(false)
  const [optionsForSelect, setOptionsForSelect] = useState([])

  useEffect(() => {
    setFileStatus(selectedFile.status)
    initCOCO2Chart(selectedFile)
  }, [selectedFile])

  useEffect(() => {
    axios
      .get('http://localhost:8082/api/upload/data')
      .then((response) => {
        setDatas(response.data.data)
      })
      .catch((error) => {
        // handle error
        console.log(error)
      })
      .then(() => {
        // always executed
      })
  }, [])

  useEffect(() => {
    setOptions()
  }, [datas])

  const setOptions = () => {
    datas.map((data) => setOptionsForSelect((prevState) => [...prevState, { value: data, label: data.name }]))
  }

  const handleOnStatusClick = (selectedStatus) => {
    axios
      .post(`http://localhost:8082/api/upload/set-status/${selectedFile._id}`, { status: selectedStatus })
      .then((response) => {
        // then print response status
        setFileStatus(response.data.data.status)
        setShowDialog(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Typography gutterBottom>Select files from database</Typography>
        <Divider />
      </Grid>

      <Grid item xs={10} sm={5} md={4} lg={2}>
        <Select
          isClearable
          isSearchable
          styles={selectStyles}
          options={optionsForSelect}
          onChange={(value) => setSelectedFile(value === null ? '' : value.value)}
        ></Select>
      </Grid>

      <Grid item xs={12} sm={12} md={8} lg={10}>
        <Button className={classes.buttonSuccess} variant="contained" onClick={() => handleOnStatusClick('Vyhovujúci')}>
          Correct
        </Button>
        <Button className={classes.buttonError} variant="contained" onClick={() => handleOnStatusClick('Nevyhovujúci')}>
          InCorrect
        </Button>
        <Button className={classes.buttonStatus} variant="contained">
          File status: {fileStatus || ''}
        </Button>
      </Grid>

      <Box className={classes.chartBox}>
        <Grid item xs={12} className={classes.chart}>
          <canvas
            id="myChartCOCO2"
            style={selectedFile === '' ? { visibility: 'hidden' } : { visibility: 'visible' }}
          ></canvas>

          <Dialog open={showDialog} onClose={() => setShowDialog(false)} aria-labelledby="customized-dialog-title">
            <DialogTitle id="alert-dialog-title">{'Status changed'}</DialogTitle>
            <DialogContent dividers>
              <DialogContentText style={{ margin: 0 }} id="alert-dialog-description">
                File status was successfully changed!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowDialog(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Box>
    </Grid>
  )
}

export default FileManagement
