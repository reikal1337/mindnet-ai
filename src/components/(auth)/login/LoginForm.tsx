"use client"
import { signIn } from 'next-auth/react'
import { useState } from 'react'

function LoginForm() {
const [formData,setFormData] = useState<LoginUser>({
    email: "",
    password: "",
    })

const [error,setError] = useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
            setFormData({
                ...formData,
                [name]: value
            })
        }
    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("Login")
    
        signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password
        })
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
        value={formData.email}
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
        minLength={6}
        maxLength={15}
        onChange={handleChange}
        value={formData.password}
        required
        />
        {/* Temporary */}
        <br/> 
        <label>{error}</label>
        <button type='submit'>Login</button>
    </form>
)
}

export default LoginForm