import Link from 'next/link'
// import SubscriptionModal from '../SubscriptionModal'

import { useState } from 'react'
import { useEffect } from 'react'

import { FacebookShareButton, FacebookIcon } from 'next-share'
import { TwitterShareButton, TwitterIcon } from 'next-share'
import { LinkedinShareButton, LinkedinIcon } from 'next-share'
import { RedditShareButton, RedditIcon } from 'next-share'

export default function UserPanel({ contentHeading, blogHeading, blogLink }) {
  const [modalOpen, setModalOpen] = useState(false)
  const handleModal = () => {
    setModalOpen(true)
  }
  const handleModalClose = () => {
    setModalOpen(false)
  }
  //   useEffect(() => {}, [modalOpen])
  //   const baseLink = 'https://wobot.ai'
  //   const blogUrl = `${baseLink}/newblog/${blogLink}`
  //   console.log('BlogURL : ', blogUrl)

  return (
    <>
      <div className="space-y-4">
        {/* Subscribe */}
        {/* <div className="border-borderColor flex-col justify-center rounded-lg border px-[15px] py-[22px]">
          <div className="mb-[25px] text-lg font-medium leading-6">
            Learn to identify, analyze and mitigate process deviations in real-time with{' '}
            <span className="font-bold">video intelligence.</span>
          </div>
          <div className="mb-[25px] text-sm font-normal leading-4 text-[#545454]">
            P.S. You&apos;re signing up for value here. No spam. No overly promotional emails.
          </div>
          <button
            className="bg-primaryBlue w-full rounded-lg py-[16px] text-[20px] font-semibold leading-[18px] text-white transition-all duration-200 hover:text-[22px]"
            onClick={handleModal}
          >
            Subscribe
          </button>
          {modalOpen && <SubscriptionModal handleClose={handleModalClose} />}
        </div> */}

        {/* Social Media */}
        <div className="border-borderColor flex justify-around rounded-lg border p-6">
          <Link href="#1">
            <a className="flex items-center justify-center">
              <div
                className="text-primaryBlue hover:bg-primaryBlue flex h-12 w-12 items-center justify-center rounded-full bg-[#3766E830] transition-all duration-200 hover:text-white"
                title="Share on Facebook"
              >
                <FacebookShareButton
                  url={blogUrl}
                  quote={blogHeading}
                  // hashtag={'#nextshare'}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </div>
            </a>
          </Link>

          <Link href="#2">
            <a className="flex items-center justify-center">
              <div
                className="text-primaryBlue hover:bg-primaryBlue flex h-12 w-12 items-center justify-center rounded-full bg-[#3766E830] transition-all duration-200 hover:text-white"
                title="Share on LinkedIn"
              >
                <LinkedinShareButton url={blogUrl}>
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </div>
            </a>
          </Link>

          <Link href="#3">
            <a className="flex items-center justify-center">
              <div
                className="text-primaryBlue hover:bg-primaryBlue flex h-12 w-12 items-center justify-center rounded-full bg-[#3766E830] transition-all duration-200 hover:text-white"
                title="Share on Twitter"
              >
                <TwitterShareButton url={blogUrl} title={blogHeading}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </div>
            </a>
          </Link>

          <Link href="#4">
            <a className="flex items-center justify-center">
              <div
                className="text-primaryBlue hover:bg-primaryBlue flex h-12 w-12 items-center justify-center rounded-full bg-[#3766E830] transition-all duration-200 hover:text-white"
                title="Share on Reddit"
              >
                <RedditShareButton url={blogUrl} title={blogHeading}>
                  <RedditIcon size={32} round />
                </RedditShareButton>
              </div>
            </a>
          </Link>
        </div>

        {/* Read Carefully */}
        {/* <div className="border border-primaryBlue rounded-lg px-6 py-8 flex-col justify-center bg-primaryBlue text-white leading-5 text-sm font-medium text-center ">
          <div>
            Want to read carefully curated content to help you solve the
            challenges pertaining to your industry?
          </div>
          <button className="w-full rounded-lg bg-white text-primaryBlue font-bold text-[20px] leading-[18px] py-[16px] hover:text-[22px] transition-all duration-200 mt-7">
            Yes Please
          </button>
        </div> */}
      </div>
    </>
  )
}
