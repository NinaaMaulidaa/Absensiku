import axios from "axios"

const fetchData = async () => {
    const response = await axios.get('https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/user')
    const {data: {data}} = response
    return data
  }

  export default fetchData