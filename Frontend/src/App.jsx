import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './componets/Header'
import Footer from './componets/Footer'

function App() {

  return (
    <>
      <Header/>
      <main className='min-h-[78vh]'>
        <Outlet/>
      </main>
      <Footer/>
    </>
  )
}

export default App
