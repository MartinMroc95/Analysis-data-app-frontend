import axios from 'axios'

export const fetchAllData = async (setDatas, setIsLoading, setAlert) => {
  await axios
    .get('http://localhost:8082/api/upload/data')
    .then((response) => {
      console.log(response)
      if (response && Object.entries(response.data).length > 0) {
        setAlert({ type: 'success', message: 'Data has been loaded successfully.', isOpen: true })
        setDatas(response.data)
        return
      }
      if (Object.entries(response.data).length === 0) {
        setAlert({ type: 'error', message: 'No data in database.', isOpen: true })
        return
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      setIsLoading(false)
    })
}

export const fetchCorrectData = async (setDatas, setIsLoading, setAlert) => {
  await axios
    .get('http://localhost:8082/api/upload/correct-data')
    .then((response) => {
      console.log(response)
      if (response && Object.entries(response.data).length > 0) {
        setDatas(response.data)
        return
      }
      if (Object.entries(response.data).length === 0) {
        setAlert({ type: 'error', message: 'No correct data in database.', isOpen: true })
        return
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .then(() => {
      setIsLoading(false)
    })
}
