package com.verygood.attendance.member;

import lombok.Data;

@Data
public class MemberRequest {
    private String firstname;
    private String lastname;
    private String className;
    private Integer familyId;
}
