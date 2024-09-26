package com.verygood.attendance.attendance;

import com.verygood.attendance.family.Family;
import com.verygood.attendance.family.FamilyRepository;
import com.verygood.attendance.member.Member;
import com.verygood.attendance.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AttendanceService {
    private final AttendanceRepository repository;
    private final FamilyRepository familyRepository;
    private final MemberRepository memberRepository;

    public ResponseEntity<?> getAttendances() {
        return ResponseEntity.ok(repository.findAll());
    }

    public ResponseEntity<?> addAttendance(AttendanceRequest[] requests) {
       for(AttendanceRequest request: requests){
           Optional<Member> member = memberRepository.findById(request.getMemberId());
           if (!member.isPresent()) {
               return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member with that ID not found");
           }

           Attendance attendance = Attendance.builder()
                   .familyId(member.get().getFamily().getId())
                   .issuedDate(LocalDate.now())
                   .build();

           if (request.isYaje()) {
               attendance.setTotalYajeCount(attendance.getTotalYajeCount() + 1);
           }
           if (request.isYarasuye()) {
               attendance.setTotalYarasuyeCount(attendance.getTotalYarasuyeCount() + 1);
           }
           if (request.isYarasuwe()) {
               attendance.setTotalYarasuweCount(attendance.getTotalYarasuweCount() + 1);
           }
           if (request.isYarafashije()) {
               attendance.setTotalYarafashijeCount(attendance.getTotalYarafashijeCount() + 1);
           }
           if (request.isYarafashijwe()) {
               attendance.setGetTotalYarafashijweCount(attendance.getGetTotalYarafashijweCount() + 1);
           }
           if (request.isYatangiyeIsabato()) {
               attendance.setTotalYatangiyeIsabatoCount(attendance.getTotalYatangiyeIsabatoCount() + 1);
           }
           if (request.isYize7()) {
               attendance.setTotalYize7Count(attendance.getTotalYize7Count() + 1);
           }
           if (request.isArarwaye()) {
               attendance.setTotalArarwayeCount(attendance.getTotalArarwayeCount() + 1);
           }

           if (request.isAfiteIndiMpamvu()) {
            attendance.setTotalAfiteIndiMpamvu(attendance.getTotalAfiteIndiMpamvu() + 1);
        }

           repository.save(attendance);

       }
        return ResponseEntity.status(HttpStatus.CREATED).body("Attendance added successfully");
    }

    public ResponseEntity<?> getAttendanceByFamilyId(Integer familyId) {
        Optional<Family> familyExists = familyRepository.findById(familyId);
        if(!familyExists.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Family with that id does not exist");
        }

        List<Attendance> attendances = repository.findByFamilyId(familyId);
        if(attendances.size() > 1){
            return ResponseEntity.ok(repository.findByFamilyId(familyId));
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No attendance found for family with id"+familyId);
        }
    }
}
