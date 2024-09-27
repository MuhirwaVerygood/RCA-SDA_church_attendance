package com.verygood.attendance.member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {

    Optional<Member> findByIdAndFamilyId(Integer id, Integer familyId);

    List<Member> findByFamilyId(Integer familyId);
}
