package com.verygood.attendance.attendance;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "attendance")
public class Attendance {
    @Id
    @SequenceGenerator(name = "attendance_seq", sequenceName = "attendance_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "attendance_seq")
    private Integer id;
    private LocalDate issuedDate;
    private int familyId;
    private int totalYajeCount=0;
    private int totalArarwayeCount=0;
    private int totalYarasuyeCount=0;
    private int totalYarasuweCount=0;
    private int totalYarafashijeCount=0;
    private int getTotalYarafashijweCount=0;
    private int totalYatangiyeIsabatoCount=0;
    private int totalYarasibyeCount=0;
    private int totalYize7Count=0;
    private int totalAfiteIndiMpamvu=0;
    private int abashyitsi;
};
