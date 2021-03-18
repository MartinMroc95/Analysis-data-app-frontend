import React, { useEffect, useState } from 'react'
import Button from '../components/Button'

import { initCOCO2Chart } from '../components/Charts/COCO2Chart'

import axios from 'axios'

import { Menu, MenuList, MenuButton, MenuItem, MenuItems, MenuPopover, MenuLink } from '@reach/menu-button'
import '@reach/menu-button/styles.css'
import { Dialog, DialogOverlay, DialogContent } from '@reach/dialog'
import '@reach/dialog/styles.css'

import Fade from 'react-reveal/Fade'

const FileManagment = () => {
  const [datas, setDatas] = useState([])
  const [selectedFile, setSelectedFile] = useState('')
  const [fileStatus, setFileStatus] = useState('')
  const [showDialog, setShowDialog] = useState(false)

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
    <section>
      <h1>Select files from database</h1>
      <Menu>
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
      </Menu>
      <Fade when={selectedFile}>
        <button className="px-4 py-2 mr-4 bg-buttonColor text-background" onClick={() => handleOnClick('Vyhovujúci')}>
          Correct
        </button>
        <button className="px-4 py-2 mr-4 bg-buttonColor text-background" onClick={() => handleOnClick('Nevyhovujúci')}>
          InCorrect
        </button>
        <button className="px-4 py-2 mr-4 border text-background">{fileStatus || 'File Status'}</button>
      </Fade>

      <Fade top when={showDialog}>
        <Dialog
          className="flex-col w-80 text-center items-center"
          aria-label="label"
          isOpen={showDialog}
          onDismiss={() => setShowDialog(false)}
        >
          <p className="pb-2 text-center">Status was changed successfully.</p> <hr />
          <button className="px-4 py-1 mt-2 border close-button" onClick={() => setShowDialog(false)}>
            Okey
          </button>
        </Dialog>
      </Fade>

      <canvas
        id="myChartCOCO2"
        className={`${selectedFile === '' ? 'hidden' : 'visible'} min-w-380 min-h-380 `}
        height="183"
        width="400"
      ></canvas>
    </section>
  )
}

export default FileManagment
