import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import {
  addAttendanceSync,
  AttendanceRequest,
  updateAttendanceSync,
} from "@/app/lib/AttendanceSlice";
import Cookies from "js-cookie";
import AttendanceRow from "./AttendanceRow";
const Attendance = () => {
  const [abashyitsi, setAbashyitsi] = useState<number |  string>(0);
  const token = Cookies.get("token");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const allAttendance: AttendanceRequest[] = useAppSelector(
    (state) => state.attendance.attendances
  );

  const handleSubmit = async () => {
    console.log(allAttendance);
    
    const formdata = {
      allAttendance,
      abashyitsi,
    };

   try {
    const res = await axios.post(
        "http://localhost:3500/api/v1/attendances/new",
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
          position: "top",
          duration: 2000,
          status: "success",
        });
  
        const newAttendance: AttendanceRequest[] = allAttendance.map((data) => ({
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
        }));
  
        newAttendance.forEach((d) => {
          dispatch(updateAttendanceSync(d));
        });
      }

      router.push("/")
    } catch (error) {  
    toast({
        title:"Failed to add attendance",
        position:"top-right",
        duration:2000,
        status: "error"
    })
   }
  };

  return (
    <>
    {allAttendance &&   <div className="pt-[2%] flex flex-col items-center">
        <form action="" className="w-[90%] ">
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
              {allAttendance.map((user) => {
                return (
                  <AttendanceRow
                  key={user.memberId}
                    user={user}
                    id={user.memberId}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setAbashyitsi(e.target.value)}
              defaultValue={0}
              mt={"2%"}
              placeholder="Abashyitsi"
            />
            <Button
              type="submit"
              variant={"solid"}
              mt={"2%"}
              colorScheme="teal"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>}
    </>
  );
};

export default Attendance;
