export interface User{
    userID:string,
    fName:string,
    lName:string,
    email:string,
    password:string,
    role: string,
    cohortNumber: string
}

  
  export interface updateUser{
      userID:string,
      fullName:string,
      email:string    
  }