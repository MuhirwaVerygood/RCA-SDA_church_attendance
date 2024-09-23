package com.verygood.attendance.member;

import lombok.Data;

@Data
public class MemberDto {
    private String firstname;
    private String lastname;
    private String className;
    private String familyName;

    public  MemberDto(Member member){
        this.familyName= member.getFamily().getName();
        this.firstname= member.getFirstname();
        this.lastname = member.getLastname();
        this.className  = member.getClassName();
    };
}
