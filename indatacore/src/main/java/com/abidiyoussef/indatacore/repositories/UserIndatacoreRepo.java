package com.abidiyoussef.indatacore.repositories;

import com.abidiyoussef.indatacore.entities.UserIndatacore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserIndatacoreRepo extends JpaRepository<UserIndatacore, Long> {
    Optional<UserIndatacore>  findByEmail(String email);
}
