import { useState } from 'react'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.scss'

export default function ImageUpload({ camId, imageUploaded, token }) {
  const [image, setImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('files', image)
    formData.append('ref', 'cams')
    formData.append('refId', camId)
    formData.append('field', 'image')

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      body: formData,
    })

    if (res.ok) {
      imageUploaded()
    }
  }

  const handleFileChange = (e) => {
    // console.log('%c e.target.files[0] ', 'background: red; color: white', e.target.files[0])
    setImage(e.target.files[0])
  }

  return (
    <div className={styles.form}>
      <h1>Upload Cam Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={handleFileChange} />
        </div>
        <input type='submit' value='Upload' className='btn' />
      </form>
    </div>
  )
}
