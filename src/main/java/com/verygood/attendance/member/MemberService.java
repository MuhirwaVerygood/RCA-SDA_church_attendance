package com.verygood.attendance.member;

import com.verygood.attendance.family.Family;
import com.verygood.attendance.family.FamilyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository repository;
    private final FamilyRepository familyRepository;
    public ResponseEntity<?> getMembers() {
        List<Member> members = repository.findAll();
        List<MemberDto> memberDtos = members.stream().map(MemberDto::new).collect(Collectors.toList());
        return ResponseEntity.ok(memberDtos);
    }

    public ResponseEntity<?> addMember(MemberRequest request) {
        Optional<Family>  family = familyRepository.findById(request.getFamilyId());
        if(!family.isPresent()){
            return ResponseEntity.badRequest().body("Family with that id not found");
        }else{
            Member member= Member
                    .builder()
                    .gender(request.getGender())
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .className(request.getClassName())
                    .family(family.get())
                    .build();
            Family familyExists = family.get();
            familyExists.getMembers().add(member);
            repository.save(member);
            familyRepository.save(familyExists);
            return ResponseEntity.ok("Member added successfully");
        }
    }
}
