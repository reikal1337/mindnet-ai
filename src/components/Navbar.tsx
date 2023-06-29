"use client"
import Link from 'next/link'
import React from 'react'
import { useSession } from "next-auth/react"
import { signOut } from 'next-auth/react'

function Navbar() {
  const{data: session, status} = useSession()
    
console.log(status)
  return (
    <nav>
        
        <Link href="/">Home</Link>
        
        {status === "authenticated" ?
          <>
          <Link href="/profile">Profile</Link>
          <button onClick={() => signOut()}>Sign out</button>
          <p>{}</p>
          </>
          :
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        } 
    </nav>
  )
}

export default Navbar