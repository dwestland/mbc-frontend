import React, { useContext } from 'react'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import Link from 'next/link'
import Search from './Search'
import AuthContext from '@/context/AuthContext'
import styles from '@/styles/Header.module.scss'

export default function Header() {
  const { user, logout } = useContext(AuthContext)

  return (
    <header className={styles.header}>
      <strong>
        Admin Panel 
        {user?
          <React.Fragment>
            - Hello {user.name}
          </React.Fragment> :
          null
        }
      </strong>
      <div className={styles.logo}>
        <Link href='/'>
          <a>Home</a>
        </Link>
      </div>

      <Search />
      
      <nav>
        <ul>
          <li>
            <Link href='/cams'>
              <a>Cams</a>
            </Link>
          </li>
          <li>
          {user ? (
            // If logged in
            <React.Fragment>
              <li>
                <Link href='/account/dashboard'>
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => logout()}
                  className='btn-secondary btn-icon'
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </React.Fragment>
          ) : (
            // If logged out
            <React.Fragment>
              <li>
                <Link href='/account/login'>
                  <a className='btn-secondary btn-icon'>
                    <FaSignInAlt /> Login
                  </a>
                </Link>
              </li>
            </React.Fragment>
          )}
          </li>
        </ul>
      </nav>
    </header>
  )
}
