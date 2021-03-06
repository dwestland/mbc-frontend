// import { parseCookies } from '@/helpers/index'
import {FaImage} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.scss'

export default function EditCamPage({ cam }) {
  const [values, setValues] = useState({
    title: cam.title,
    url: cam.url,
    description: cam.description,
    country: cam.country,
    state: cam.state,
    area: cam.area,
    sub_area: cam.sub_area,
  })
  const [imagePreview, setImagePreview] = useState(
    // cam.image ? cam.image.formats.thumbnail.url : null
  )

  let imageUrl = cam.image ? API_URL + cam.image.url : '/images/no-image.jpg'

  const [showModal, setShowModal] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    )

    if (hasEmptyFields) {
      toast.error('Please fill in all fields')
    }

    const res = await fetch(`${API_URL}/cams/${cam.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })

    if (!res.ok) {
      // if (res.status === 403 || res.status === 401) {
      //   toast.error('No token included')
      //   return
      // }
      toast.error('Something Went Wrong')
    } else {
      const cam = await res.json()
      router.push(`/cams/${cam.slug}`)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/cams/${cam.id}`)
    const data = await res.json()

    imageUrl = API_URL + cam.image.url
    setImagePreview(imageUrl)
    // TODO: Image not refreshing after upload

    //   setImagePreview(data.image.formats.thumbnail.url)
    // console.log('%c data.image.formats.thumbnail.url ', 'background: green; color: white', data.image.formats.thumbnail.url)
    // console.log('%c data.image.url ', 'background: green; color: white', data.image.url)


    setShowModal(false)
  }

  return (
    <Layout title='Add New Cam'>
      <Link href='/cams'>Go Back</Link>
      <h1>Edit Cam</h1>
      <h2>{cam.title}</h2>
      <h5>ID# {cam.id} <strong>slug:</strong> {cam.slug}</h5>

      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='title'>Cam Title</label>
            <input
              type='text'
              id='title'
              name='title'
              value={values.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='url'>URL for Cam Site</label>
            <input
              type='text'
              name='url'
              id='url'
              value={values.url}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='country'>Country</label>
            <input
              type='text'
              name='country'
              id='country'
              value={values.country}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='state'>State</label>
            <input
              type='text'
              name='state'
              id='state'
              value={values.state}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='area'>Area - Example: Oahu</label>
            <input
              type='area'
              name='area'
              id='area'
              value={values.area}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='sub_area'>Sub-area - Example: Waikiki Beach</label>
            <input
              type='text'
              name='sub_area'
              id='sub_area'
              value={values.sub_area}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor='description'>Cam Description</label>
          <textarea
            type='text'
            name='description'
            id='description'
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <input type='submit' value='Update Cam' className='btn' />
      </form>
      <h3>Cam Image</h3>
      <Image
        src={imageUrl}
        width={480}
        height={300}
        alt={cam.title}
      />
      <div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-secondary btn-icon"
        >
          <FaImage /> Set Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          camId={cam.id}
          imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  )
}

export async function getServerSideProps({ params: {id} }) {
  const res = await fetch(`${API_URL}/cams/${id}`)
  const cam = await res.json()

  return {
    props: {
      cam
    }
  }
}
