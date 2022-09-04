import React, { useContext, useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import dynamic from 'next/dynamic'
const Editor = dynamic(() => import('react-draft-wysiwyg').then((module) => module.Editor), {
  ssr: false
})
import { EditorState } from 'draft-js'
import { WithContext as ReactTags } from 'react-tag-input'
import { convertToRaw, convertFromRaw } from 'draft-js'
import { toast } from 'react-toastify'
import axios from 'axios'
import { backendUri } from '../backend'
import AppContext from '../AppContext'
import Router from 'next/router'

function CreateBlog() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [tags, setTags] = React.useState([])
  const [markdown, setMarkdown] = useState('')
  const { state } = useContext(AppContext)

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i))
  }

  const handleAddition = (tag) => {
    setTags([...tags, tag])
  }

  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  // const [loading, setLoading] = useState(false);

  const uploadImage = () => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'byteblogs')
    data.append('cloud_name', 'smya22')
    fetch(' https://api.cloudinary.com/v1_1/smya22/image/upload', {
      method: 'post',
      body: data
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('Cloudinary data: ', data)
        toast.success('Image uploaded')
        setUrl(data)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  // console.log(state.user.user.id)

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice()

    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)

    // re-render
    setTags(newTags)
  }

  const handleTagClick = (index) => {
    console.log('The tag at index ' + index + ' was clicked')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!url) {
      toast.warn('Please Upload Image first')
      return
    }

    const { data } = await axios.post(`${backendUri}/blogs`, {
      data: {
        heading: title,
        coverImageURL: url.secure_url,
        likes: 0,
        blogDescription: markdown,
        writtenby: state.user.user.id.toString(),
        tags: tags.map((tag) => ({
          tagname: tag.text
        }))
      }
    })
    e.target.reset()
    toast.success('Blog Posted Successfully')
    Router.push('/')
    console.log('Response: ', data)
  }

  if (!state.user) {
    if (typeof window !== 'undefined') {
      Router.push('/')
    }
  }

  return (
    <>
      <div className="mx-auto mt-32 flex max-w-4xl flex-col">
        <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
        <div className="mt-2 max-w-3xl">
          <button onClick={uploadImage} className="rounded-md border-[2px] border-[#ccc] p-4 py-3 hover:text-[#231955]">
            Upload Cover Image
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-4 mb-32 max-w-4xl">
        <input
          placeholder="Title of the Blog"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-transparent text-5xl font-semibold focus:outline-none"
        />
        <div className="my-6">
          <ReactTags
            tags={tags}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            handleTagClick={handleTagClick}
            inputFieldPosition="inline"
            placeholder="Enter Tags"
            autocomplete
            classNames={{
              tags: 'tagsClass',
              tagInput: 'tagInputClass',
              tagInputField: 'tagInputFieldClass',
              selected: 'selectedClass',
              tag: 'tagClass',
              remove: 'removeClass',
              suggestions: 'suggestionsClass',
              activeSuggestion: 'activeSuggestionClass',
              editTagInput: 'editTagInputClass',
              editTagInputField: 'editTagInputField',
              clearAll: 'clearAllClass'
            }}
          />
        </div>

        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Add Event Description (Supports Markdown)"
          className="min-h-[300px] w-full border-[1px] border-gray-300 bg-transparent p-4"
          style={{ resize: 'none' }}
          maxLength="5000"
        />

        <button
          type="submit"
          className='hover:border-pmbarand hover:shadow-md" rounded-md border-[2px] bg-pmbrand p-2 text-white hover:bg-white hover:text-pmbrand'
        >
          Submit
        </button>
      </form>
    </>
  )
}

export default CreateBlog
