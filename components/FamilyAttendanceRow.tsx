import { useState } from "react";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { AttendanceRequest } from "@/app/lib/AttendanceSlice";
import { FamilyAttendanceState, updateFamilyAttendanceSync } from "@/app/lib/FamilyAttendanceSlice";
import FamilyAttendanceCheckbox from "./FamilyAttendanceCheckbox";

const FamilyAttendanceRow = ({
  user,
  dispatch,
  id,
}: {
  user: AttendanceRequest;
  id: number;
  dispatch: ThunkDispatch<{ attendance: FamilyAttendanceState }, undefined, UnknownAction> &
    Dispatch<UnknownAction>;
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
    afiteIndiMpamvu: user.afiteIndiMpamvu,
  });

  const handleUpdate = (key: keyof typeof attendanceData, value: boolean) => {
    setAttendanceData((prevData) => {
      const updatedData = { ...prevData, [key]: value };
      dispatch(updateFamilyAttendanceSync(updatedData));
      return updatedData;
    });
  };

  return (
    <tr key={user.memberId} className="border-b border-gray-200">
      <td className="border p-2 text-center">{id}</td>
      <td className="border p-2">{username}</td>
      <FamilyAttendanceCheckbox fieldName="yaje" isChecked={attendanceData.yaje} handleUpdate={handleUpdate} />
      <FamilyAttendanceCheckbox fieldName="ararwaye" isChecked={attendanceData.ararwaye} handleUpdate={handleUpdate} />
      <FamilyAttendanceCheckbox fieldName="afiteIndiMpamvu" isChecked={attendanceData.afiteIndiMpamvu} handleUpdate={handleUpdate} />
      <FamilyAttendanceCheckbox fieldName="yarasuye" isChecked={attendanceData.yarasuye} handleUpdate={handleUpdate} />
      <FamilyAttendanceCheckbox fieldName="yarasuwe" isChecked={attendanceData.yarasuwe} handleUpdate={handleUpdate} />
      <FamilyAttendanceCheckbox fieldName="yarafashije" isChecked={attendanceData.yarafashije} handleUpdate={handleUpdate} />
      <FamilyAttendanceCheckbox fieldName="yarafashijwe" isChecked={attendanceData.yarafashijwe} handleUpdate={handleUpdate} />
      <FamilyAttendanceCheckbox fieldName="yize7" isChecked={attendanceData.yize7} handleUpdate={handleUpdate} />
      <FamilyAttendanceCheckbox fieldName="yatangiyeIsabato" isChecked={attendanceData.yatangiyeIsabato} handleUpdate={handleUpdate} />
    </tr>
  );
};

export default FamilyAttendanceRow;
