// package com.verygood.attendance.attendance;

// import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters.LocalDateConverter;
// import org.springframework.stereotype.Service;

// import lombok.RequiredArgsConstructor;
// import java.time.LocalDate;
// import java.util.*;

// @Service
// @RequiredArgsConstructor
// public class ChurchWideAttendanceService {
//     private final ChurchWideAttendanceRepository churchWideAttendanceRepository;

//     public void updateChurchWideTotals(
//         int yajeCount, int yarasuyeCount, int yarasuweCount, 
//         int yarafashijeCount, int yarafashijweCount, 
//         int yatangiyeIsabatoCount, int yize7Count, 
//         int ararwayeCount, int afiteIndiMpamvuCount
//     ) {
//         // Fetch the church-wide attendance for today, or create a new one
//         LocalDateConverter today = LocalDate.now();
//         Optional<ChurchWideAttendance> churchAttendance = churchWideAttendanceRepository.findByIssuedDate(today);

//         ChurchWideAttendance attendance;
//         if (churchAttendance.isPresent()) {
//             attendance = churchAttendance.get();
//             attendance.setTotalYajeCount(attendance.getTotalYajeCount() + yajeCount);
//             attendance.setTotalYarasuyeCount(attendance.getTotalYarasuyeCount() + yarasuyeCount);
//             attendance.setTotalYarasuweCount(attendance.getTotalYarasuweCount() + yarasuweCount);
//             attendance.setTotalYarafashijeCount(attendance.getTotalYarafashijeCount() + yarafashijeCount);
//             attendance.setTotalYarafashijweCount(attendance.getTotalYarafashijweCount() + yarafashijweCount);
//             attendance.setTotalYatangiyeIsabatoCount(attendance.getTotalYatangiyeIsabatoCount() + yatangiyeIsabatoCount);
//             attendance.setTotalYize7Count(attendance.getTotalYize7Count() + yize7Count);
//             attendance.setTotalArarwayeCount(attendance.getTotalArarwayeCount() + ararwayeCount);
//             attendance.setTotalAfiteIndiMpamvu(attendance.getTotalAfiteIndiMpamvu() + afiteIndiMpamvuCount);
//         } else {
//             attendance = ChurchWideAttendance.builder()
//                 .issuedDate(today)
//                 .totalYajeCount(yajeCount)
//                 .totalYarasuyeCount(yarasuyeCount)
//                 .totalYarasuweCount(yarasuweCount)
//                 .totalYarafashijeCount(yarafashijeCount)
//                 .totalYarafashijweCount(yarafashijweCount)
//                 .totalYatangiyeIsabatoCount(yatangiyeIsabatoCount)
//                 .totalYize7Count(yize7Count)
//                 .totalArarwayeCount(ararwayeCount)
//                 .totalAfiteIndiMpamvu(afiteIndiMpamvuCount)
//                 .build();
//         }

//         churchWideAttendanceRepository.save(attendance);
//     }
// }
