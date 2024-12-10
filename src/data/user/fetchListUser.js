import axios from "axios"

const fetchData = async ({active = 1}) => {
    const response = await axios.get(`http://localhost:8000/api/v1/user?page=${active}&limit=3`)
    const {data} = response
    return data
  }

  export default fetchData