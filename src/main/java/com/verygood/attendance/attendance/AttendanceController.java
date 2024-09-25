package com.verygood.attendance.attendance;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/attendances")
@RequiredArgsConstructor
@Tag(name="Attendance", description = "Apis for attendance management")
public class AttendanceController {
    private final AttendanceService service;


    @GetMapping
    @PreAuthorize("hasAuthority('admin:create')")
    public ResponseEntity<?> getAttendances(){
        return service.getAttendances();
    }

    @PostMapping("/new")
    @PreAuthorize("hasAuthority('admin:create')")
    public ResponseEntity<?> addAttendance(@RequestBody AttendanceRequest[] request){
        return service.addAttendance(request);
    }

    @GetMapping("/{family-id}")
    public ResponseEntity<?> getAttendanceByFamilyId(@PathVariable("family-id") Integer familyId){
        return service.getAttendanceByFamilyId(familyId);
    }
 }
