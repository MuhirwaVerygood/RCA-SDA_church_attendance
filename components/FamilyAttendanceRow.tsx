import { useState } from "react";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { AttendanceRequest, AttendanceState, updateAttendanceSync } from "@/app/lib/AttendanceSlice";
import { Checkbox } from "@chakra-ui/react";
import { FamilyAttendanceState, updateFamilyAttendanceSync } from "@/app/lib/FamilyAttendanceSlice";

const FamilyAttendanceRow= ({ user, dispatch, id }: {
  user: AttendanceRequest, 
  id: number, 
  dispatch: ThunkDispatch<{ attendance: FamilyAttendanceState }, undefined, UnknownAction> & Dispatch<UnknownAction>
}) => {
   
  const username = `${user.firstname} ${user.lastname}`;  
  
  const [attendanceData, setAttendanceData] = useState<AttendanceRequest>({
    memberId: user.memberId,
    firstname: user.firstname,
    lastname: user.lastname,
    yaje: user.yaje, 
    yarasuwe: user.yarasuwe,
    yarasuye: user.yarasuye,
    yarafashije: user.yarafashije,
    yarafashijwe: user.yarafashijwe,
    ararwaye: user.ararwaye,
    yatangiyeIsabato: user.yatangiyeIsabato,
    yize7: user.yize7,
    afiteIndiMpamvu: user.afiteIndiMpamvu
  });

  const handleUpdate = (key: keyof typeof attendanceData, value: boolean) => {
    setAttendanceData(prevData => {
      const updatedData = { ...prevData, [key]: value };
      dispatch(updateFamilyAttendanceSync(updatedData));
      return updatedData; 
    });
  };
  

  return (
    <tr key={user.memberId} className="border-b border-gray-200">
      <td className="border p-2 text-center">{id}</td>
      <td className="border p-2">{username}</td>
      <td 
        className="border p-2 text-center cursor-pointer"
        onClick={() => handleUpdate("yaje", !attendanceData.yaje)}
      >
        <div className="flex justify-center">
          <Checkbox
            isChecked={attendanceData.yaje}
            onChange={(e)=> {
              e.stopPropagation()
              handleUpdate("yaje", !attendanceData.yaje)
            }}
            colorScheme="green"
            className="cursor-pointer"
          />
        </div>
      </td>
      <td 
        className="border p-2 text-center cursor-pointer"
        onClick={() => handleUpdate("ararwaye", !attendanceData.ararwaye)}
      >
        <div className="flex justify-center">
          <Checkbox
            isChecked={attendanceData.ararwaye}
            colorScheme="green"
            className="cursor-pointer"
          />
        </div>
      </td>
     
      <td 
        className="border p-2  text-center cursor-pointer"
        onClick={() => handleUpdate("afiteIndiMpamvu", !attendanceData.afiteIndiMpamvu)}
      >
        <div className="flex justify-center">
          <Checkbox
            isChecked={attendanceData.afiteIndiMpamvu}
            colorScheme="green"
            className="cursor-pointer"
          />
        </div>
      </td>
      <td 
        className="border p-2 text-center cursor-pointer"
        onClick={() => handleUpdate("yarasuye", !attendanceData.yarasuye)}
      >
        <div className="flex justify-center">
          <Checkbox
            isChecked={attendanceData.yarasuye}
            colorScheme="green"
            className="cursor-pointer"
          />
        </div>
      </td>
      <td 
        className="border p-2 text-center cursor-pointer"
        onClick={() => handleUpdate("yarasuwe", !attendanceData.yarasuwe)}
      >
        <div className="flex justify-center">
          <Checkbox
            isChecked={attendanceData.yarasuwe}
            colorScheme="green"
            className="cursor-pointer"
          />
        </div>
      </td>
      <td 
        className="border p-2 text-center cursor-pointer"
        onClick={() => handleUpdate("yarafashije", !attendanceData.yarafashije)}
      >
        <div className="flex justify-center">
          <Checkbox
            isChecked={attendanceData.yarafashije}
            colorScheme="green"
            className="cursor-pointer"
          />
        </div>
      </td>
      <td 
        className="border p-2 text-center cursor-pointer"
        onClick={() => handleUpdate("yarafashijwe", !attendanceData.yarafashijwe)}
      >
        <div className="flex justify-center">
          <Checkbox
            isChecked={attendanceData.yarafashijwe}
            colorScheme="green"
            className="cursor-pointer"
          />
        </div>
      </td>
      <td 
        className="border p-2 text-center cursor-pointer"
        onClick={() => handleUpdate("yize7", !attendanceData.yize7)}
      >
        <div className="flex justify-center">
          <Checkbox
            isChecked={attendanceData.yize7}
            colorScheme="green"
            className="cursor-pointer"
          />
        </div>
      </td>
      <td 
        className="border p-2 text-center cursor-pointer"
        onClick={() => handleUpdate("yatangiyeIsabato", !attendanceData.yatangiyeIsabato)}
      >
        <div className="flex justify-center">
          <Checkbox
            isChecked={attendanceData.yatangiyeIsabato}
            colorScheme="green"
            className="cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default FamilyAttendanceRow;
