import Layout from '@/components/Layout'
import CamItem from '@/components/CamItem'
import Pagination from '@/components/Pagination'
import { API_URL, PER_PAGE } from '@/config/index'
import { FaCreativeCommonsRemix } from 'react-icons/fa'

export default function CamsPage({ cams, page, total }) {
  
  return (
    <Layout>
      <h1>Cams</h1>
      {cams.length === 0 && <h3>No cams to show</h3>}

      <div className='cam-container'>
        {cams.map((cam) => (
          <CamItem key={cam.id} cam={cam} />
        ))}
      </div>

      <Pagination page={page} total={total} />
    </Layout>
  )
}

export async function getServerSideProps({query: {page = 1}}) {
  const start = +page === 1 ? 0 : (+page -1) * PER_PAGE

  // Fetch total/count
  const totalRes = await fetch(
    `${API_URL}/cams/count`
  )
  const total = await totalRes.json()

  // Fetch cams
  const camRes = await fetch(`${API_URL}/cams?_limit=${PER_PAGE}&_start=${start}`)
  const cams = await camRes.json()


  return {
    props: { cams, page: +page, total },
  }
}
