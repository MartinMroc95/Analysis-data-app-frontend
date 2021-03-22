import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
import MultiSelect from 'react-multi-select-component'

import { getRandomColor } from '../utils/randomColor'
import { renderChart } from '../components/Charts/RenderFunctions'
import { createNewChart } from '../components/Charts/Graphs'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
  },
  select: {
    '& :hover ': {
      cursor: 'pointer',
    },
  },
  buttonError: buttonError,
  buttonStatus: buttonStatus,
  buttonSuccess: buttonSuccess,
  chartBox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  chart: {
    justifyContent: 'center',
    width: '100%',
  },
}))

const DataAnalysis = () => {
  const classes = useStyles()

  const [datas, setDatas] = useState([])
  const [optionsForSelect, setOptionsForSelect] = useState([])
  const [chart, setChart] = useState({
    coco2: false,
    gradient: false,
    sliadingAverage: false,
  })

  const [selectedFiles, setSelectedFiles] = useState([])
  const [correctFiles, setCorrectFiles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    transformDataIntoRightFormat()
  }, [datas])

  useEffect(() => {
    setOptions()
  }, [correctFiles])

  const setOptions = () => {
    correctFiles.map((file) =>
      setOptionsForSelect((prevState) => [...prevState, { value: file.data, label: file.name }])
    )
  }

  const transformDataIntoRightFormat = () => {
    for (let i = 0; i < datas.length; i++) {
      const file = datas[i].data

      let dataObject = {}
      for (let i = 0; i < Object.values(file).length; i++) {
        let row = file[i] // Uloženie jedného riadku do premennej row, riadok má tvar objektu
        for (let key in row) {
          if (!dataObject[key]) {
            dataObject[key] = []
          }
          dataObject[key].push(parseFloat(row[key]))
        }
      }
      setCorrectFiles((prevState) => [...prevState, { data: dataObject, name: datas[i].name }])
    }
  }

  const clickOnCoCo2Button = (attribute) => {
    setChart((prevState) => ({ ...prevState, [attribute]: true }))

    const chartModel = []

    for (let i = 0; i < selectedFiles.length; i++) {
      let COPlusCO2 = []
      console.log(selectedFiles[i].value)
      let datas = selectedFiles[i].value

      for (let j = 0; j < Object.keys(datas['k4_co']).length; j++) {
        let valueCO = datas['k4_co'][j]
        let valueCO2 = datas['k4_co2'][j]

        if (valueCO < 0) {
          valueCO = 0
        }
        if (valueCO2 < 0) {
          valueCO2 = 0
        }
        if (valueCO > 100) {
          valueCO = 100
        }
        if (valueCO2 > 100) {
          valueCO2 = 100
        }

        let resultValue = Number(valueCO) + Number(valueCO2)

        if (resultValue > 100) {
          resultValue = 100
        }

        COPlusCO2.push(resultValue)
      }

      chartModel.push({
        data: COPlusCO2,
        label: `${selectedFiles[i].label}_CO + CO2`,
        backgroundColor: getRandomColor(),
      })
    }
    let myChartCOCO2 = document.getElementById('myChartCOCO2')

    let yAxesText = 'Koncentrácia (%)'
    let xAxesText = 'Čas (s)'

    const chart = createNewChart(myChartCOCO2, '', yAxesText, xAxesText, false)
    renderChart(chartModel, chart, false)
  }

  const onGradientClick = (attribute) => {
    setChart((prevState) => ({ ...prevState, [attribute]: true }))

    const chartModel = []

    for (let i = 0; i < selectedFiles.length; i++) {
      let datas = selectedFiles[i].value
      let gradient = []

      for (let j = 0; j < Object.keys(datas['k4_co']).length; j++) {
        let valueCOcurrent = datas['k4_co'][j]
        let valueCO2current = datas['k4_co2'][j]

        let valueCOprevious = datas['k4_co'][j - 1]
        let valueCO2previous = datas['k4_co2'][j - 1]

        let sumCOCO2current = Number(valueCOcurrent) + Number(valueCO2current)
        let sumCO2previous = Number(valueCOprevious) + Number(valueCO2previous)

        if (valueCOcurrent < 0) {
          valueCOcurrent = 0
        }
        if (valueCO2current < 0) {
          valueCO2current = 0
        }
        if (valueCOcurrent > 100) {
          valueCOcurrent = 100
        }
        if (valueCO2current > 100) {
          valueCO2current = 100
        }
        if (sumCOCO2current > 100) {
          sumCOCO2current = 100
        }

        let resultValue = Number(sumCOCO2current) - Number(sumCO2previous)
        gradient.push(resultValue)
      }

      // Pridávanie hodnôt do modelu
      chartModel.push({
        data: gradient,
        label: correctFiles[i].name,
        backgroundColor: getRandomColor(),
      })
    }

    let myChartGradient = document.getElementById('myChartGradient')

    let yAxesText = 'Koncentrácia (%)'
    let xAxesText = 'Čas (s)'

    const chart = createNewChart(myChartGradient, '', yAxesText, xAxesText, false)
    renderChart(chartModel, chart, false)
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Typography gutterBottom>Select files from database</Typography>
        <Divider />
      </Grid>

      <Grid item xs={10} sm={5} md={4} lg={2}>
        <MultiSelect
          className={classes.select}
          isLoading={isLoading}
          options={optionsForSelect}
          value={selectedFiles}
          onChange={(value) => setSelectedFiles(value)}
        ></MultiSelect>
      </Grid>

      <Grid item xs={12} sm={12} md={8} lg={10}>
        <Button className={classes.buttonSuccess} variant="contained" onClick={() => clickOnCoCo2Button('coco2')}>
          Co + Co 2
        </Button>
        <Button className={classes.buttonError} variant="contained" onClick={() => onGradientClick('gradient')}>
          Gradient
        </Button>
        <Button className={classes.buttonStatus} variant="contained" onClick={() => {}}>
          Kĺzavý priemer
        </Button>
      </Grid>

      <Box className={classes.chartBox}>
        <Grid item xs={12} className={classes.chart}>
          <canvas id="myChartCOCO2"></canvas>
        </Grid>
      </Box>
      <Box className={classes.chartBox}>
        <Grid item xs={12} className={classes.chart}>
          <canvas id="myChartGradient"></canvas>
        </Grid>
      </Box>
      <Box className={classes.chartBox}>
        <Grid item xs={12} className={classes.chart}>
          <canvas id="myChartPriemer"></canvas>
        </Grid>
      </Box>
    </Grid>
  )
}

export default DataAnalysis
