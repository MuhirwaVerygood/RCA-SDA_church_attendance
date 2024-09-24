"use client"
import { useAuth } from '@/app/contexts/AuthProvider'
import Homepage from '@/components/Homepage'
import React, { useEffect } from 'react'



const page = () => {
  return (
  <div>
    <Homepage />
  </div>
  )
}

export default page
