package com.verygood.attendance.member;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.verygood.attendance.family.Family;
import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@Entity
@Table(name = "members")
@AllArgsConstructor
@NoArgsConstructor
public class Member {
    @Id
    @SequenceGenerator(name = "member_seq", sequenceName = "member_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,  generator = "member_seq")
    private Integer id;

    private String firstname;
    private String lastname;
    private String className;
    @ManyToOne
//    @JsonIgnore
    @JsonBackReference
    private Family family;
}
