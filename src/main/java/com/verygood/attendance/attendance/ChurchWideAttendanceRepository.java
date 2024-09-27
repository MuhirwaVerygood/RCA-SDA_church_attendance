package com.verygood.attendance.attendance;

import java.util.Optional;
import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChurchWideAttendanceRepository  extends JpaRepository<ChurchWideAttendance, LocalDate> {

    Optional<ChurchWideAttendance> findByDate(LocalDate date);

}
