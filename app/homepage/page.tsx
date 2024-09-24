import Link from 'next/link'
import React from 'react'

interface LinkSchema{
name: string, 
href: string
}

const page = () => {
    const navigationLinks: LinkSchema[] =[
        {
            name:"Home",
            href:"/"
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
  return (
   <div>
    <nav>
        <ul>
            {navigationLinks.map((li, index)=>{
                return(
                    <Link href={li.href} key={index}>{li.name}</Link>
                )
            })}
        </ul>
    </nav>
    <main></main>
   </div>
  )
}

export default page
