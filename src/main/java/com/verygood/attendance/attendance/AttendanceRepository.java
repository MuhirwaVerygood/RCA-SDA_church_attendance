package com.verygood.attendance.attendance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {
    List<Attendance> findByFamilyId(Integer familyId);
    Optional<Attendance> findByFamilyIdAndIssuedDate(Integer familyId, LocalDate issuedDate);

}

