import Head from 'next/head'
import Header from './Header'
import { useRouter } from 'next/router'
import Footer from './Footer'
import Showcase from './Showcase'
import styles from '../styles/Layout.module.scss'

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      <Header />
      <Showcase />
      <div className={styles.container}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

// {router.pathname === '/' && <Showcase />}

Layout.defaultProps = {
  title: 'MyBeachCams.com - Webcams of Hawaii, Florida and California',
  description: 'Best Web Cams and Surf Cams in Hawaii, Florida and California and and local information about Maui, Los Angles, Miami, Oahu, San Francisco, Kauai and Fort Lauderdale',
}
