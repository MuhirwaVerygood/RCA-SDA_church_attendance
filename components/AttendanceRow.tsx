import { useState } from "react";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { AttendanceRequest, AttendanceState, updateAttendanceSync } from "@/app/lib/AttendanceSlice";
import { Checkbox } from "@chakra-ui/react";

interface AttendanceRowProps {
  user: AttendanceRequest;
  id: number;
  dispatch: ThunkDispatch<{ attendance: AttendanceState }, undefined, UnknownAction> & Dispatch<UnknownAction>;
}

const AttendanceRow = ({ user, dispatch, id }: AttendanceRowProps) => {
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
      dispatch(updateAttendanceSync(updatedData));
      return updatedData;
    });
  };

  const AttendanceCheckbox = ({
    fieldKey,
    isChecked,
  }: {
    fieldKey: keyof AttendanceRequest;
    isChecked: boolean;
  }) => (
    <td
      className="border p-2 text-center cursor-pointer"
      onClick={() => handleUpdate(fieldKey, !isChecked)} 
    >
      <div className="flex justify-center">
        <Checkbox
          isChecked={isChecked}
          onChange={() => handleUpdate(fieldKey, !isChecked)} 
          colorScheme="green"
          className="cursor-pointer"
        />
      </div>
    </td>
  );

  return (
    <tr key={user.memberId} className="border-b border-gray-200">
      <td className="border p-2 text-center">{id}</td>
      <td className="border p-2">{`${user.firstname} ${user.lastname}`}</td>

      <AttendanceCheckbox fieldKey="yaje" isChecked={attendanceData.yaje} />
      <AttendanceCheckbox fieldKey="ararwaye" isChecked={attendanceData.ararwaye} />
      <AttendanceCheckbox fieldKey="afiteIndiMpamvu" isChecked={attendanceData.afiteIndiMpamvu} />
      <AttendanceCheckbox fieldKey="yarasuye" isChecked={attendanceData.yarasuye} />
      <AttendanceCheckbox fieldKey="yarasuwe" isChecked={attendanceData.yarasuwe} />
      <AttendanceCheckbox fieldKey="yarafashije" isChecked={attendanceData.yarafashije} />
      <AttendanceCheckbox fieldKey="yarafashijwe" isChecked={attendanceData.yarafashijwe} />
      <AttendanceCheckbox fieldKey="yize7" isChecked={attendanceData.yize7} />
      <AttendanceCheckbox fieldKey="yatangiyeIsabato" isChecked={attendanceData.yatangiyeIsabato} />
    </tr>
  );
};

export default AttendanceRow;
