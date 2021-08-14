import Layout from '@/components/Layout'
import CamItem from '@/components/CamItem'
import { API_URL } from '@/config/index'
// import Link from 'next/link'

export default function HawaiiPage({ cams }) {

  // const avengers = characters.filter(character => character.team === 'Avengers')

  

  const result = cams.filter(cam => cam.area === 'Kauai')
  // const result = cams.filter(cam => cam.state === 'HI')

  console.log('%c cams ', 'background: red; color: white', cams)
  console.log('%c cams[0].state ', 'background: red; color: white', cams[0].state)
  console.log('%c result ', 'background: red; color: white', result)

  return (
    <Layout
      title='MyBeachCams.com - Webcams of Hawaii, Florida and California'
      description='Best Web Cams and Surf Cams in Hawaii, Florida and California and and local information about Maui, Los Angles, Miami, Oahu, San Francisco, Kauai and Fort Lauderdale'
    >

      <h1>Hawaii</h1>
      {cams.length === 0 && <h3>No cams to show</h3>}
      <div className='cam-container'>
        {result.map((cam) => (
          <CamItem key={cam.id} cam={cam} />
        ))}
      </div>

    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/cams`)
  // const res = await fetch(`${API_URL}/cams?_sort=date:ASC&_limit=3`)
  const cams = await res.json()

  return {
    props: { cams },
    // revalidate: 10,
  }
}
