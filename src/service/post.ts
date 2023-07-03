
export async function setPostReaction(id: string, reaction: boolean) {
    const response = await fetch(`http://localhost:3000/api/posts/${id}/${reaction}`,{
      method: "PUT"
    })
    if(!response.ok){
      throw new Error("unable to like ??")
    }

    
    
    return response.json()
  }