import { error } from "console"

export async function register(formData: RegisterUser) {
  const res = await fetch("http://localhost:3000/api/auth/register",{
    method: "POST",
    headers: {
      "Content-Type": "aplication/json"
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    const message = data.message
    console.log(message)
    return message
  })
  .catch(error => {
    console.log("Error: ", error)
  })
  // if(!res.ok){
  //   throw new Error("Failed to register")
  // }
  // console.log("register", message)
  // return test.message
}

export async function login(email: string, password: string): Promise<boolean> {
  var isAuthenticated = false
  const res = await fetch("http://localhost:3000/api/auth/login",{
    method: "POST",
    headers: {
      "Content-Type": "aplication/json"
    },
    body: JSON.stringify({email,password})
  })
  .then(response => {
    const statusCode = response.status
    console.log(statusCode)
    if(statusCode === 200){
      isAuthenticated = true
    }else{
      isAuthenticated = false
    }
  })
  .catch(error => {
    console.log("Error: ", error)
    isAuthenticated = false
  })
  return isAuthenticated
}

