import { configureStore } from '@reduxjs/toolkit'
import attendanceSlice from './AttendanceSlice';
import familyAttendanceSlice from './FamilyAttendanceSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
        attendance: attendanceSlice,
        familyAttendance: familyAttendanceSlice
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']