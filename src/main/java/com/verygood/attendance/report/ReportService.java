package com.verygood.attendance.report;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.verygood.attendance.attendance.ChurchWideAttendance;
import com.verygood.attendance.attendance.ChurchWideAttendanceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ChurchWideAttendanceRepository repository;

    public ResponseEntity<List<ChurchWideAttendance>> getALlAttendance() {
        return ResponseEntity.ok().body(repository.findAll());
    }

    public ResponseEntity<?> deleteAllReports(){
        repository.deleteAll();
        return ResponseEntity.ok("Reports deleted successfully");
    }
}
