import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, position, useToast, VStack } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie"
import { title } from "process";

interface FamilyAttendanceForm {
    yajeCount: number;
    ararwayeCount: number;
    yarasuyeCount: number;
    yarasuweCount: number;
    yarafashijeCount: number;
    yarafashijweCount: number;
    yatangiyeIsabatoCount: number;
    yize7Count: number;
    afiteIndiMpamvuCount: number;
}

const FamilyFormPage = ({id}:{id: number}) => {
    const [token ,setToken ] = useState<string | undefined>();
    const [familyAttendance, setFamilyAttendance] = useState<FamilyAttendanceForm>({
        yajeCount: 0,
        yarasuyeCount: 0,
        yarasuweCount: 0,
        ararwayeCount: 0,
        yarafashijeCount: 0,
        yarafashijweCount: 0,
        yatangiyeIsabatoCount: 0,
        yize7Count: 0,
        afiteIndiMpamvuCount: 0,
    });

    const [abashyitsiCount, setAbashyitsiCount] = useState<string>("");

    const toast = useToast()
    useEffect(()=>{
        setToken(Cookies.get("token"));
    },[])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFamilyAttendance((prevState) => ({
            ...prevState,
            [name]: Number(value), 
        }));
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        const formData = {
            familyAttendance, 
            abashyitsiCount,
            familyId: id
        }

        try {
            const response = await axios.post("http://localhost:3500/api/v1/attendances/family-attendance-form", formData,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }) 

            if(response.status ==200){
                toast({
                    title: response.data
                })
            }
            console.log(response);
        } catch (error) {
           console.log(error);
        }
    };


    return (
        <Box p={4} className="w-full min-h-[100vh]  flex justify-center">
            <form onSubmit={handleSubmit} className=" flex flex-col  items-center w-[20%]">
                <VStack spacing={4} align="stretch" className="w-full">
                    <FormControl>
                        <FormLabel htmlFor="yajeCount">Yaje Count</FormLabel>
                        <Input
                            id="yajeCount"
                            name="yajeCount"
                            type="number"
                            value={familyAttendance.yajeCount}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="ararwayeCount">Ararwaye Count</FormLabel>
                        <Input
                            id="ararwayeCount"
                            name="ararwayeCount"
                            type="number"
                            value={familyAttendance.ararwayeCount}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="yarasuyeCount">Yarasuye Count</FormLabel>
                        <Input
                            id="yarasuyeCount"
                            name="yarasuyeCount"
                            type="number"
                            value={familyAttendance.yarasuyeCount}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="yarasuweCount">Yarasuwe Count</FormLabel>
                        <Input
                            id="yarasuweCount"
                            name="yarasuweCount"
                            type="number"
                            value={familyAttendance.yarasuweCount}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="yarafashijeCount">Yarafashije Count</FormLabel>
                        <Input
                            id="yarafashijeCount"
                            name="yarafashijeCount"
                            type="number"
                            value={familyAttendance.yarafashijeCount}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="yarafashijweCount">Yarafashijwe Count</FormLabel>
                        <Input
                            id="yarafashijweCount"
                            name="yarafashijweCount"
                            type="number"
                            value={familyAttendance.yarafashijweCount}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="yatangiyeIsabatoCount">Yatangiye Isabato Count</FormLabel>
                        <Input
                            id="yatangiyeIsabatoCount"
                            name="yatangiyeIsabatoCount"
                            type="number"
                            value={familyAttendance.yatangiyeIsabatoCount}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="yize7Count">Yize 7 Count</FormLabel>
                        <Input
                            id="yize7Count"
                            name="yize7Count"
                            type="number"
                            value={familyAttendance.yize7Count}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="afiteIndiMpamvuCount">Afite Indi Mpamvu Count</FormLabel>
                        <Input
                            id="afiteIndiMpamvuCount"
                            name="afiteIndiMpamvuCount"
                            type="number"
                            value={familyAttendance.afiteIndiMpamvuCount}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="afiteIndiMpamvuCount">Abashyitsi Count</FormLabel>
                        <Input
                            id="abashyitsiCount"
                            name="abashyitsiCount"
                            type="number"
                            value={abashyitsiCount}
                            onChange={(e)=>setAbashyitsiCount(e.target.value)}
                        />
                    </FormControl>

                    <Button type="submit" colorScheme="teal">
                        Submit
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default FamilyFormPage;
