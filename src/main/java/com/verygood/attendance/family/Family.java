package com.verygood.attendance.family;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.verygood.attendance.member.Member;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Builder
@Entity
@Table(name = "family")
@AllArgsConstructor
@NoArgsConstructor
public class Family {
    @Id
    @SequenceGenerator(name = "family_seq", sequenceName = "family_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,  generator = "family_seq")
    private Integer id;
    private String name;
    @OneToMany
    @JsonManagedReference
    private List<Member> members;
}
