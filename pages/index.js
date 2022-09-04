import Head from 'next/head'
import BlogCard from '../components/BlogCard'

export default function Home({ data }) {
  // console.log(data)

  return (
    <>
      <Head>
        <title>ByteBlogs</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="This is the home page" />
      </Head>
      <div className="my-32">
        {data.data.map((blog) => (
          <BlogCard blog={blog} key={blog.id} />
        ))}
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const res = await fetch('https://byteblogs.herokuapp.com/api/blogs?populate=*')
  const data = await res?.json()

  return {
    props: {
      data
    },
    revalidate: 1
  }
}
