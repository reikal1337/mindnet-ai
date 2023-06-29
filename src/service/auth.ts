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


