import Navbar from '../components/Navbar'
import '../styles/globals.css'
import AppContext from '../AppContext'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function getFromLocal() {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'))
    }
    return null
  }

  return null
}

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(getFromLocal())
  const [loading, setLoading] = useState(false)

  return (
    <AppContext.Provider
      value={{
        state: {
          user,
          loading
        },
        setUser,
        setLoading
      }}
    >
      <Navbar />
      <div className="mx-auto mt-20 w-11/12 max-w-6xl">
        <Component {...pageProps} />
      </div>
      <ToastContainer />
    </AppContext.Provider>
  )
}

export default MyApp
