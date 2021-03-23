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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  withStyles,
  TableCell,
  TableBody,
  Paper,
  Drawer,
} from '@material-ui/core'
import MultiSelect from 'react-multi-select-component'

import { getRandomColor } from '../utils/randomColor'
import { findMax } from '../utils/chartFunctions'
import { findMin } from '../utils/chartFunctions'
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
/*   buttonError: buttonError,
  buttonStatus: buttonStatus,
  buttonSuccess: buttonSuccess, */
  chartGrid: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  chartGridNone: {
    display: 'none',
  },
  chartBox: {
    width: '100%',
  },
  chart: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    /* maxWidth: '1440px', */
  },
  table: {
    minWidth: 700,
  },
  header: {
    width: '100%',
    textAlign: 'left',
    paddingTop: '15px',
  },
}))

const StyledTableCell = withStyles((theme) => ({
  root: {
    borderRight: '1px solid white',
    /* borderRadius: '2px', */
  },
  head: { backgroundColor: '#3f51b5', color: theme.palette.common.white },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const DataAnalysis = () => {
  const classes = useStyles()

  const [datas, setDatas] = useState([])
  const [optionsForSelect, setOptionsForSelect] = useState([])
  const [chart, setChart] = useState({
    coco2: false,
    gradient: false,
    slidingAverage: false,
  })

  const [selectedFiles, setSelectedFiles] = useState([])
  const [correctFiles, setCorrectFiles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [rozptyl, setRozptyl] = useState('')
  const [maximum, setMaximum] = useState('')
  const [minimum, setMinimum] = useState('')
  const [average, setAverage] = useState('')

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
        let row = file[i] // Uloženie jedného riadku do premennej row, riadok má tlet objektu
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

  //  CO + CO2 Chart
  const onCoCo2Click = (attribute) => {
    setChart((prevState) => ({ ...prevState, [attribute]: true }))

    const chartModel = []

    for (let i = 0; i < selectedFiles.length; i++) {
      let COPlusCO2 = []
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

  //  Gradient Chart
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

  // Sli
  const onSlidingAverageClick = (attribute) => {
    setChart((prevState) => ({ ...prevState, [attribute]: true }))

    const chartModel = []
    const lastValues = []

    let pomArray = []
    const krok = 50

    // Prechádzanie všetkých vybratých súborov
    for (let i = 0; i < selectedFiles.length; i++) {
      // Počítanie hodnôt CO + CO2
      let datas = selectedFiles[i].value
      let klzavyPriemer = []
      let pomocnyArray = []
      let gradient = []

      for (let j = 1; j < Object.keys(datas['k4_co']).length; j++) {
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

        // Čiastkový gradient
        let resultValue = Number(sumCOCO2current) - Number(sumCO2previous)
        gradient.push(resultValue)

        pomocnyArray.push(resultValue)

        if (pomocnyArray.length < krok) {
          let sum = pomocnyArray.reduce((a, b) => a + b, 0)
          let ciastkovyKlzavyPriemer = sum / pomocnyArray.length
          klzavyPriemer.push(ciastkovyKlzavyPriemer)
        } else {
          let novyArray = pomocnyArray.slice(j - krok, j)
          let sum = novyArray.reduce((a, b) => a + b, 0)
          let ciastkovyKlzavyPriemer = sum / krok
          klzavyPriemer.push(ciastkovyKlzavyPriemer)

          novyArray = []
        }
      }

      // Pridávanie hodnôt do modelu
      chartModel.push({
        data: klzavyPriemer,
        label: selectedFiles[i].label,
        backgroundColor: getRandomColor(),
      })

      let calculationLastValue = klzavyPriemer[klzavyPriemer.length - 1]
      lastValues.push({ value: calculationLastValue, fileName: selectedFiles[i].label })

      let maximum = findMax(lastValues)
      let minimum = findMin(lastValues)

      let priemer = lastValues.map((a) => a.value).reduce((a, b) => a + b, 0) / lastValues.length

      let pomVyp = lastValues[i].value - priemer
      let pomVypNa2 = Math.pow(pomVyp, 2)
      pomArray.push(pomVypNa2)

      let sucetPomArray = pomArray.reduce((a, b) => a + b, 0)
      let rozptyl = (1 / lastValues.length) * sucetPomArray

      setRozptyl(rozptyl)
      setMaximum(maximum)
      setMinimum(minimum)
      setAverage(priemer)
    }

    const myChartPriemer = document.getElementById('myChartPriemer')

    let yAxesText = 'Koncentrácia (%)'
    let xAxesText = 'Čas (s)'

    const chart = createNewChart(myChartPriemer, '', yAxesText, xAxesText, false)
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
        <Button className={classes.buttonSuccess} variant="contained" onClick={() => onCoCo2Click('coco2')}>
          Co + Co 2
        </Button>
        <Button className={classes.buttonError} variant="contained" onClick={() => onGradientClick('gradient')}>
          Gradient
        </Button>
        <Button
          className={classes.buttonStatus}
          variant="contained"
          onClick={() => onSlidingAverageClick('slidingAverage')}
        >
          Kĺzavý priemer
        </Button>
      </Grid>

      <Grid item className={chart.coco2 ? classes.chartGrid : classes.chartGridNone}>
        <Divider style={{ width: '100%' }} />
        <Typography variant="h5" className={classes.header}>
          CO + CO2
        </Typography>
        <Box className={classes.chartBox}>
          <canvas className={classes.chart} id="myChartCOCO2"></canvas>
        </Box>
      </Grid>

      <Grid item className={chart.gradient ? classes.chartGrid : classes.chartGridNone}>
        <Divider style={{ width: '100%' }} />
        <Typography variant="h5" className={classes.header}>
          Gradient
        </Typography>
        <Box className={classes.chartBox}>
          <canvas className={classes.chart} id="myChartGradient"></canvas>
        </Box>
      </Grid>

      <Grid item className={chart.slidingAverage ? classes.chartGrid : classes.chartGridNone}>
        <Divider style={{ width: '100%' }} />
        <Typography variant="h5" className={classes.header}>
          Kĺzavý priemer
        </Typography>
        <Box className={classes.chartBox}>
          <canvas className={classes.chart} id="myChartPriemer"></canvas>
        </Box>
      </Grid>

      {chart.slidingAverage ? (
        <Grid item xs={12}>
          <Divider style={{ width: '100%' }} />
          <Typography variant="h5" style={{ padding: '15px 0 15px 0' }}>
            Štatistické výpočty
          </Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table} stickyHeader aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Aritmetický priemer</StyledTableCell>
                  <StyledTableCell align="center">Rozptyl</StyledTableCell>
                  <StyledTableCell align="center">Maximálna hodnota</StyledTableCell>
                  <StyledTableCell align="center" style={{ borderRight: 'none' }}>
                    Minimálna hodnota
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow key={maximum.fileName}>
                  <StyledTableCell align="center">{average}</StyledTableCell>
                  <StyledTableCell align="center">{rozptyl}</StyledTableCell>
                  <StyledTableCell align="center">{maximum.value}</StyledTableCell>
                  <StyledTableCell align="center" style={{ borderRight: 'none' }}>
                    {minimum.value}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      ) : (
        ''
      )}
    </Grid>
  )
}

export default DataAnalysis
