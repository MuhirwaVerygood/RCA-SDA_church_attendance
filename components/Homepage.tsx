"use client"
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import Cookies from "js-cookie"
import UsersList from './UsersList';

export interface MemberType{
 firstname: string;
 lastname: string;
 className: string;
 familyName: string;
 memberId: number
}

const Homepage = () => {
  const [userDatas , setUserDatas] = useState<MemberType[]>([]);
  const [loading, setLoading] = useState<boolean>(false)

  const token = Cookies.get("token")
  const role = Cookies.get("role")

  const fetchData = async ()=>{
    try {
      setLoading(true)
      console.log("Bearer before", token);
      
      const response = await axios.get("http://localhost:3500/api/v1/members", {
        headers: {
          Authorization: `Bearer ${token}`, // Use template literals here
        },
        
      });      
      console.log(response);
      setUserDatas(response.data)
      console.log(response.data);
      
    } catch (error : any) {
      if (axios.isAxiosError(error )) {
        console.error('Error response:', error.response);
        
    } else {
        console.error('General Error:', error.message);
    }      
    }
  }

  useEffect(()=>{
    fetchData();
  },[])
  
  return (
    <div>
      <Navbar/>
      <UsersList userDatas={userDatas}/>
    </div>
  )
}

export default Homepage
