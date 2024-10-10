"use client"
import OrderedReport from '@/components/OrderedReport';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
export interface AttendanceSummary {
    date: string; 
    totalAbashyitsiCount: number;
    totalAfiteIndiMpamvu: number;
    totalArarwayeCount: number;
    totalYajeCount: number;
    totalYarafashijeCount: number;
    totalYarafashijweCount: number;
    totalYarasuweCount: number;
    totalYarasuyeCount: number;
    totalYatangiyeIsabatoCount: number;
    totalYize7Count: number;
  }
  

const page = () => {
    const [churchAttendance, setChurchAttendance] = useState<AttendanceSummary[]>([])
    const fetchGeneralAttendance = async()=>{
        try {
            const response =  await axios.get("http://localhost:3500/api/v1/report",
                {
                    headers:{
                        Authorization:`Bearer ${Cookies.get("token")}`
                    }
                }
            )
          if(response.status == 200){
            setChurchAttendance(response.data)                        
          }
        } catch (error:any) {
            console.log(error.data.message);
        
        }
    }

    useEffect(()=>{
        fetchGeneralAttendance();      
    },[])

    console.log(churchAttendance);
    
    
  return (
    <div>
        <OrderedReport churchAttendance={churchAttendance} />
    </div>
  )
}

export default page