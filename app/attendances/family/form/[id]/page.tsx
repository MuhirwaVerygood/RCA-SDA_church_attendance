"use client"
import FamilyFormPage from '@/components/FamilyFormPage'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const {id}: {id: any} = useParams();
  console.log("id ", id)
  return (
    <div>
        <FamilyFormPage id={id}/>
    </div>
  )
}

export default Page