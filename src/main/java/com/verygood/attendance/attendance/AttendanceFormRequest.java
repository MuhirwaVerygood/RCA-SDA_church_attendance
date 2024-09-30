package com.verygood.attendance.attendance;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AttendanceFormRequest {
    private FamilyAttendance familyAttendance;
    private int abashyitsiCount;
    private int familyId;
}
