import axios from 'axios'
import { useContext } from 'react'
import { backendUri } from '../../backend'
import AppContext from '../../AppContext'
import { Router } from 'next/router'
import BlogCard from '../../components/BlogCard'

function ProfilePage({ data }) {
  const { state } = useContext(AppContext)

  if (!state.user) Router.push('/')

  // console.log(data)
  return (
    <div className="mx-auto my-32 flex max-w-3xl flex-col items-center justify-center">
      <div className="border-1 flex h-[4rem] w-[4rem] items-center justify-center rounded-full border-gray-500 bg-indigo-900 text-lg text-gray-300">
        {state.user.user.username.charAt(0)}
      </div>
      <p className="my-2 rounded-lg bg-slate-200 p-2 text-2xl font-semibold">{state.user.user.username}</p>
      <p className="my-2 rounded-lg bg-slate-200 p-2 text-2xl font-semibold">{state.user.user.email}</p>
      <p className="my-6 text-3xl underline">My Blogs</p>
      {data?.map((d, index) => (
        <BlogCard blog={d} key={index} />
      ))}
    </div>
  )
}

export default ProfilePage

export async function getServerSideProps(context) {
  const { data } = await axios.get(`${backendUri}/blogs?filters[writtenby][$eq]=${context.params.id}`)

  // console.log(data)

  return {
    props: {
      data: data.data
    }
  }
}
