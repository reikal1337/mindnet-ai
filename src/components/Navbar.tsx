"use client"
import Link from 'next/link'
import React, { use } from 'react'
import { useSession } from "next-auth/react"
import { signOut } from 'next-auth/react'

function Navbar() {
  const{data: session, status} = useSession()
  
  return (
    <nav>
        
        <Link href="/">Home</Link>
        
        {status === "authenticated" ?
          <>
          <Link href="/profile">{session.user.name}</Link>
          <button onClick={() => signOut()}>Sign out</button>          
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