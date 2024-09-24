"use client"
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useAuth } from '@/app/contexts/AuthProvider';

interface MemberType{

}

const Homepage = () => {
  const [userDatas , setUserDatas] = useState<MemberType[]>([]);
  const {role, token} = useAuth()
  useEffect(()=>{
    console.log(role, token);
    
  },[])
  
  return (
    <div>
      <Navbar/>
      {/* <UsersList userDatas={userDatas}/> */}
    </div>
  )
}

export default Homepage
