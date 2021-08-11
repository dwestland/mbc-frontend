import qs from 'qs'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import CamItem from '@/components/CamItem'
import { API_URL } from '@/config/index'

export default function SearchPage({ cams }) {
  const router = useRouter()

  return (
    <Layout>
      <h1>Search Results for {router.query.term}</h1>
      <Link href='/cams'>Go Back</Link>
      {cams.length === 0 && <h3>No cams to show</h3>}
      <div className='cam-container'>
        {cams.map((cam) => (
          <CamItem key={cam.id} cam={cam} />
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({query: {term}}) {
  const query = qs.stringify({
    _where: {
      _or: [
        {title_contains: term},
        {description_contains: term},
        {state_contains: term},
        {area_contains: term},
        {sub_area_contains: term},
      ]
    }
  })
  // const res = await fetch(`${API_URL}/cams`)
  const res = await fetch(`${API_URL}/cams?${query}`)
  const cams = await res.json()


  return {
    props: { cams },
  }
}
