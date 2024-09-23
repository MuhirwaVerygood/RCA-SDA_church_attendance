package com.verygood.attendance.member;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/members")
@RequiredArgsConstructor
public class MemberController {
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
}
