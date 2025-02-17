import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, registerService } from "@/services";
import { logInService } from "@/services";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
    const [auth, setAuth] = useState({
        authenticate : false,
        user : null
    })
    const [loading, setLoading] = useState(true);
    
  async function handleRegisterUser(event) {
    event.preventDefault();
    const data = await registerService(signUpFormData);
  }

  async function handleSignInUser(event){
    event.preventDefault();
    const data = await logInService(signInFormData);

    if(data.success){
      sessionStorage.setItem("accessToken", 

      JSON.stringify(data.data.accessToken));
      setAuth(
       { authenticate : true,
         user : data.data.user}
      )
      
    }else{
        setAuth({
            authenticate : false,
            user : null
        })
    }
  }

  async function checkAuthUser(){
    try{
      const data = await checkAuthService();
    if(data.success){
        setAuth({
            authenticate : true,
            user : data.data.user
        })
        setLoading(false)

    }else{
        setAuth({
            authenticate : false,
             user  : null
        })
        setLoading(false)

    }
    }catch(error){
      if(!error?.response?.data?.success){
         setAuth({
            authenticate : false,
             user  : null
        })
        setLoading(false)
      }
    }
    
  }
function resetCredentials(){
  setAuth({
    authenticate : false,
    user : null
  })
}
  useEffect(()=>{
    checkAuthUser()
  }, [])

    return <AuthContext.Provider value={{
        signInFormData,
        setSignInFormData,
        signUpFormData, 
        setSignUpFormData,
        handleRegisterUser,
        handleSignInUser,
        auth,
        resetCredentials
    }}>
    {loading ? <Skeleton /> : children}
        </AuthContext.Provider>
}