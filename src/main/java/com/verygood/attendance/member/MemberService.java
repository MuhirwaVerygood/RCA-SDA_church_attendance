package com.verygood.attendance.member;

import com.verygood.attendance.family.Family;
import com.verygood.attendance.family.FamilyRepository;
import lombok.RequiredArgsConstructor;

import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                MemberResponse
                .builder()
                .message("Family with that id does not exist")
                .build()
            );
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
            return ResponseEntity.status(HttpStatusCode.valueOf(200)).body(
                MemberResponse
                .builder()
                .message("Member added successfully")
                .build()
            );
        }
    }

    public ResponseEntity<?> deleteMemberById(Integer memberId) {
        Optional<Member> memberExists = repository.findById(memberId);
        if(!memberExists.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("A member with that id not found");
        }
         repository.deleteById(memberId);
         return ResponseEntity.ok().body("Member deleted successfully");
        }
}
