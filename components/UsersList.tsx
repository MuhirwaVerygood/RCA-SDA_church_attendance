import React, { useEffect, useState } from 'react'
import { MemberType } from './Homepage'
import Cookies from 'js-cookie'
import { Button } from '@chakra-ui/react'
import axios from "axios"
import { useRouter } from 'next/navigation'
import { useFamily } from '@/app/contexts/FamilyContextProvider'

const UsersList = ({userDatas}:{userDatas: MemberType[]}) => {
  const [token, setToken ]  = useState<string | undefined>(undefined)
  const [role, setRole] = useState<string | undefined>(undefined)
  const router  = useRouter()
  const {familyDropDownOpened}  = useFamily()



  useEffect(()=>{
    setToken(Cookies.get("token"))
    setRole(Cookies.get("role"))
  },[])

  const handleAddNewUser= ()=>{
    router.push("/users/new")
  }

  const handleDelete = async (id:number | undefined) => {
    const res = await axios.delete("https://attendance-pro.onrender.com/api/v1/members/deleteMember/" + id, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    if (res.data) {
      window.location.reload()
    } 
  }


  const handleUpdate = async (data: MemberType) => {
    localStorage.setItem("userToUpdate", JSON.stringify(data))
    router.push("/update")

  }
  return token?  <div className='w-full flex flex-col '>
  {role ==="ADMIN" ?  <div className={`flex justify-end  ${familyDropDownOpened ? "mt-[8%]": "mt-[2%]"} mb-[2%] pr-[5%] `}>
  <Button colorScheme='teal' variant={"solid"} onClick={handleAddNewUser} >Add New User</Button>
  </div> :""}
  <div className=' w-full  flex flex-col  items-center'>
  <table className='lg:w-[40%]'>
    <thead>
      <th className=' border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2'>Id</th>
      <th className=' border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2'>Names</th>
      <th className=' border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2'>Class</th>
      <th className=' border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2'>Gender</th>
      <th className=' border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2'>Family</th>
      <th className=' border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2' >Delete</th>
      <th className=' border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2'>Update</th>
    </thead>
    <tbody>
      {userDatas.map((data)=>{
        return(
          <tr key={data.memberId}>
                <td className=' border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2' >{data.memberId}</td>
                <td className=' border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2'>{data.firstname} {data.lastname}</td>
                <td className=' border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2'>
                  {data.className}
                </td>
                <td className=' border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2'>
                  {data.gender}
                </td>
                <td className=' border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2'>{data.familyName}</td>
                <td className=' border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2'>
                  <Button style={{ textAlign: "center" }}  colorScheme='red' onClick={() => handleDelete(data.memberId)}>Delete</Button>
                </td>
                <td className=' border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2'>
                  <Button  textAlign={"center"} colorScheme='purple'  onClick={() => { handleUpdate(data) }}>Update</Button>
                </td>
              </tr>
        )
      })}
    </tbody>
  </table>
  </div>
</div>: ""
}
export default UsersList
