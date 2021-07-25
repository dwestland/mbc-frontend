import Layout from '../components/Layout'
import Link from 'next/link'

export default function HomePage() {
  return (
    <Layout
      title='MyBeachCams.com - Webcams of Hawaii, Florida and California'
      description='Best Web Cams and Surf Cams in Hawaii, Florida and California and and local information about Maui, Los Angles, Miami, Oahu, San Francisco, Kauai and Fort Lauderdale'
    >
      <h1>Home</h1>
      <Link href='/about'>About</Link>
      <p>Text goes here...</p>
    </Layout>
  )
}
