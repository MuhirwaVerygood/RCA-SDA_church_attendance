import { AttendanceRequest } from "@/app/lib/AttendanceSlice";
import { Checkbox } from "@chakra-ui/react";

interface AttendanceCheckboxProps {
    fieldName: keyof AttendanceRequest;
    isChecked: boolean;
    handleUpdate: (key: keyof AttendanceRequest, value: boolean) => void;
  }
  
  const FamilyAttendanceCheckbox: React.FC<AttendanceCheckboxProps> = ({ fieldName, isChecked, handleUpdate }) => {
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      handleUpdate(fieldName, !isChecked);
    };
  
    return (
      <td className="border p-2 text-center cursor-pointer" onClick={() => handleUpdate(fieldName, !isChecked)}>
        <div className="flex justify-center">
          <Checkbox
            isChecked={isChecked}
            onChange={handleCheckboxChange}
            colorScheme="green"
            className="cursor-pointer"
          />
        </div>
      </td>
    );
  };
  
  export default FamilyAttendanceCheckbox;