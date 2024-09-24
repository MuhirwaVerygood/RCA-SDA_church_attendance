"use client"
import { Box, Button, FormLabel, HStack, Input, InputGroup, InputRightElement, Link, Radio, RadioGroup, Stack, Toast } from "@chakra-ui/react";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import axios from "axios"
import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
interface RegisterSchema {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
}

const Signup = () => {
  const [user, setUser] = useState<RegisterSchema>({firstname:"", lastname:"", email:"", password:"", role:""});
  const [loading ,setLoading] = useState(false)
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const toast  = useToast()
  const router =useRouter()

  const handleSubmit = async()=>{
try {
    setLoading(true)
    const response = await axios.post("http://localhost:3500/api/v1/auth/register", user);
    if(response.data.statusCodeValue == 200){
        console.log(response);
        
        toast({
            description: "User registered successfully",
            status:"success",
            duration: 2000,
            position:"top-right"
        })
        setLoading(false)
        router.push("/signin")
    }


    if(response.data.statusCodeValue == 409){
        console.log(response);
        
        toast({
            description: "User with that email already exists",
            status:"error",
            duration: 2000,
            position:"top-right"
        })
        setLoading(false)
    }


   
    
} catch (error) {
    console.log(error); 
    toast({
        description: "Failed to register user",
        status:"error",
        duration: 2000,
        position:"top-right"
    })
    setLoading(false)
    
}        
  }
  return (
    <Box className="w-full flex flex-col h-screen  justify-center items-center ">
      <form action="POST" 
        className="flex-col ss:w-[90%] sm:w-[80%] md:w-[40%] lg:w-[30%] pt-[3%] pr-[2%]  ss:pl-[1%] sm:pl-[2%] md: rounded-md justify-center items-center w-[30%] bg-white"
        > 
      <Input
    className="mb-[2%]"
  placeholder="Enter your firstname"
  size="lg"
  onChange={(e) =>
    setUser(prev => ({
      ...prev,
      firstname: e.target.value,
    }))
  }
/>
      <Input
  placeholder="Enter your lastname"
  className="mb-[2%]"
  size="lg"
  onChange={(e) =>
    setUser(prev => ({
      ...prev,
      lastname: e.target.value,
    }))
  }
/>
      <Input
  placeholder="Enter your email"
  type="email"
  className="mb-[2%]"
  size="lg"
  onChange={(e) =>
    setUser(prev => ({
      ...prev,
      email: e.target.value,
    }))
  }
/>

<InputGroup size='md' className="mb-[2%]">
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        onChange={(e)=>setUser((prev)=>({...prev, password: e.target.value}))}
      />
      <InputRightElement width='4.5rem'>
          {show ? <IoEyeOffOutline onClick={handleClick} /> : <IoEyeOutline onClick={handleClick} />}
      </InputRightElement>
    </InputGroup>


    <FormLabel as={"legend"} className="text-gray-400">Role</FormLabel>
    <RadioGroup
    className="mb-[2%]"
      value={user.role}
      onChange={(value) => setUser((prev) => ({ ...prev, role: value }))} 
    >
      <Stack direction='row'>
        <Radio value='USER'>User</Radio>
        <Radio value='ADMIN'>Admin</Radio>
      </Stack>
    </RadioGroup>

    <Box className="flex flex-col justify-center pt-[2%] pb-[3%]">
    <Button className="w-[50%] mb-[2%] "
    isLoading={loading}
    loadingText='Loading'
    colorScheme='teal'
    spinnerPlacement='start'
    onClick={handleSubmit} >Sign up </Button> 
    <p>Already have an account ? <Link href="/signin"  className='text-green-400 hover:no-underline'>Log in </Link></p>  
    </Box>


      </form>

    </Box>
  );
};

export default Signup;
