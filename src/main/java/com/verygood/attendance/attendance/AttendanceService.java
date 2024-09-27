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

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AttendanceService {
    private final AttendanceRepository repository;
    private final FamilyRepository familyRepository;
    private final MemberRepository memberRepository;

    private final ChurchWideAttendanceRepository churchWideAttendanceRepository;
    public ResponseEntity<?> getAttendances() {
        return ResponseEntity.ok(repository.findAll());
    }

    public ResponseEntity<?> addAttendanceByFamily(FamilyAttendanceRequest request) {
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

            // Increment counts based on attendance
            if (attendanceItem.isYaje()) totalYajeCount++;
            if (attendanceItem.isYarasuye()) totalYarasuyeCount++;
            if (attendanceItem.isYarasuwe()) totalYarasuweCount++;
            if (attendanceItem.isYarafashije()) totalYarafashijeCount++;
            if (attendanceItem.isYarafashijwe()) totalYarafashijweCount++;
            if (attendanceItem.isYatangiyeIsabato()) totalYatangiyeIsabatoCount++;
            if (attendanceItem.isYize7()) totalYize7Count++;
            if (attendanceItem.isArarwaye()) totalArarwayeCount++;
            if (attendanceItem.isAfiteIndiMpamvu()) totalAfiteIndiMpamvu++;
        }

        // Update family attendance
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
        

        Optional<ChurchWideAttendance> churchAttendance = churchWideAttendanceRepository.findByDate(today);
        if (churchAttendance.isPresent()) {
            ChurchWideAttendance currentAttendance = churchAttendance.get();
            currentAttendance.setTotalYajeCount(currentAttendance.getTotalYajeCount() + totalYajeCount);
            currentAttendance.setTotalYarasuyeCount(currentAttendance.getTotalYarasuyeCount() + totalYarasuyeCount);
            currentAttendance.setTotalYarasuweCount(currentAttendance.getTotalYarasuweCount() + totalYarasuweCount);
            currentAttendance.setTotalYarafashijeCount(currentAttendance.getTotalYarafashijeCount() + totalYarafashijeCount);
            currentAttendance.setTotalYarafashijweCount(currentAttendance.getTotalYarafashijweCount() + totalYarafashijweCount);
            currentAttendance.setTotalYatangiyeIsabatoCount(currentAttendance.getTotalYatangiyeIsabatoCount() + totalYatangiyeIsabatoCount);
            currentAttendance.setTotalYize7Count(currentAttendance.getTotalYize7Count() + totalYize7Count);
            currentAttendance.setTotalArarwayeCount(currentAttendance.getTotalArarwayeCount() + totalArarwayeCount);
            currentAttendance.setTotalAfiteIndiMpamvu(currentAttendance.getTotalAfiteIndiMpamvu() + totalAfiteIndiMpamvu);
            churchWideAttendanceRepository.save(currentAttendance);
        } else {
            ChurchWideAttendance newAttendance = ChurchWideAttendance.builder()
                .date(today)
                .totalYajeCount(totalYajeCount)
                .totalYarasuyeCount(totalYarasuyeCount)
                .totalYarasuweCount(totalYarasuweCount)
                .totalYarafashijeCount(totalYarafashijeCount)
                .totalYarafashijweCount(totalYarafashijweCount)
                .totalYatangiyeIsabatoCount(totalYatangiyeIsabatoCount)
                .totalYize7Count(totalYize7Count)
                .totalArarwayeCount(totalArarwayeCount)
                .totalAfiteIndiMpamvu(totalAfiteIndiMpamvu)
                .build();
            churchWideAttendanceRepository.save(newAttendance);
        }

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

    public ResponseEntity<?> addAttendance(FamilyAttendanceRequest request) {
return ResponseEntity.ok("Unimplemeneted method");
    }
}
