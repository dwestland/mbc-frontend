import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/CamItem.module.scss'

export default function CamItem({cam}) {
  return (
    <div className={styles.cam}>
      <div className={styles.img}>
        <a
          href={cam.url}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={cam.image ? cam.image : '/cam-images/no-image.jpg'}
            width={170}
            height={100}
            alt={cam.title ? cam.title : 'No image available'}
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
