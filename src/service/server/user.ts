import { headers } from "next/headers"

export async function getAllUserPosts(username: string) {
  const response = await fetch(`http://localhost:3000/api/user/${username}`,{
    next: { revalidate: 30 },
    method: "GET",
    headers: Object.fromEntries(headers())
  })
  if(!response.ok){
    throw new Error("Unable to get posts!")
  }

   return await response.json()



}

