
export function isValidUsername(username: string): boolean{
    if(username.length > 4 && username.length < 16){
        return usernameRegex(username)
    }
    return false

}

export function isValidPassword(password: string): boolean{
    if(password.length > 5 && password.length < 16){
        return passowrdRegex(password)
    }
    return false
    
}

export function usernameRegex(username: string): boolean{
    const regex = /^[a-zA-Z0-9]*$/;
    return regex.test(username);
}

export function passowrdRegex(password: string): boolean{
    const regex = /^[a-zA-Z0-9~`!@#$%^&*()_\-+={[}\]|:;"'<,>.?/]*$/;
    return regex.test(password);
}
