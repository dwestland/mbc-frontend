// import { parseCookies } from '@/helpers/index'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.scss'

export default function AddCamPage({ token }) {
  const [values, setValues] = useState({
    title: '',
    url: '',
    description: '',
    country: '',
    state: '',
    area: '',
    sub_area: '',
  })

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

    const res = await fetch(`${API_URL}/cams`, {
      method: 'POST',
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

  return (
    <Layout title='Add New Cam'>
      <Link href='/cams'>Go Back</Link>
      <h1>Add Cam</h1>
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

        <input type='submit' value='Add Cam' className='btn' />
      </form>
    </Layout>
  )
}

// export async function getServerSideProps({ req }) {
//   const { token } = parseCookies(req)

//   return {
//     props: {
//       token,
//     },
//   }
// }
