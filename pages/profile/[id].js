import axios from 'axios'
import { backendUri } from '../../backend'

function ProfilePage({ data }) {
  console.log(data)
  return <div>ProfilePage</div>
}

export default ProfilePage

export async function getServerSideProps(context) {
  const { data } = await axios.get(`${backendUri}/blogs?filters[writtenby][$eq]=${context.params.id}`)

  console.log(data)

  return {
    props: {
      data: data.data
    }
  }
}
