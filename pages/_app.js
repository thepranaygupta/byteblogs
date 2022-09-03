import Navbar from '../components/Navbar'
import '../styles/globals.css'
import AppContext from '../AppContext'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)

  return (
    <AppContext.Provider
      value={{
        state: {
          user
        },
        setUser
      }}
    >
      <Navbar />
      <div className="mt-20">
        <Component {...pageProps} />
      </div>
    </AppContext.Provider>
  )
}

export default MyApp
