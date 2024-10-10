import { AttendanceSummary } from '@/app/report/page'
import axios from 'axios'
import React, { useEffect, useState, useMemo } from 'react'
import Cookies from 'js-cookie'

const OrderedReport = (
     { churchAttendance , churchTotalMembers, setChurchTotalMembers }:
     { churchAttendance: AttendanceSummary[] , churchTotalMembers: number | undefined ,
        setChurchTotalMembers: React.Dispatch<React.SetStateAction<number | undefined>>
     } 
    ) => {
    const [familyAttendanceSummary, setFamilySummary] = useState<AttendanceSummary[]>([])

    const fetchAllFamilyAttendances = async () => {
        try {
            const response = await axios.get("http://localhost:3500/api/v1/attendances", {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            });
            if (response.status === 200) {
                setFamilySummary(response.data);
                // setChurchTotalMembers(response.data.totalMembers) 
            }

        } catch (error: any) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchAllFamilyAttendances();
    }, [])

    const getFamilyName = (familyId: number | string | undefined) => {
        switch (familyId) {
            case 1 :
                return "Ebenezar";
            case 2:
                return "Salvation Siblings";
            default:
                return "Jehovahnise";
        }
    }

    return (
        <div className='flex flex-col items-center pt-[2%]'>
            <h1 className='mb-[1%]' >Family Attendances</h1>
            <table className='w-[90%]'>
                <thead>
                    <tr className="border-[1px]  ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2 font-bold">
                        <th className='border p-2'>Family Name</th>
                        <th className='border p-2'>Abaje</th>
                        <th className='border p-2'>Abasuye</th>
                        <th className='border p-2'>Abasuwe</th>
                        <th className='border p-2'>Abafashije</th>
                        <th className='border p-2'>Abafashijwe</th>
                        <th className='border p-2'>Abatangiye Isabato</th>
                        <th className='border p-2'>Abize 7</th>
                        <th className='border p-2'>Abarwayi</th>
                        <th className='border p-2'>Izindi mpamvu</th>
                    </tr>
                </thead>
                <tbody>
                    {familyAttendanceSummary.map((att, index) => (
                        <tr key={index} className="border-[1px]  ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2 font-bold">
                            <td className='border p-2'>{getFamilyName(att.familyId)}</td>
                            <td className='border p-2'>{att.totalYajeCount}</td>
                            <td className='border p-2'>{att.totalYarasuyeCount}</td>
                            <td className='border p-2'>{att.totalYarasuweCount}</td>
                            <td className='border p-2'>{att.totalYarafashijeCount}</td>
                            <td className='border p-2'>{att.totalYarafashijweCount}</td>
                            <td className='border p-2'>{att.totalYatangiyeIsabatoCount}</td>
                            <td className='border p-2'>{att.totalYize7Count}</td>
                            <td className='border p-2'>{att.totalArarwayeCount}</td>
                            <td className='border p-2'>{att.totalAfiteIndiMpamvu}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h1 className='mt-[1%] mb-[1%]'>Church attendance</h1>
            <table className='w-[90%]'>
                <thead>
                    <tr className="border-[1px]  ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2 font-bold">
                        <th className='border p-2'>Date</th>
                        <th className='border p-2'>Abaje</th>
                        <th className='border p-2'>Abasuye</th>
                        <th className='border p-2'>Abasuwe</th>
                        <th className='border p-2'>Abafashije</th>
                        <th className='border p-2'>Abafashijwe</th>
                        <th className='border p-2'>Abatangiye Isabato</th>
                        <th className='border p-2'>Abize 7</th>
                        <th className='border p-2'>Abarwayi</th>
                        <th className='border p-2'>Izindi mpamvu</th>
                        <th className='border p-2'>Abashyitsi</th>
                    </tr>
                </thead>
                <tbody>
                    {churchAttendance.map((att, index) => (
                        <tr key={index} className="border-[1px]  ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2 font-bold">
                            <td className='border p-2'>{att.date}</td>
                            <td className='border p-2'>{att.totalYajeCount}</td>
                            <td className='border p-2'>{att.totalYarasuyeCount}</td>
                            <td className='border p-2'>{att.totalYarasuweCount}</td>
                            <td className='border p-2'>{att.totalYarafashijeCount}</td>
                            <td className='border p-2'>{att.totalYarafashijweCount}</td>
                            <td className='border p-2'>{att.totalYatangiyeIsabatoCount}</td>
                            <td className='border p-2'>{att.totalYize7Count}</td>
                            <td className='border p-2'>{att.totalArarwayeCount}</td>
                            <td className='border p-2'>{att.totalAfiteIndiMpamvu}</td>
                            <td className='border p-2'>{att.totalAbashyitsiCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OrderedReport;
