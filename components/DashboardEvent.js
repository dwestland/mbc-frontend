import Link from 'next/link'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import styles from '@/styles/DashboardEvent.module.css'

export default function DashboardEvent({ cam, handleDelete }) {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/cams/${cam.slug}`}>
          <a>{cam.title}</a>
        </Link>
      </h4>
      <Link href={`/cams/edit/${cam.id}`}>
        <a className={styles.edit}>
          <FaPencilAlt /> <span>Edit Event</span>
        </a>
      </Link>
      <a
        href="#"
        className={styles.delete}
        onClick={() => handleDelete(cam.id)}
      >
        <FaTimes /> <span>Delete</span>
      </a>
    </div>
  )
}
