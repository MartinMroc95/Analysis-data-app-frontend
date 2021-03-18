import React, { useState } from 'react'
import { SheetJSFT } from '../utils/types'
import axios from 'axios'

export default function Reader() {
  const [state, setState] = useState('')
  const [disabled, setDisabled] = useState(true)

  const handleSubmission = () => {
    console.log('klikol som')
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
    <div>
      <h1>Vyberte súbor vo formáte .xls alebo .xlsx </h1>
      <hr />
      <br />
      <input
        type="file"
        className="form-control cursor-pointer"
        id="file"
        accept={SheetJSFT}
        onChange={handleChange}
        multiple
      />
      <input
        disabled={disabled}
        className={`px-5 py-2 ${disabled ? 'bg-myGray' : 'bg-buttonColor'}  text-black cursor-pointer`}
        type="submit"
        value="Upload"
        onClick={handleSubmission}
      />
    </div>
  )
}
