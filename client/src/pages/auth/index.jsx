import Commonform from '@/components/common-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { signInFormControls, signUpFormControls } from '@/config'
import { AuthContext } from '@/context/auth-context'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { GraduationCap } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';

export const AuthPage = () => {
    const [activeTab, setActiveTab] = useState('signin');

    const {
        signInFormData,
        setSignInFormData,
        signUpFormData, 
        setSignUpFormData,
        handleRegisterUser,
        handleSignInUser
    } = useContext(AuthContext);

    console.log(signInFormData)

     function checkSignInDisable() {
        return( signInFormData && signInFormData.userEmail !== "" && signInFormData.password !== "");
     }
     
     function checkSignUpDisable() {
        return (signUpFormData && signUpFormData.userName !== '' && signUpFormData.password !== '' && signUpFormData.userEmail !== '');
     }   
    
    function handleTabChange(value){
        setActiveTab(value)
    }
  return (
    <div className='flex flex-col min-h-screen'>
     <header className='px-4 lg:px-6 h-14 flex items-center border-b'>
      <Link to={'/'} className='flex items-center justify-center '>
      <GraduationCap   className='h-8 w-8 mr-4' />
      <span className='font-extrabold text-xl'>LMS LEARN</span>
    </Link>
     </header>
     <div className='flex items-center justify-center min-h-screen bg-background'>
       <Tabs
        value={activeTab}
        defaultValue='signin'
        onValueChange={handleTabChange}
        className='w-full max-w-md'
       >
       <TabsList className='grid w-full grid-cols-2'>
         <TabsTrigger value='signin'>SignIn</TabsTrigger>
         <TabsTrigger value='signup'>SignUp</TabsTrigger>
       </TabsList>
       <TabsContent value='signin'>
          <Card>
           <CardHeader>
             <CardTitle>Sign In</CardTitle>
              <CardDescription>Enter Your Credentials For Signin In</CardDescription>
           </CardHeader>
           <CardContent>
             <Commonform 
             formControls={signInFormControls} 
             formData={signInFormData} 
             setFormData={setSignInFormData}
             isButtonDisabled={!checkSignInDisable()}
             handleSubmit={handleSignInUser}
              />

           </CardContent>
          </Card>
       </TabsContent>
       <TabsContent value='signup'>
         <Card>
           <CardHeader>
             <CardTitle>Sign Up</CardTitle>
              <CardDescription>Enter Your Details to Create a New Account</CardDescription>
           </CardHeader>
           <CardContent>
             <Commonform 
             formControls={signUpFormControls} 
             formData={signUpFormData} 
             setFormData={setSignUpFormData}
             isButtonDisabled={!checkSignUpDisable()}
             handleSubmit={handleRegisterUser}
             />
             
           </CardContent>
          </Card>
       </TabsContent>
       </Tabs>

     </div>
    </div>
  )
}
