import React, { useEffect, useState } from 'react'
/* import Button from '../components/Button' */
import Select from 'react-select'

import { initCOCO2Chart } from '../components/Charts/COCO2Chart'

import axios from 'axios'

import { Dialog } from '@reach/dialog'
import '@reach/dialog/styles.css'

import Fade from 'react-reveal/Fade'
import { Container, Button, Typography } from '@material-ui/core'

const FileManagement = () => {
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

  const handleOnClick = (selectedStatus) => {
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
    <Container maxWidth="xl">
      <Typography gutterBottom>Select files from database</Typography>
      <Select
        isClearable
        isSearchable
        options={optionsForSelect}
        onChange={(value) => setSelectedFile(value === null ? '' : value.value)}
      />
      {/* <Menu>
        <MenuButton className="mr-4 px-4 py-2 border">
          {selectedFile.name || 'Select File'} <span aria-hidden>▾</span>
        </MenuButton>
        <MenuList>
          {datas.map((data) => (
            <MenuItem key={data.name} onSelect={() => setSelectedFile(data)}>
              {data.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu> */}
      <Fade when={selectedFile}>
        <Button variant="outlined" color="primary" onClick={() => handleOnClick('Vyhovujúci')}>
          Correct
        </Button>
        <Button variant="outlined" color="primary" onClick={() => handleOnClick('Nevyhovujúci')}>
          InCorrect
        </Button>
        <Button variant="outlined" color="primary">
          {fileStatus || 'File Status'}
        </Button>
      </Fade>

      <Dialog
        className="flex-col w-80 text-center items-center"
        aria-label="label"
        isOpen={showDialog}
        onDismiss={() => setShowDialog(false)}
      >
        <p className="pb-2 text-center">Status was changed successfully.</p> <hr />
        <Button className="px-4 py-1 mt-2 border close-button" onClick={() => setShowDialog(false)}>
          Okey
        </Button>
      </Dialog>

      <canvas
        id="myChartCOCO2"
        className={`${selectedFile === '' ? 'hidden' : 'visible'} min-w-380 min-h-380 `}
      ></canvas>
    </Container>
  )
}

export default FileManagement
