// import React from 'react';
import Link from 'next/link'

export function Button() {
  return (
    <Link href={'/sign-up'}>
      <a>
        <button className='btn'>Sign Up</button>
      </a>
    </Link>
  );
}
