"use client"
import FamilyAttendance from '@/components/FamilyAttendance'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const {id}: {id: any} = useParams();
  console.log("id ", id)
  return (
    <div>
        <FamilyAttendance id={id}/>
    </div>
  )
}

export default Page