import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from './Button';
// import { Link } from 'react-router-dom';
// import './Navbar.css';
import Dropdown from './Dropdown'


export default function Navbar() {

  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <div className="dropdown">

      <nav className='navbar'>

        <Link href={'/'}>
          <a className='navbar-logo' onClick={closeMobileMenu}>EPIC Icon</a>
        </Link>

        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link href={'/'}>
              <a className='nav-links' onClick={closeMobileMenu}>Home</a>
            </Link>
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link href={'/services'}>
              <a className='nav-links' onClick={closeMobileMenu}>
                Services ^
              </a>
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li className='nav-item'>
            <Link href={'/products'}>
              <a className='nav-links' onClick={closeMobileMenu}>
                Products
              </a>
            </Link>
          </li>
          <li className='nav-item'>
            <Link href={'/contactUs'}>
              <a className='nav-links' onClick={closeMobileMenu}>
                Contact Us
              </a>
            </Link>
          </li>
          <li>
            <Link href={'/signUp'}>
              <a className='nav-links-mobile' onClick={closeMobileMenu}>
                Sign Up
              </a>
            </Link>
          </li>
        </ul>

        <Button />

      </nav>
    </div>
  );
}
