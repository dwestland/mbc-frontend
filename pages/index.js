import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import Link from 'next/link'

export default function HomePage({ cams }) {
  console.log(cams)
  return (
    <Layout
      title='MyBeachCams.com - Webcams of Hawaii, Florida and California'
      description='Best Web Cams and Surf Cams in Hawaii, Florida and California and and local information about Maui, Los Angles, Miami, Oahu, San Francisco, Kauai and Fort Lauderdale'
    >
      <h1>Home</h1>
      <Link href='/about'>About</Link>
      <h2>Cams:</h2>
    </Layout>
  )
}

export async function getStaticProps() {
// export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/cams`)
  // const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`)
  const cams = await res.json()

  // console.log(cams)

  return {
    props: {cams},
    // revalidate: 10,
  }
}
