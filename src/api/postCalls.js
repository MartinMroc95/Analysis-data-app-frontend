import axios from 'axios'

export const postSelectedFiles = async (data, setAlertMessage, setOpenSuccesAlert, setDisabledUpload, setLoading) => {
  await axios
    .post('http://localhost:8082/api/upload', data, {})
    .then((res) => {
      console.log(res.status)
      setAlertMessage('Your files has been uploaded successfully.')
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      setOpenSuccesAlert(true)
      setDisabledUpload(true)
      setLoading(false)
    })
}

export const postUpdatedStatus = async (selectedFile, selectedStatus, setFileStatus, setShowDialog) => {
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

export const deleteSelectedFile = async (selectedFile, setShowDialogForDelete) => {
  await axios
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
