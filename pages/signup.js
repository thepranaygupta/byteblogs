import axios from 'axios'
import { useContext, useState } from 'react'
import { backendUri } from '../backend'
import { toast } from 'react-toastify'
import AppContext from '../AppContext'

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const { setUser } = useContext(AppContext)

  const { username, email, password, confirmPassword } = formData

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const signUp = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    try {
      const { data } = await axios.post(`${backendUri}/auth/local/register`, {
        username,
        email,
        password
      })
      setUser(data)
      localStorage.setItem('user', JSON.stringify(data))
    } catch (error) {
      toast.error(error.response.data.error.name)
      console.log(error)
    }
  }

  return (
    <form
      className="mx-auto mt-32 flex max-w-lg flex-col space-y-2 rounded-sm border-[1px] border-gray-200 p-6 shadow-md"
      onSubmit={signUp}
    >
      <label className="mb-2">
        <p className="mb-1">Name:</p>
        <input
          type="text"
          placeholder="Name"
          id="username"
          value={username}
          onChange={onChange}
          className="w-full border-[1px] border-gray-300 py-2 px-1"
        />
      </label>
      <label className="mb-2">
        <p className="mb-1">Email:</p>
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChange}
          className="w-full border-[1px] border-gray-300 py-2 px-1"
        />
      </label>
      <label className="mb-2">
        <p className="mb-1">Password:</p>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={onChange}
          className="w-full border-[1px] border-gray-300 py-2 px-1"
        />
      </label>
      <label className="mb-12">
        <p className="mb-1">Confirm Password:</p>
        <input
          type="password"
          placeholder="Confirm Password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={onChange}
          className="w-full border-[1px] border-gray-300 py-2 px-1"
        />
      </label>
      <button type="submit" className="w-[90px] rounded-sm bg-pmbrand py-2 text-white">
        Sign Up
      </button>
    </form>
  )
}

export default SignUp
