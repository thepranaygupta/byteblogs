import Link from 'next/link'
import Image from 'next/Image'
import { AiFillCaretDown } from 'react-icons/ai'
import AppContext from '../AppContext'
import { useContext } from 'react'

function Navbar() {
  const { state, setUser } = useContext(AppContext)

  const user = state?.user

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] w-full py-4 shadow-sm">
      <div className="mx-auto flex w-11/12 max-w-6xl items-center justify-between">
        <Link href="/">
          <a>
            <Image width={40} height={40} src="/logo.png" alt="logo" placeholder="blur" blurDataURL="/logo.png" />
          </a>
        </Link>
        {!user ? (
          <div className="space-x-6">
            <Link href="/login">
              <a className="hover:underline">Login</a>
            </Link>
            <Link href="/signup">
              <a className="rounded-md border-[2px] border-gray-400 p-2 hover:shadow-md">Sign Up</a>
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <button className="hover:underline" onClick={logout}>
              Log Out
            </button>
            <div className="flex cursor-pointer items-center space-x-1">
              <div className="borer-1 flex h-8 w-8 items-center justify-center rounded-full border-gray-500 bg-indigo-900 text-gray-300">
                <p>S</p>
              </div>
              <AiFillCaretDown fill="#aaa" />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
