
export async function createPost(formData: string) {
    const response = await fetch("http://localhost:3000/api/posts/create",{
      method: "POST",
      headers: {
        "Content-Type": "aplication/json"
      },
      body: JSON.stringify(formData)
    })
    if(!response.ok){
      throw new Error("Failed to register")
    }

    
    
    return response.json()
  }

export async function getAllPosts() {
    const response = await fetch("http://localhost:3000/api/posts/all",{cache: "no-store"})
    if(!response.ok){
      throw new Error("Failed to get posts!")
    }


    return response.json()
}

