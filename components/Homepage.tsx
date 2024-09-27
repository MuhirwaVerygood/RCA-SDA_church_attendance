import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Cookies from "js-cookie";
import UsersList from './UsersList';
import { useAppDispatch, useAppSelector } from '@/app/lib/hook';
import {  addAttendanceSync, AttendanceRequest } from '@/app/lib/AttendanceSlice';
import { RootState } from '@/app/lib/store';

export interface MemberType {
  firstname: string;
  lastname: string;
  className: string;
  gender: string;
  familyName: string;
  memberId: number;
}


const Homepage = () => {
  const [userDatas, setUserDatas] = useState<MemberType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const token = Cookies.get("token");
  const dispatch = useAppDispatch();
  const attendancies = useAppSelector((state: RootState)=>state.attendance.attendances)
  const fetchData = async () => {
    console.log(attendancies);
    
    try {
      setLoading(true);
      console.log("Bearer before", token);

      const response = await axios.get("http://localhost:3500/api/v1/members", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserDatas(response.data);
    console.log(userDatas)
      

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Error response:', error.response);
      } else {
        console.error('General Error:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(()=>{
    console.log(attendancies);    
  },[])
  
  const attendanceRequests: AttendanceRequest[] = userDatas.map((data: MemberType) => ({
    memberId: data.memberId,
    firstname: data.firstname,
    lastname: data.lastname,
    yaje: false,
    yarasuye: false,
    yarasuwe: false,
    yarafashije: false,
    yarafashijwe: false,
    yatangiyeIsabato: false,
    yize7: false,
    ararwaye: false,
    afiteIndiMpamvu:false
  }))

  attendanceRequests.forEach(attendance => dispatch(addAttendanceSync(attendance)));
  console.log(attendanceRequests)
  return (
    <div>
      <Navbar />
      <UsersList userDatas={userDatas} />
    </div>
  );
};

export default Homepage;
