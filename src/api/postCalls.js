import axios from 'axios'

export const postSelectedFiles = async (data, setAlert, setDisabledUpload, setIsLoading) => {
    await axios
        .post('http://localhost:8082/api/upload', data)
        .then((response) => {
            console.log(response)
            if (response.data.error_code === 0) {
                setAlert({
                    type: 'success',
                    message: 'Your files has been uploaded successfully.',
                    isOpen: true,
                })
                return
            }

            if (response.data.error_code === 1) {
                setAlert({
                    type: 'error',
                    message: 'Something went wrong! Maybe, you have chosen wrong files.',
                    isOpen: true,
                })
                return
            }
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            setDisabledUpload(true)
            setIsLoading(false)
        })
}

export const postUpdatedStatus = async (selectedFile, selectedStatus, setFileStatus, setShowDialog) => {
    await axios
        .put(`http://localhost:8082/api/upload/set-status/${selectedFile._id}`, { status: selectedStatus })
        .then((response) => {
            console.log(response.data.data.status)
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
            console.log(response)
            setShowDialogForDelete(true)
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {})
}
