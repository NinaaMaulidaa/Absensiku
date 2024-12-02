import axios from "axios"

const fetchData = async ({active}) => {
    const response = await axios.get(`http://192.168.1.132:3001/api/v1/user?page=${active? active : 1}&limit=3`)
    const {data} = response
    return data
  }

  export default fetchData