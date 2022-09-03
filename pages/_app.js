import Navbar from '../components/Navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <div className="mt-20">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
