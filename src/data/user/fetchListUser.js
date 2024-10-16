import axios from "axios"

const fetchData = async ({active}) => {
    const response = await axios.get(`https://88gzhtq3-8000.asse.devtunnels.ms/api/v1/user?page=${active? active : 1}&limit=3`)
    const {data} = response
    return data
  }

  export default fetchData