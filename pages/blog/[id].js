import Link from 'next/link'
import { styled } from '@mui/material/styles'
import { Stack } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import Chip from '@mui/material/Chip'
import { parseISO } from 'date-fns'

const ArticleContent = styled(Stack)(({ theme }) => ({
  p: {
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
      lineHeight: 1.5
    },
    fontSize: '16px',
    lineHeight: '29px',
    fontFamily: "'Inter', sans-serif",
    margin: '16px 0',
    textAlign: 'justify',
    strong: {
      color: '#545454',
      fontWeight: 600
    },
    img: {
      width: '100%',
      borderRadius: '8px'
    }
  },
  ul: {
    margin: 0
  },
  li: {
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
      lineHeight: 1.5
    },
    fontSize: '16px',
    lineHeight: 1.5,
    fontFamily: "'Inter', sans-serif",
    margin: '12px 0'
  },
  a: {
    color: '#3744E8',
    textDecoration: 'underline',
    margin: '12px 0'
  },
  h1: {
    fontSize: '2.75em',
    fontWeight: 600,
    fontFamily: 'Poppins, sans-serif',
    lineHeight: '40px',
    marginTop: '25px',
    color: '#0F0F0F'
  },
  h2: {
    fontSize: '2.25em',
    fontWeight: 600,
    fontFamily: 'Poppins, sans-serif',
    lineHeight: '40px',
    color: '#0F0F0F',
    margin: '16px 0 12px'
  },
  h3: {
    fontSize: '1.75em',
    fontWeight: 600,
    fontFamily: 'Poppins, sans-serif',
    lineHeight: '40px',
    color: '#0F0F0F',
    margin: '16px 0 12px'
  },
  h4: {
    fontSize: '1.25em',
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    lineHeight: '30px',
    color: '#0F0F0F',
    margin: '16px 0 12px'
  },
  h5: {
    fontSize: '0.27em',
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    lineHeight: '30px',
    color: '#0F0F0F',
    margin: '16px 0 12px'
  }
}))

export default function Blog({ blog, allblogs, myblog }) {
  const result = parseISO(myblog.attributes.publishedAt)
  console.log(blog)
  console.log(allblogs)
  console.log('My Blog : ', myblog)

  return (
    <>
      <main className="relative z-[2] mb-[400px] flex h-full w-full flex-1 flex-col bg-white">
        <div className=" flex items-center justify-center">
          <div className="m-8 flex max-w-[1200px] flex-col lg:flex-row lg:space-x-[100px]">
            <div className="mx-auto w-[90%] lg:mx-3">
              <div className="border-primaryBlue border-l-4 pl-4 text-[14px] font-bold leading-[20px] text-[#000] lg:text-[16px] lg:font-semibold lg:leading-[24px] ">
                {myblog?.attributes?.tags?.map((item, index) => {
                  return (
                    <span key={index} className="mx-1">
                      <Chip label={item.tagname} href="#" clickable />
                    </span>
                  )
                })}
              </div>
              <div className="mt-2 text-[24px] font-bold leading-[29px]  text-[#343434] lg:text-[36px] lg:leading-[54px] lg:text-[#181818]">
                {myblog.attributes.heading}
              </div>
              <div className="flex items-center">
                <div className="mb-8 mt-5 hidden w-fit border-r border-[#545454] pr-5 text-[16px] font-normal leading-[30px] text-[#545454] lg:flex">
                  Published {result.toDateString()}
                </div>
                <div className="mb-8 mt-5 text-[16px] font-normal leading-[30px] text-[#545454]  lg:pl-5">
                  Written by
                  <span className="bg-primaryBlueLightBg mx-2 rounded-lg p-2 px-7 font-semibold text-[#000]">
                    {myblog.attributes.writtenby}
                  </span>
                </div>
              </div>
              <div className="">
                <img src={myblog.attributes.coverImageURL} alt="" className="mx-auto w-full rounded-lg" />
              </div>
              <div className="mb-10">
                <ArticleContent>
                  <ReactMarkdown styl>{myblog.attributes.blogDescription}</ReactMarkdown>
                </ArticleContent>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticPaths = async () => {
  const blogPosts = await fetch(`https://byteblogs.herokuapp.com/api/blogs?populate=*`)
  const blog = await blogPosts.json();


  console.log("BLOG",blog.data);

  return {
    paths: blog?.data?.map((item) => ({
      params: {
        id: `${item.attributes.slug}`
      }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {

  console.log("Params", params);


  const res2 = await fetch(`https://byteblogs.herokuapp.com/api/blogs?filters[slug][$eq]=${params.id}`)
  const singleBlog = await res2.json()

  const res = await fetch('https://byteblogs.herokuapp.com/api/blogs?populate=*')
  const blog = await res.json()

  return {
    props: {
      blog: blog.data[0],
      allblogs: blog.data,
      myblog: singleBlog.data[0]
    },
    revalidate: 1
  }
}
