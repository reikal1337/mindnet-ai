import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <nav>
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
    </nav>
  )
}

export default Navbar