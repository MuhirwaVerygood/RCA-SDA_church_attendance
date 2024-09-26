package com.verygood.attendance.member;

import lombok.Data;

@Data
public class MemberDto {
    private Integer memberId;
    private String firstname;
    private String lastname;
    private String className;
    private String familyName;
    private String gender;

    public  MemberDto(Member member){
        this.memberId= member.getId();
        this.familyName= member.getFamily().getName();
        this.gender= member.getGender();
        this.firstname= member.getFirstname();
        this.lastname = member.getLastname();
        this.className  = member.getClassName();
    };
}
