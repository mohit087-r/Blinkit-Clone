import axios from "axios";
import { baseURL } from "../src/common/SummaryApi";

const Axios = axios.create({
    baseURL : baseURL,
    withCredentials : true
})

export default Axios