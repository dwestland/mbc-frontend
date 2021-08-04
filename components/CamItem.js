import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/CamItem.module.scss'
import { API_URL } from '@/config/index'

export default function CamItem({cam}) {
  let imageUrl = cam.image.url ? API_URL + cam.image.url : '/images/no-image.jpg'

  return (
    <div className={styles.cam}>
      <div className={styles.img}>
        <a
          href={cam.url}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={imageUrl}
            width={170}
            height={100}
            alt={cam.title}
          />
        </a>
      </div>
      <div className={styles.info}>
        <span>
          <a
            href={cam.url}
            target="_blank"
            rel="noreferrer"
          >
            <h4>
              {cam.title}
            </h4>
          </a>
          {cam.description}
          <div className={styles.link}>
            <Link href={`/cams/${cam.slug}`}>
              <a className='button button-primary'>Details</a>
            </Link>
          </div>
        </span>
      </div>
    </div>
  )
}
