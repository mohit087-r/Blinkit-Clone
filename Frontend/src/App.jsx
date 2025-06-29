import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './componets/Header'
import Footer from './componets/Footer'
import {Toaster} from 'react-hot-toast'
function App() {

  return (
    <>
      <Header/>
      <main className='min-h-[78vh]'>
        <Outlet/>
      </main>
      <Footer/>
      <Toaster/>
    </>
  )
}

export default App
