import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Cam.module.scss'
import { useRouter } from 'next/router'

export default function CamPage({ cam }) {
  const router = useRouter()
  let imageUrl = cam.image ? API_URL + cam.image.url : '/images/no-image.jpg'

  const deleteCam = async (e) => {
    if(confirm(`Are you sure you want to delete ${cam.title}?`)) {
      const res = await fetch(`${API_URL}/cams/${cam.id}`, {
        method: 'DELETE'
      })

      const data = await res.json()

      if(!res.ok) {
        toast.error(data.message)
      } else {
        router.push('/cams')
      }
    }
  }

  return (
    <Layout>
      <div className={styles.cam}>
        <div className={styles.controls}>
          <Link href={`/cams/edit/${cam.id}`}>
            <a>
              <FaPencilAlt /> Edit Cam
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteCam}>
            <FaTimes /> Delete Cam
          </a>
        </div>
        <h1>Cam Details Page</h1>
        <h2>{cam.title}</h2>
        <ToastContainer />
        <div className={styles.image}>
          <Image
            src={imageUrl}
            width={480}
            height={300}
            alt={cam.title}
          />
        </div>

        <p><strong>id</strong> {cam.id}</p>
        <p><strong>title</strong> {cam.title}</p>
        <p><strong>slug</strong> {cam.slug}</p>
        <p><strong>url</strong> {cam.url}</p>
        <p><strong>description</strong> {cam.description}</p>

        <p><strong>country</strong> {cam.country}</p>
        <p><strong>state</strong> {cam.state}</p>
        <p><strong>area</strong> {cam.area}</p>
        <p><strong>sub_area</strong> {cam.sub_area}</p>

        <p><strong>is_visible</strong> {cam.is_visible ? 'true' : 'false'}</p>
        <p><strong>flag</strong> {cam.flag ? 'true' : 'false'}</p>
        <p><strong>is_down</strong> {cam.is_down ? 'true' : 'false'}</p>

{/*
  <p><strong>latitude</strong> {cam.latitude}</p>
  <p><strong>longitude</strong> {cam.longitude}</p>
  <p><strong>address</strong> {cam.address}</p>
  <p><strong>city</strong> {cam.city}</p>
  <p><strong>postal_code</strong> {cam.postal_code}</p>
*/}

        <Link href='/cams'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>

      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/cams`)
  const cams = await res.json()

  const paths = cams.map((cam) => ({
    params: { slug: cam.slug },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/cams?slug=${slug}`)
  const cams = await res.json()

  return {
    props: {
      cam: cams[0],
    },
    revalidate: 10,
  }
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/cams?slug=${slug}`)
//   const cams = await res.json()

//   return {
//     props: {
//       cam: cams[0],
//     },
//   }
// }
