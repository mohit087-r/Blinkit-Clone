import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './componets/Header'
import Footer from './componets/Footer'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import fetchUserDetails from './utils/fetchUserDetails'
import { setUserDetails } from './store/userSlice'
import { setAllCategory } from './store/productSlice'
import { useDispatch } from 'react-redux'
import SummaryApi from './common/SummaryApi'
import Axios from './utils/Axios'
import AxiosToastError from './utils/AxiosToastError'

function App() {
  const dispatch = useDispatch()

  const fetchUser = async () => {
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data.data))
  }

  const fetchCategory = async () => {
    try {
      const response = await Axios({
        method: SummaryApi.get_categories.method,
        url: SummaryApi.get_categories.url,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setAllCategory(responseData.data))
        // setCategoryData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchUser()
    fetchCategory()
  }, [])

  return (
    <>
      <Header />
      <main className='min-h-[78vh]'>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
