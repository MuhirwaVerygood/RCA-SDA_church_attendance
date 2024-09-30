import { AttendanceRequest } from "@/app/lib/AttendanceSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";

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
    const router = useRouter();

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFamilyAttendance((prevState) => ({
            ...prevState,
            [name]: Number(value), // Convert string input to number
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle the form submission logic here
        console.log(familyAttendance);
    };

    return (
        <Box p={4}>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
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

                    <Button type="submit" colorScheme="teal">
                        Submit
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default FamilyFormPage;
