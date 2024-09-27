package com.verygood.attendance.attendance;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Builder
public class ChurchWideAttendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private LocalDate issuedDate;
    private int totalYajeCount;
    private int totalYarasuyeCount;
    private int totalYarasuweCount;
    private int totalYarafashijeCount;
    private int totalYarafashijweCount;
    private int totalYatangiyeIsabatoCount;
    private int totalYize7Count;
    private int totalArarwayeCount;
    private int totalAfiteIndiMpamvu;
    private int totalAbashytsi;

}
