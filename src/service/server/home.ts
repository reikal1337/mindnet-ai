import { headers } from "next/headers"

export async function getAllPosts() {
  const response = await fetch("http://localhost:3000/api/posts/all",{
    cache: "no-store",
    method: "GET",
    headers: Object.fromEntries(headers())
  })
  if(!response.ok){
    throw new Error("Unable to get posts!")
  }

   return await response.json()



}

