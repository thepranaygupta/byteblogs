import { useState, useContext } from 'react'
import AppContext from '../AppContext'
import { backendUri } from '../backend'
import { toast } from 'react-toastify'
import axios from 'axios'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { setUser } = useContext(AppContext)

  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const logIn = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post(`${backendUri}/auth/local`, {
        identifier: email,
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
      onSubmit={logIn}
    >
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
      <button type="submit" className="w-[90px] rounded-sm bg-pmbrand py-2 text-white">
        Log In
      </button>
    </form>
  )
}

export default Login
