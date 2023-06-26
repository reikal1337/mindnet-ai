"use client"
import { signIn } from 'next-auth/react'
import { useState } from 'react'

function RegisterForm() {
const [formData,setFormData] = useState<RegisterUser>({
    email: "",
    username: "",
    password: "",
    repPassword: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
        signIn("crediantials",{ email: formData.email,password: formData.password })
    }

return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input 
        name="email"
        id="email"
        type="email"
        placeholder='youremail@email.com'
        onChange={handleChange}
        required
        />
        {/* Temporary */}
        <br/> 
        <label htmlFor="username">Username:</label>
        <input 
        name="username"
        id="username"
        type="text"
        placeholder="username..."
        onChange={handleChange}
        required
        />
        {/* Temporary */}
        <br/> 
        <label htmlFor="password">Password:</label>
        <input 
        name="password"
        id="password"
        type="password"
        placeholder="password..."
        onChange={handleChange}
        required
        />
        {/* Temporary */}
        <br/> 
        <label htmlFor="repPassword">Repeat password:</label>
        <input 
        name="repPassword"
        id="repPassword"
        type="password"
        placeholder="repPassword..."
        onChange={handleChange}
        required
        />
        {/* Temporary */}
        <br/> 
        <button type='submit'>Register</button>
    </form>
)
}

export default RegisterForm