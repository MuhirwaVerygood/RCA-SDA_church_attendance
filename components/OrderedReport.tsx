import { AttendanceSummary } from '@/app/report/page';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const OrderedReport = (
  { churchAttendance, churchTotalMembers, setChurchTotalMembers }:
  {
    churchAttendance: AttendanceSummary[],
    churchTotalMembers: number | undefined,
    setChurchTotalMembers: React.Dispatch<React.SetStateAction<number | undefined>>
  }
) => {
  const [familyAttendanceSummary, setFamilySummary] = useState<AttendanceSummary[]>([]);
  const [memberCounts, setMemberCounts] = useState<Record<string, number>>({}); // Storing family member counts

  const fetchAllFamilyAttendances = async () => {
    try {
      const response = await axios.get("http://localhost:3500/api/v1/attendances", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      if (response.status === 200) {
        setFamilySummary(response.data.attendances);
        setMemberCounts(response.data.memberCounts); 
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllFamilyAttendances();
  }, []);

console.log(familyAttendanceSummary);

  const calculateFamilyPercentage = (count: number | undefined, familyName: string) => {
    const familyCount = memberCounts[familyName];
    if (familyCount && count !== undefined) {
      return ((count / familyCount) * 100).toFixed(1);
    }
    return '0.0';
  };


  const calculateChurchPercentage = (count: number | undefined) => {
    if (churchTotalMembers && count !== undefined) {
      return ((count / churchTotalMembers) * 100).toFixed(1);
    }
    return '0.0';
  };

  const getFamilyName = (familyId: number | string | undefined) => {
    switch (familyId) {
      case 1:
        return 'Ebenezar Family';
      case 2:
        return 'Salvation Siblings Family';
      default:
        return 'Jehovah-Nissi Family';
    }
  };

  return (
    <div className='flex flex-col items-center pt-[2%]'>
      <h1 className='mb-[1%]'>Family Attendances</h1>
      <table className='w-[90%]'>
        <thead>
          <tr className="border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2 font-bold">
            <th className='border p-2'>Date</th>
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
          {familyAttendanceSummary.map((att, index) => {
            const familyName = getFamilyName(att.familyId);
            return (
              <tr key={index} className="border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2 font-bold">
                <td className='border p-2'>{att.issuedDate}</td>
                <td className='border p-2'>{familyName}</td>
                <td className='border p-2'>
                  {att.totalYajeCount} 
                  <br />
                  <span className='text-gray-500'>{calculateFamilyPercentage(att.totalYajeCount, familyName)}%</span>
                </td>
                <td className='border p-2'>
                  {att.totalYarasuyeCount}
                  <br />
                  <span className='text-gray-500'>{calculateFamilyPercentage(att.totalYarasuyeCount, familyName)}%</span>
                </td>
                <td className='border p-2'>
                  {att.totalYarasuweCount}
                  <br />
                  <span className='text-gray-500'>{calculateFamilyPercentage(att.totalYarasuweCount, familyName)}%</span>
                </td>
                <td className='border p-2'>
                  {att.totalYarafashijeCount}
                  <br />
                  <span className='text-gray-500'>{calculateFamilyPercentage(att.totalYarafashijeCount, familyName)}%</span>
                </td>
                <td className='border p-2'>
                  {att.totalYarafashijweCount}
                  <br />
                  <span className='text-gray-500'>{calculateFamilyPercentage(att.totalYarafashijweCount, familyName)}%</span>
                </td>
                <td className='border p-2'>
                  {att.totalYatangiyeIsabatoCount}
                  <br />
                  <span className='text-gray-500'>{calculateFamilyPercentage(att.totalYatangiyeIsabatoCount, familyName)}%</span>
                </td>
                <td className='border p-2'>
                  {att.totalYize7Count}
                  <br />
                  <span className='text-gray-500'>{calculateFamilyPercentage(att.totalYize7Count, familyName)}%</span>
                </td>
                <td className='border p-2'>
                  {att.totalArarwayeCount}
                  <br />
                  <span className='text-gray-500'>{calculateFamilyPercentage(att.totalArarwayeCount, familyName)}%</span>
                </td>
                <td className='border p-2'>
                  {att.totalAfiteIndiMpamvu}
                  <br />
                  <span className='text-gray-500'>{calculateFamilyPercentage(att.totalAfiteIndiMpamvu, familyName)}%</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h1 className='mt-[1%] mb-[1%]'>Church attendance</h1>
      <table className='w-[90%]'>
        <thead>
          <tr className="border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2 font-bold">
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
            <tr key={index} className="border-[1px] ss:px-1 sm:px-2 md:px-3 lg:px-4 ss:py-1 md:py-2 font-bold">
              <td className='border p-2'>{att.date}</td>
              <td className='border p-2'>
                {att.totalYajeCount}
                <br />
                <span className='text-gray-500'>{calculateChurchPercentage(att.totalYajeCount)}%</span>
              </td>
              <td className='border p-2'>
                {att.totalYarasuyeCount}
                <br />
                <span className='text-gray-500'>{calculateChurchPercentage(att.totalYarasuyeCount)}%</span>
              </td>
              <td className='border p-2'>
                {att.totalYarasuweCount}
                <br />
                <span className='text-gray-500'>{calculateChurchPercentage(att.totalYarasuweCount)}%</span>
              </td>
              <td className='border p-2'>
                {att.totalYarafashijeCount}
                <br />
                <span className='text-gray-500'>{calculateChurchPercentage(att.totalYarafashijeCount)}%</span>
              </td>
              <td className='border p-2'>
                {att.totalYarafashijweCount}
                <br />
                <span className='text-gray-500'>{calculateChurchPercentage(att.totalYarafashijweCount)}%</span>
              </td>
              <td className='border p-2'>
                {att.totalYatangiyeIsabatoCount}
                <br />
                <span className='text-gray-500'>{calculateChurchPercentage(att.totalYatangiyeIsabatoCount)}%</span>
              </td>
              <td className='border p-2'>
                {att.totalYize7Count}
                <br />
                <span className='text-gray-500'>{calculateChurchPercentage(att.totalYize7Count)}%</span>
              </td>
              <td className='border p-2'>
                {att.totalArarwayeCount}
                <br />
                <span className='text-gray-500'>{calculateChurchPercentage(att.totalArarwayeCount)}%</span>
              </td>
              <td className='border p-2'>
                {att.totalAfiteIndiMpamvu}
                <br />
                <span className='text-gray-500'>{calculateChurchPercentage(att.totalAfiteIndiMpamvu)}%</span>
              </td>
              <td className='border p-2'>
                {att.totalAbashyitsiCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderedReport;
