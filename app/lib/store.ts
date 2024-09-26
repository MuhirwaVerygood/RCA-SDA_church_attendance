import { configureStore } from '@reduxjs/toolkit'
import attendanceSlice from './AttendanceSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
        attendance: attendanceSlice
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']