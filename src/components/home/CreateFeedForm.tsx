"use client"

import { createPost } from "@/service/home"
import { FormEvent, useState } from "react"

function CreateFeedForm() {

  const [formData,setFormData] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const res = await createPost(formData)
    setError(res.message)
    console.log(res)
  }

  return (
    <form onSubmit={handleSubmit}>
      
        <textarea  
        name="postText"
        id="postText"
        placeholder='What would you like to share with world ?'
        onChange={(e) => setFormData(e.target.value)}
        minLength={2}
        maxLength={500}
        value={formData}
        required
        />
        <p>{error}</p>

        <button type="submit">Post</button>
    </form>
  )
}

export default CreateFeedForm