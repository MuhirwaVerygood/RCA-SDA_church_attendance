package com.verygood.attendance.attendance;

import java.util.List;

import lombok.Data;

@Data
public class AttendanceRequest {
 private List<AllAttendance> allAttendance;
 private int abashyitsi;
 private int familyId;
}
