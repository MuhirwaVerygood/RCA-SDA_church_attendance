package com.verygood.attendance.family;

import com.verygood.attendance.member.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data

@AllArgsConstructor
@NoArgsConstructor
public class FamilyRequest {
    private String name;
    private List<Member> members;
}
