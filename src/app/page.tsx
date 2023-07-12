import Image from 'next/image'
import styles from './page.module.css'
import { Session, getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import CreatePostForm from '@/components/home/CreatePostForm'
import Feed from '@/components/home/Feed'
import { getAllPosts } from '@/service/server/home'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { cookies, headers } from "next/headers";
 


export default async function Home() {
const session = await getServerSession(authOptions)
const posts: Post[] = await getAllPosts()
  return (
    <main >
      <h1>Home</h1>
      {session ?
      <>
      <button>Global</button>
      <button>Following</button>
      <CreatePostForm />
      <Feed posts={posts} />
      </>
      :
      <>
      <h2>Logged in</h2>
      <Feed posts={posts} />
      </>
      }

      
      
      
    </main>
  )
}


