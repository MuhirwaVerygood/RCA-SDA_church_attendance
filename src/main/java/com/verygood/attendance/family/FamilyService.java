package com.verygood.attendance.family;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FamilyService {
    private final FamilyRepository repository;

    public ResponseEntity<List<Family>> getFamilies() {
        return ResponseEntity.ok(repository.findAll());
    }

    public ResponseEntity<?> addFamily(FamilyRequest familyRequest) {
        Family newFamily = Family.builder().name(familyRequest.getName()).build();
        repository.save(newFamily);
        return ResponseEntity.ok("Family created successfully");
    }


    public ResponseEntity<?> deleteFamily(Integer id) {
        Optional<Family> familyExists = repository.findById(id);
        if(!familyExists.isPresent()){
            return ResponseEntity.status(404).body("Family with that id not found");
        }
        repository.deleteById(id);
        return ResponseEntity.ok("Family deleted succcessfully");
    }
}
