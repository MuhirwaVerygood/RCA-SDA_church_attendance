package com.verygood.attendance.attendance;

import java.util.Optional;
import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChurchWideAttendanceRepository  extends JpaRepository<ChurchWideAttendance, Integer> {

    Optional<ChurchWideAttendance> findByIssuedDate(LocalDate today);

}
