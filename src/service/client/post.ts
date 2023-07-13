
export async function setPostReaction(id: string, reaction: "like" | "dislike") {

    const response = await fetch(`http://localhost:3000/api/posts/${id}/${reaction}`,{
      method: "PUT"
    })
    console.log(response)
    if(!response.ok){
      throw new Error("unable to like ??")
    }

    
    
    return response.json()
  }