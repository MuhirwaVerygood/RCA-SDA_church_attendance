package com.verygood.attendance.family;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/family")
@RequiredArgsConstructor
public class FamilyController {
    private final FamilyService service;
    @GetMapping
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<List<Family>> getFamilies(){
        return  service.getFamilies();
    }

    @PostMapping("/new")
    @PreAuthorize("hasAuthority('admin:create')")
    public ResponseEntity<?> createFamily(@RequestBody  FamilyRequest familyRequest){
        return service.addFamily(familyRequest);
    }


    @DeleteMapping("/{family-id}")
    @PreAuthorize("hasAuthority('admin:delete')")
    public ResponseEntity<?> deleteFamily(@PathVariable("family-id") Integer id){
        return service.deleteFamily(id);
    }


}
