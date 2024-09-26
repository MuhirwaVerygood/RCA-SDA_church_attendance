"use client";
import {
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface MemberRequestType {
  firstname: string;
  lastname: string;
  className: string;
  familyId: number;
  gender: string;
}

const Page = () => {
  const [user, setUser] = useState<MemberRequestType>({
    firstname: "",
    lastname: "",
    className: "",
    familyId: 0,
    gender: "",
  });

  const [gender, setGender] = useState(""); 
  const [familyId, setFamilyId] = useState<number | null>(null); 

  return (
    <div className="w-full flex flex-col pt-[2%] items-center">
      <form
        action="POST"
        className="ss:w-[90%] sm:w-[70%] md:w-[50%] lg:w-[20%]"
      >
        <Input
          mb={2}
          placeholder="Enter the firstname"
          value={user.firstname}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, firstname: e.target.value }))
          }
        />
        <Input
          mb={2}
          placeholder="Enter the lastname"
          value={user.lastname}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, lastname: e.target.value }))
          }
        />
        <Select
          placeholder="Choose family"
          value={user.familyId ?? ""}
          onChange={(e) =>
            setUser((prev)=>({...prev,familyId: Number(e.target.value)}))
          }
        >
          <option value={1}>Ebenezar</option>
          <option value={2}>Salvation Siblings</option>
          <option value={3}>Family Exaucee</option>
        </Select>

        <Select
          mt={2}
          placeholder="Choose class"
          value={user.className ?? ""}
          onChange={(e) =>
            setUser((prev)=>({...prev,className: (e.target.value)}))
          }
        >
          <option value={"Year one"}>Year one</option>
          <option value={"Year two"}>Year two</option>
          <option value={"Year three"}>Year three</option>
        </Select>

        <RadioGroup
         mt={2}
          onChange={(value)=>setUser((prev)=>({...prev, gender: value}))}
          value={user.gender}
        >
          <Stack direction="row">
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Stack>
        </RadioGroup>
      </form>
    </div>
  );
};

export default Page;
