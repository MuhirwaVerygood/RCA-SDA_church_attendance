import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import {
  AttendanceRequest,
  updateAttendanceSync,
} from "@/app/lib/AttendanceSlice";
import Cookies from "js-cookie";
import FamilyAttendanceRow from './FamilyAttendanceRow';
import { MemberType } from './Homepage';
import { addFamilyAttendanceSync, updateFamilyAttendance, updateFamilyAttendanceSync } from '@/app/lib/FamilyAttendanceSlice';
import { RootState } from '@/app/lib/store';

const FamilyAttendance = ({ id }: { id: number }) => {
  const [abashyitsi, setAbashyitsi] = useState<number | string>(0);
  const token = Cookies.get("token");
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [userDatas, setUserDatas] = useState<MemberType[]>([])
  const toast = useToast();
  const router = useRouter();

  const allAttendance: AttendanceRequest[] = useAppSelector((state: RootState) => state.familyAttendance.attendances)

  const fetchData = async () => {
    console.log(allAttendance);

    try {
      setLoading(true);
      console.log("Bearer before", token);

      const response = await axios.get(`http://localhost:3500/api/v1/members/+${Number(id)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      setUserDatas(response.data);



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







  useEffect(() => {
    if (userDatas.length > 0) {
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
        afiteIndiMpamvu: false
      }));

      attendanceRequests.forEach(attendance => dispatch(addFamilyAttendanceSync(attendance)));
    }
  }, [userDatas, dispatch]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formdata = {
      allAttendance,
      abashyitsi,
      familyId: Number(id)
    };


    try {
      const res = await axios.post(
        `http://localhost:3500/attendance/family`,
        formdata,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status == 200) {
        toast({
          title: "Attendance added successfully",
          duration: 2000,
          position: 'top',
          status: "success"
        })
      }

    } catch (error: any) {
      const errorMessage = axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : error.message || "An error occurred";

      toast({
        title: errorMessage,
        position: "top-right",
        duration: 2000,
        status: "error"
      });
    }
  };



  const handleRedirect = () => {
    router.push(`/attendances/family/form/${id}`)
  }



  return (
    <>
      {allAttendance && <div className="pt-[2%] flex flex-col items-center">
        <form action="" className="w-[90%] " onSubmit={handleSubmit}>
          <table className="w-full">
            <thead>
              <tr>
                <td className="border-[1px]  ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2 font-bold">
                  No
                </td>
                <td className="border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-8 w-fit ss:py-1 md:py-2 font-bold">
                  Username
                </td>
                <td className="border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2 font-bold">
                  Yaje
                </td>
                <td className="border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2 font-bold">
                  Ararwaye
                </td>
                <td className="border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2 font-bold">
                  Afite impamvu
                </td>
                <td className="border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2 font-bold">
                  Yarasuye
                </td>
                <td className="border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2 font-bold">
                  Yarasuwe
                </td>
                <td className="border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2 font-bold">
                  Yarafashije
                </td>
                <td className="border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2 font-bold">
                  Yarafashijwe
                </td>
                <td className="border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2 font-bold">
                  Yize 7
                </td>
                <td className="border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2 font-bold">
                  Yatangiye Isabato
                </td>
              </tr>
            </thead>
            <tbody>
              {allAttendance.map((user, index) => {
                return (
                  <FamilyAttendanceRow
                    key={user.memberId}
                    user={user}
                    id={index + 1}
                    dispatch={dispatch}
                  />
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-between w-full">
            <Input
              htmlSize={4}
              width="auto"
              defaultValue={0}
              onChange={(e:ChangeEvent<HTMLInputElement>)=>setAbashyitsi(e.target.value)}
              mt={"2%"}
              placeholder="Abashyitsi"
            />
            <Button
              type="submit"
              variant={"solid"}
              mt={"2%"}
              colorScheme="teal"              >
              Submit
            </Button>
          </div>
        </form>

        <Button onClick={handleRedirect}>Use a form </Button>
      </div>}
    </>
  );
}

export default FamilyAttendance