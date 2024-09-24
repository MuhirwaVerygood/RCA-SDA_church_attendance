import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
interface LinkSchema{
    name: string, 
    href: string
    }
const Navbar = () => {
    const navigationLinks: LinkSchema[] =[
        {
            name:"Home",
            href:"/users"
        },
        {
            name:"Attendances",
            href:"/attendances"
        },
        {
            name:"Report",
            href:"/report"
        },
        {
            name:"Support",
            href:"/support"
        },
        {
            name:"Logout",
            href:"/logout"
        },
    ]

    const router = useRouter()
  const handleLogout = async () => {
    localStorage.removeItem("token")
    router.push("/signin")
  }

  return (
    <nav className='h-[80px] '>
      <div className='bg-pink-300 h-full flex items-center justify-end gap-[3%] pr-[5%] text-white'>
      {
        navigationLinks.map((li, index)=>{
            return (
                <Link href={li.href} key={index}>{li.name}</Link>
            )
        })
        }
      </div>
    </nav>
  )
}

export default Navbar
