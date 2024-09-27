package com.verygood.attendance.attendance;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.verygood.attendance.family.Family;
import com.verygood.attendance.family.FamilyRepository;
import com.verygood.attendance.member.Member;
import com.verygood.attendance.member.MemberRepository;

import io.micrometer.core.ipc.http.HttpSender.Response;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AttendanceService {
    private final AttendanceRepository repository;
    private final FamilyRepository familyRepository;
    private final MemberRepository memberRepository;
    // private final ChurchWideAttendanceService churchWideAttendanceService;

    public ResponseEntity<?> getAttendances() {
        return ResponseEntity.ok(repository.findAll());
    }

    public ResponseEntity<?> addAttendanceByFamily(AttendanceRequest request){
        LocalDate today = LocalDate.now();
        
        int totalYajeCount = 0;
        int totalYarasuyeCount = 0;
        int totalYarasuweCount = 0;
        int totalYarafashijeCount = 0;
        int totalYarafashijweCount = 0;
        int totalYatangiyeIsabatoCount = 0;
        int totalYize7Count = 0;
        int totalArarwayeCount = 0;
        int totalAfiteIndiMpamvu = 0;
        
        Integer familyId = request.getFamilyId();

        for (AllAttendance attendanceItem : request.getAllAttendance()) {
            Optional<Member> member = memberRepository.findById(attendanceItem.getMemberId());
            if (!member.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member with ID " + attendanceItem.getMemberId() + " not found");
            }

            if (!member.get().getFamily().getId().equals(familyId)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("All members must belong to the same family");
            }

            if (attendanceItem.isYaje()) {
                totalYajeCount++;
            }
            if (attendanceItem.isYarasuye()) {
                totalYarasuyeCount++;
            }
            if (attendanceItem.isYarasuwe()) {
                totalYarasuweCount++;
            }
            if (attendanceItem.isYarafashije()) {
                totalYarafashijeCount++;
            }
            if (attendanceItem.isYarafashijwe()) {
                totalYarafashijweCount++;
            }
            if (attendanceItem.isYatangiyeIsabato()) {
                totalYatangiyeIsabatoCount++;
            }
            if (attendanceItem.isYize7()) {
                totalYize7Count++;
            }
            if (attendanceItem.isArarwaye()) {
                totalArarwayeCount++;
            }
            if (attendanceItem.isAfiteIndiMpamvu()) {
                totalAfiteIndiMpamvu++;
            }
        }

        Optional<Attendance> existingAttendance = repository.findByFamilyIdAndIssuedDate(familyId, today);

        Attendance attendance;
        if (existingAttendance.isPresent()) {
            attendance = existingAttendance.get();
            attendance.setTotalYajeCount(totalYajeCount);
            attendance.setTotalYarasuyeCount(totalYarasuyeCount);
            attendance.setTotalYarasuweCount(totalYarasuweCount);
            attendance.setTotalYarafashijeCount( totalYarafashijeCount);
            attendance.setGetTotalYarafashijweCount( totalYarafashijweCount);
            attendance.setTotalYatangiyeIsabatoCount( totalYatangiyeIsabatoCount);
            attendance.setTotalYize7Count( totalYize7Count);
            attendance.setTotalArarwayeCount(totalArarwayeCount);
            attendance.setTotalAfiteIndiMpamvu( totalAfiteIndiMpamvu);
            attendance.setAbashyitsi(request.getAbashyitsi());
        } else {
            attendance = Attendance.builder()
                .familyId(familyId)
                .issuedDate(today)
                .totalYajeCount(totalYajeCount)
                .totalYarasuyeCount(totalYarasuyeCount)
                .totalYarasuweCount(totalYarasuweCount)
                .totalYarafashijeCount(totalYarafashijeCount)
                .getTotalYarafashijweCount(totalYarafashijweCount)
                .totalYatangiyeIsabatoCount(totalYatangiyeIsabatoCount)
                .totalYize7Count(totalYize7Count)
                .totalArarwayeCount(totalArarwayeCount)
                .totalAfiteIndiMpamvu(totalAfiteIndiMpamvu)
                .abashyitsi(request.getAbashyitsi())
                .build();
        }

        repository.save(attendance);

        // churchWideAttendanceService.updateChurchWideTotals(
        //     totalYajeCount,
        //     totalYarasuyeCount,
        //     totalYarasuweCount,
        //     totalYarafashijeCount,
        //     totalYarafashijweCount,
        //     totalYatangiyeIsabatoCount,
        //     totalYize7Count,
        //     totalArarwayeCount,
        //     totalAfiteIndiMpamvu
        // );

        return ResponseEntity.status(HttpStatus.CREATED).body("Attendance added successfully");
    }





    public ResponseEntity<?> addAttendance(AttendanceRequest request) {
        LocalDate today = LocalDate.now();
        
        // Initialize variables to accumulate the totals
        int totalYajeCount = 0;
        int totalYarasuyeCount = 0;
        int totalYarasuweCount = 0;
        int totalYarafashijeCount = 0;
        int totalYarafashijweCount = 0;
        int totalYatangiyeIsabatoCount = 0;
        int totalYize7Count = 0;
        int totalArarwayeCount = 0;
        int totalAfiteIndiMpamvu = 0;
        
        Integer familyId = null;
    
        // Loop through the members in the attendance request and accumulate totals
        for (AllAttendance attendanceItem : request.getAllAttendance()) {
            Optional<Member> member = memberRepository.findById(attendanceItem.getMemberId());
            if (!member.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member with ID " + attendanceItem.getMemberId() + " not found");
            }
    
            if (!member.get().getFirstname().equals(attendanceItem.getFirstname()) || 
                !member.get().getLastname().equals(attendanceItem.getLastname())) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member with that ID and those names not found");
            }
    
            // Set familyId based on the first member in the array (all members should be from the same family)
            if (familyId == null) {
                familyId = member.get().getFamily().getId();
            }
    
            // Accumulate totals for each member
            if (attendanceItem.isYaje()) {
                totalYajeCount++;
            }
            if (attendanceItem.isYarasuye()) {
                totalYarasuyeCount++;
            }
            if (attendanceItem.isYarasuwe()) {
                totalYarasuweCount++;
            }
            if (attendanceItem.isYarafashije()) {
                totalYarafashijeCount++;
            }
            if (attendanceItem.isYarafashijwe()) {
                totalYarafashijweCount++;
            }
            if (attendanceItem.isYatangiyeIsabato()) {
                totalYatangiyeIsabatoCount++;
            }
            if (attendanceItem.isYize7()) {
                totalYize7Count++;
            }
            if (attendanceItem.isArarwaye()) {
                totalArarwayeCount++;
            }
            if (attendanceItem.isAfiteIndiMpamvu()) {
                totalAfiteIndiMpamvu++;
            }
        }
    
        // Now that all members have been processed, update or create the attendance record
        Optional<Attendance> existingAttendance = repository.findByFamilyIdAndIssuedDate(familyId, today);
    
        Attendance attendance;
        if (existingAttendance.isPresent()) {
            attendance = existingAttendance.get();
            attendance.setTotalYajeCount(totalYajeCount);
            attendance.setTotalYarasuyeCount(totalYarasuyeCount);
            attendance.setTotalYarasuweCount(totalYarasuweCount);
            attendance.setTotalYarafashijeCount(totalYarafashijeCount);
            attendance.setGetTotalYarafashijweCount(totalYarafashijweCount);
            attendance.setTotalYatangiyeIsabatoCount(totalYatangiyeIsabatoCount);
            attendance.setTotalYize7Count(totalYize7Count);
            attendance.setTotalArarwayeCount(totalArarwayeCount);
            attendance.setTotalAfiteIndiMpamvu(totalAfiteIndiMpamvu);
        } else {
            attendance = Attendance.builder()
                .familyId(familyId)
                .issuedDate(today)
                .totalYajeCount(totalYajeCount)
                .totalYarasuyeCount(totalYarasuyeCount)
                .totalYarasuweCount(totalYarasuweCount)
                .totalYarafashijeCount(totalYarafashijeCount)
                .getTotalYarafashijweCount(totalYarafashijweCount)
                .totalYatangiyeIsabatoCount(totalYatangiyeIsabatoCount)
                .totalYize7Count(totalYize7Count)
                .totalArarwayeCount(totalArarwayeCount)
                .totalAfiteIndiMpamvu(totalAfiteIndiMpamvu)
                .build();
        }
    
        repository.save(attendance);
    
        return ResponseEntity.status(HttpStatus.CREATED).body("Attendance added successfully");
    }

    
    public ResponseEntity<?> getAttendanceByFamilyId(Integer familyId) {
        Optional<Family> familyExists = familyRepository.findById(familyId);
        if (!familyExists.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Family with that id does not exist");
        }

        List<Attendance> attendances = repository.findByFamilyId(familyId);
        if (attendances.size() > 0) {
            return ResponseEntity.ok(attendances);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No attendance found for family with id " + familyId);
        }
    }



    public ResponseEntity<?> deleteAllAttendances(){
        repository.deleteAll();
        return ResponseEntity.ok("Attendances deleted successfully");
    }
}
