import Axios from './Axios'
import SummaryApi from '../common/SummaryApi'

const fetchUserDetails = async() => {
    try {
        const response = await Axios({
            method : SummaryApi.user_details.method,
            url : SummaryApi.user_details.url
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

export default fetchUserDetails