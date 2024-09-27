package com.verygood.attendance.attendance;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@Table(name = "Report")
@AllArgsConstructor
@NoArgsConstructor
public class ChurchWideAttendance {
    @Id
    private LocalDate date;
    private int totalYajeCount;
    private int totalYarasuyeCount;
    private int totalYarasuweCount;
    private int totalYarafashijeCount;
    private int totalYarafashijweCount;
    private int totalYatangiyeIsabatoCount;
    private int totalYize7Count;
    private int totalArarwayeCount;
    private int totalAfiteIndiMpamvu;
}
