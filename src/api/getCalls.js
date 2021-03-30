import axios from 'axios'

export const fetchAllData = async (setDatas, setIsLoading) => {
  await axios
    .get('http://localhost:8082/api/upload/data')
    .then((response) => {
      console.log(response.data)
      setDatas(response.data.data)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      setIsLoading(false)
    })
}

export const fetchCorrectData = async (setDatas, setIsLoading) => {
  await axios
    .get('http://localhost:8082/api/upload/correct-data')
    .then((response) => {
      console.log(response.data)
      setDatas(response.data.data)
    })
    .catch((error) => {
      console.log(error)
    })
    .then(() => {
      setIsLoading(false)
    })
}
