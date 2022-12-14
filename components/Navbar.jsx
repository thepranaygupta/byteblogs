import Link from 'next/link'
import Image from 'next/image'
import { AiFillCaretDown } from 'react-icons/ai'
import AppContext from '../AppContext'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import Router from 'next/router'

function Navbar() {
  const { state, setUser } = useContext(AppContext)

  const user = state?.user
  // console.log(user)

  const logout = () => {
    toast.success('Logged Out Successfully!')
    localStorage.removeItem('user')
    setUser(null)
    Router.push('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] w-full bg-[#F1F3F8] py-4 shadow-sm">
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
            <Link href="/create-blog">
              <a className="rounded-md border-[2px] bg-pmbrand p-2 text-white hover:border-pmbrand hover:bg-white hover:text-pmbrand hover:shadow-md">
                New Blog Post 🚀
              </a>
            </Link>
            <div className="flex cursor-pointer items-center space-x-1">
              <p className="mr-3 hover:underline" onClick={logout}>
                Log Out
              </p>
              <div
                className="borer-1 flex h-8 w-8 items-center justify-center rounded-full border-gray-500 bg-indigo-900 text-gray-300"
                onClick={() => Router.push(`/profile/${state.user.user.id}`)}
              >
                <p>{state.user.user.username.charAt(0)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
