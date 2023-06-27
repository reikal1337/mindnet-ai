"use client"
import { isValidPassword, isValidUsername, passowrdRegex, usernameRegex } from '@/lib/validation/auth'
import { register } from '@/service/auth'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

function RegisterForm() {
const [formData,setFormData] = useState<RegisterUser>({
    email: "",
    username: "",
    password: "",
    repPassword: "",
    })

const [error,setError] = useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        if(name === "username" ){
            if(usernameRegex(value)){
                console.log(value)
                setFormData({
                    ...formData,
                    [name]: value
                })
                }else{
                    return null
                }
            }
        if(name === "password" || name === "repPassword"){
            if(passowrdRegex(value)){
                setFormData({
                    ...formData,
                    [name]: value
                })
                }else{
                    return null
                }
            }
            setFormData({
                ...formData,
                [name]: value
            })
        }
    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(formData.password === formData.repPassword){
            if(isValidUsername(formData.username)){
                if(isValidPassword(formData.password)){
                    register(formData)
                }else{
                    setError(`Passowrd must be 6-15 and only contain a-z, A-Z, 0-9, (~\`!@#$%^&*()_-+={[}]|:;"'<,>.?/)`)
                }
            }else{
                setError("Username must be 5-15 and only contain a-z,A-Z,0-9")
            }
        }else{
            setError("Passwords have to match!")
        }
        
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
        <label htmlFor="username">Username:</label>
        <input 
        name="username"
        id="username"
        type="text"
        placeholder="username..."
        minLength={5}
        maxLength={15}
        onChange={handleChange}
        value={formData.username}
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
        <label htmlFor="repPassword">Repeat password:</label>
        <input 
        name="repPassword"
        id="repPassword"
        type="password"
        placeholder="repeat password..."
        minLength={6}
        maxLength={15}
        onChange={handleChange}
        value={formData.repPassword}
        required
        />
        {/* Temporary */}
        <br/> 
        <label>{error}</label>
        <button type='submit'>Register</button>
    </form>
)
}

export default RegisterForm