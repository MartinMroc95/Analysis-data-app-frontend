import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
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

const DataAnalysis = () => {
  const classes = useStyles()

  const [datas, setDatas] = useState([])
  const [optionsForSelect, setOptionsForSelect] = useState([])
  const [chart, setChart] = useState({
    coco2: false,
    gradient: false,
    sliadingAverage: false,
  })

  useEffect(() => {
    axios
      .get('http://localhost:8082/api/upload/correct-data')
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

  const handleOnButtonClick = (attribute) => {
    setChart((prevState) => ({ ...prevState, [attribute]: true }))
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
          onChange={(value) => {}}
        ></Select>
      </Grid>

      <Grid item xs={12} sm={12} md={8} lg={10}>
        <Button className={classes.buttonSuccess} variant="contained" onClick={() => handleOnButtonClick('coco2')}>
          Co + Co 2
        </Button>
        <Button className={classes.buttonError} variant="contained" onClick={() => handleOnButtonClick('gradient')}>
          Gradient
        </Button>
        <Button
          className={classes.buttonStatus}
          variant="contained"
          onClick={() => handleOnButtonClick('sliadingAverage')}
        >
          Kĺzavý priemer
        </Button>
      </Grid>

      <Box className={classes.chartBox}>
        <Grid item xs={12} className={classes.chart}>
          <canvas
            id="myChartCOCO2"
            style={chart.coco2 === false ? { visibility: 'hidden' } : { visibility: 'visible' }}
          ></canvas>
        </Grid>
      </Box>
      <Box className={classes.chartBox}>
        <Grid item xs={12} className={classes.chart}>
          <canvas
            id="myChartGradientCanvas"
            style={chart.gradient === false ? { visibility: 'hidden' } : { visibility: 'visible' }}
          ></canvas>
        </Grid>
      </Box>
      <Box className={classes.chartBox}>
        <Grid item xs={12} className={classes.chart}>
          <canvas
            id="myChartPriemer"
            style={chart.sliadingAverage === false ? { visibility: 'hidden' } : { visibility: 'visible' }}
          ></canvas>
        </Grid>
      </Box>
    </Grid>
  )
}

export default DataAnalysis
