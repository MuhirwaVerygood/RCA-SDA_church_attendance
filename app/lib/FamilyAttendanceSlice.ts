import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface AttendanceRequest {
  memberId: number;
  firstname: string;
  lastname: string;
  yaje: boolean;
  yarasuye: boolean;
  yarasuwe: boolean;
  yarafashije: boolean;
  yarafashijwe: boolean;
  yatangiyeIsabato: boolean;
  yize7: boolean;
  ararwaye: boolean;
  afiteIndiMpamvu: boolean;
}

export interface FamilyAttendanceState {
  attendances: AttendanceRequest[];
  loading: boolean;
  error: string | null;
}

const initialState: FamilyAttendanceState = {
  attendances: [],
  loading: false,
  error: null,
};

// Ensure unique action name
export const addFamilyAttendance = createAsyncThunk(
  'familyAttendance/addFamilyAttendance',
  async (newAttendance: AttendanceRequest) => {
    const response = await axios.post('/api/familyAttendances', newAttendance);
    return response.data;
  }
);

export const updateFamilyAttendance = createAsyncThunk(
  'familyAttendance/updateFamilyAttendance',
  async (updatedAttendance: AttendanceRequest) => {
    const response = await axios.put(`/api/familyAttendances/${updatedAttendance.memberId}`, updatedAttendance);
    return response.data;
  }
);

export const deleteFamilyAttendance = createAsyncThunk(
  'familyAttendance/deleteFamilyAttendance',
  async (memberId: number) => {
    await axios.delete(`/api/familyAttendances/${memberId}`);
    return memberId;
  }
);

const familyAttendanceSlice = createSlice({
  name: 'familyAttendance',
  initialState,
  reducers: {
    addFamilyAttendanceSync(state, action: PayloadAction<AttendanceRequest>) {
      const { memberId } = action.payload;
      const recordExists = state.attendances.some((data) => data.memberId === memberId);
      if (!recordExists) {
        state.attendances.push(action.payload);
      }
    },
    updateFamilyAttendanceSync(state, action: PayloadAction<AttendanceRequest>) {
      const updatedState = state.attendances.map((data) => {
        if (data.memberId === action.payload.memberId) {
          return { ...data, ...action.payload };
        }
        return data;
      });
      state.attendances = updatedState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addFamilyAttendance.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addFamilyAttendance.fulfilled, (state, action: PayloadAction<AttendanceRequest>) => {
      state.loading = false;
      state.attendances.push(action.payload);
    });
    builder.addCase(addFamilyAttendance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to add attendance';
    });

    builder.addCase(updateFamilyAttendance.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateFamilyAttendance.fulfilled, (state, action: PayloadAction<AttendanceRequest>) => {
      state.loading = false;
      const index = state.attendances.findIndex((a) => a.memberId === action.payload.memberId);
      if (index !== -1) {
        state.attendances[index] = action.payload;
      }
    });
    builder.addCase(updateFamilyAttendance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update attendance';
    });

    builder.addCase(deleteFamilyAttendance.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteFamilyAttendance.fulfilled, (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.attendances = state.attendances.filter((attendance) => attendance.memberId !== action.payload);
    });
    builder.addCase(deleteFamilyAttendance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to delete attendance';
    });
  },
});

export const { addFamilyAttendanceSync, updateFamilyAttendanceSync } = familyAttendanceSlice.actions;

export default familyAttendanceSlice.reducer;
