"use client";
import {
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  useToast,
} from "@chakra-ui/react";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthProvider";
interface LoginSchema {
  email: string;
  password: string;
}

const Login = () => {
  const [user, setUser] = useState<LoginSchema>({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const router = useRouter();
  const {setRole, setToken} = useAuth();
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3500/api/v1/auth/authenticate",
        user
      );
      if (response.data.statusCodeValue == 200) {
        console.log(response);

        toast({
          description: "Logged in successfully",
          status: "success",
          duration: 2000,
          position: "top-right",
        });

        setToken(response.data.body.access_token)
        setRole(response.data.body.role)
        setLoading(false);
        router.push("/users")
      }

      if (response.status == 403) {
        console.log(response);

        toast({
          description: "Invalid email or password",
          status: "error",
          duration: 2000,
          position: "top-right",
        });
        setLoading(false);
      }
    } catch (error: any) {
        if(error.status==403){
            toast({
                description: "Invalid email or password",
                status: "error",
                duration: 2000,
                position: "top-right",
              });
              setLoading(false)
        }else{
            console.log(error.status);
            toast({
              description: "Failed to register user",
              status: "error",
              duration: 2000,
              position: "top-right",
            });
            setLoading(false);
        }
    
    }
  };

  return (
    <Box className="w-full bg-gray-400 flex  flex-col h-screen  justify-center items-center ">
      <form
        action="POST"
        className="flex-col ss:w-[90%] sm:w-[80%] md:w-[40%] lg:w-[30%] pt-[3%] pr-[2%]  ss:pl-[1%] sm:pl-[2%] md: rounded-md justify-center items-center w-[30%] bg-white"
      >
        <Input
          placeholder="Enter your email"
          type="email"
          className="mb-[2%] ss:w-[90%] sm:w-[80%] md:w-[70%] "
          onChange={(e) =>
            setUser((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />

        <InputGroup size="md" className="mb-[2%]">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <InputRightElement width="4.5rem">
            {show ? (
              <IoEyeOffOutline onClick={handleClick} />
            ) : (
              <IoEyeOutline onClick={handleClick} />
            )}
          </InputRightElement>
        </InputGroup>

        <Box className="flex flex-col justify-center  pt-[2%] pb-[3%]">
          <Box>
            <Button
              className="w-[50%] mb-[2%] "
              isLoading={loading}
              colorScheme="teal"
              onClick={handleSubmit}
            >
              Log in{" "}
            </Button>
            <p>
              Forgot password ?{" "}
              <Link
                className="text-green-400 hover:no-underline"
                href="/signup"
              >
                {" "}
                Signup{" "}
              </Link>
            </p>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
