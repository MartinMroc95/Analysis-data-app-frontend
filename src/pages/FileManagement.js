import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
import { initCOCO2Chart } from '../components/Charts/COCO2Chart'
import { Button, Typography, Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import { DialogContentText, DialogActions, makeStyles, Grid, Divider, Box } from '@material-ui/core'
import CustomizedButton from '../components/Button'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  buttonStatus: { borderRadius: '2px', textTransform: 'none' },
  chartBox: {
    display: 'flex',
    maxWidth: '1460px',
    width: '100%',
    height: '79vh',
  },
  chart: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
}))

const selectStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    cursor: 'pointer',
    maxWidth: '300px',
  }),
  menu: (styles) => {
    return {
      ...styles,
      maxWidth: '300px',
    }
  },
  option: (styles, { data, isDisabled, isSelected }) => {
    return {
      ...styles,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      maxWidth: '300px',
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
  const [showDialogForDelete, setShowDialogForDelete] = useState(false)

  const [optionsForSelect, setOptionsForSelect] = useState([])

  const [isLoading, setIsLoading] = useState(true)

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
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    setOptions()
  }, [datas])

  const setOptions = () => {
    datas.map((data) => setOptionsForSelect((prevState) => [...prevState, { value: data, label: data.name }]))
  }

  const onStatusClick = (selectedStatus) => {
    const getCleanCodeArticle = async () => {
      await axios
        .post(`http://localhost:8082/api/upload/set-status/${selectedFile._id}`, { status: selectedStatus })
        .then((response) => {
          console.log(response)
          setFileStatus(response.data.data.status)
          setShowDialog(true)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    getCleanCodeArticle()
  }

  const onDeleteClick = () => {
    axios
      .post(`http://localhost:8082/api/upload/data/${selectedFile._id}`)
      .then((response) => {
        console.log(response.status)
        setShowDialogForDelete(true)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {})
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Typography gutterBottom>Select files from database</Typography>
        <Divider />
      </Grid>

      <Grid item xs={12} sm={12} md={2} className={classes.select}>
        <Select
          isLoading={isLoading}
          disabled={isLoading}
          isClearable
          isSearchable
          styles={selectStyles}
          options={optionsForSelect}
          onChange={(value) => setSelectedFile(value === null ? '' : value.value)}
        ></Select>
      </Grid>

      <Grid item xs={12} sm={12} md={10} style={{ display: 'flex', alignItems: 'center' }}>
        <CustomizedButton buttoncolor="success" onClick={() => onStatusClick('Vyhovujúci')}>
          Correct
        </CustomizedButton>
        <CustomizedButton buttoncolor="error" onClick={() => onStatusClick('Nevyhovujúci')}>
          Incorrect
        </CustomizedButton>
        <CustomizedButton buttoncolor="remove" onClick={() => onDeleteClick()}>
          Delete
        </CustomizedButton>
        <Button className={classes.buttonStatus} variant="outlined">
          File status:
          <span
            style={
              fileStatus === 'Vyhovujúci'
                ? { color: 'rgba(16, 185, 129, 1)', paddingLeft: '5px', fontWeight: 'bold' }
                : { color: 'rgba(239, 68, 68, 1)', paddingLeft: '5px', fontWeight: 'bold' }
            }
          >
            {fileStatus || ''}
          </span>
        </Button>
      </Grid>

      <Grid item className={classes.chartBox} style={selectedFile === '' ? { display: 'none' } : { display: 'flex' }}>
        <Box className={classes.chart}>
          <canvas id="myChartCOCO2"></canvas>
        </Box>

        <Dialog open={showDialog} onClose={() => setShowDialog(false)} aria-labelledby="customized-dialog-title">
          <DialogTitle id="alert-dialog-title">{'Status changed'}</DialogTitle>
          <DialogContent dividers>
            <DialogContentText style={{ margin: 0 }} id="alert-dialog-description">
              File status has been changed successfully!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDialog(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={showDialogForDelete}
          onClose={() => setShowDialogForDelete(false)}
          aria-labelledby="customized-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">{'Status changed'}</DialogTitle>
          <DialogContent dividers>
            <DialogContentText style={{ margin: 0 }} id="alert-dialog-description">
              File has been deleted successfully!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDialogForDelete(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default FileManagement
