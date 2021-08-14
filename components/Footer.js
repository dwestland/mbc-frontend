import Link from 'next/link'
import styles from '../styles/Footer.module.scss'
// import styles from '@/styles/Footer.module.scss'

export default function Footer() {
  let year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; 2005-{year} MyBeachCams.com</p>
      <p>
        <Link href='/about'>About</Link> &nbsp;&nbsp;&nbsp; <Link href='/contact'>Contact Us</Link>
      </p>
    </footer>
  )
}
