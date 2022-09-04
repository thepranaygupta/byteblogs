import Link from 'next/link'

export default function BlogCard({ blog }) {
  //   console.log(blog)

  return (
    <Link href={`/blog/${blog.attributes.slug}`} key={blog.attributes.id}>
      <a>
        <div className="my-4 flex flex-col items-center rounded-lg border-2 bg-white p-4 shadow-lg lg:flex-row">
          <img src={blog.attributes.coverImageURL} className="w-80" alt={blog.courseName} />

          <div className="flex flex-col justify-between px-8 py-3 lg:py-0 ">
            <h2 className="text-xl font-bold lg:text-3xl">{blog.attributes.heading}</h2>
            <p className="my-[2px] text-justify text-sm lg:text-base">
              {blog.attributes.blogDescription.length > 300
                ? `${blog.attributes.blogDescription.substring(0, 170)}...`
                : blog.attributes.blogDescription}
            </p>
            <p className="my-[2px] text-sm lg:text-base">
              <span className="font-bold">Published By: </span> {blog.attributes.writtenby}
            </p>
          </div>
        </div>
      </a>
    </Link>
  )
}
