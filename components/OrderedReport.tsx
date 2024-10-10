import { AttendanceSummary } from '@/app/report/page'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const OrderedReport = ({churchAttendance}:{churchAttendance: AttendanceSummary[]}) => {
    const [familyAttendanceSummary, setFamilySummary] = useState<AttendanceSummary| {}>({})
    const fetchAllFamilyAttendances= async() =>{
        try {
            const response = await axios.get("http://localhost:3500/api/v1/attendances",
                {
                  headers:{
                    Authorization:`Bearer ${Cookies.get("token")}`
                }
            });
            if(response.status == 200){
                console.log(response.data);   
            }
        } catch (error:any) {
            console.log(error.data.message);
            
        }        
    }

    useEffect(()=>{
        fetchAllFamilyAttendances();
    },[])
  return (
    <div>

    </div>
  )
}

export default OrderedReport