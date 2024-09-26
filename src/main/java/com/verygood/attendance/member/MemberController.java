package com.verygood.attendance.member;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/members")
@Tag(name="Members" , description = "Apis for members management")
@RequiredArgsConstructor public class MemberController {
    private  final MemberService service;

    @GetMapping
    public ResponseEntity<?> getMembers(){
        return  service.getMembers();
    }

    @PostMapping("/new")
    @PreAuthorize("hasAuthority('admin:create')")
    public ResponseEntity<?>  addMember(@RequestBody MemberRequest  request){
        return service.addMember(request);
    }

    @PreAuthorize("hasAuthority('admin:delete')")   
    @DeleteMapping("/{member-id}")
    public ResponseEntity<?> deleteMemberById(@PathVariable("member-id") Integer memberId){
        return service.deleteMemberById(memberId);
    }
}
