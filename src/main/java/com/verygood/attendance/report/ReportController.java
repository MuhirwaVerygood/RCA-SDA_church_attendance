package com.verygood.attendance.report;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.verygood.attendance.attendance.ChurchWideAttendance;
import com.verygood.attendance.attendance.ChurchWideAttendanceRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping(path = "/api/v1/report")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService service;
    @GetMapping()
    public ResponseEntity<List<ChurchWideAttendance>> getMethodName() {
        return service.getALlAttendance();
    }
    

    @DeleteMapping
    public ResponseEntity<?> deleteReports(){
        return service.deleteAllReports();
    }
}
