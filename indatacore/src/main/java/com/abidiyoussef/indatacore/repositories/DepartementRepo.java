package com.abidiyoussef.indatacore.repositories;

import com.abidiyoussef.indatacore.entities.Departement;
import com.abidiyoussef.indatacore.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartementRepo extends JpaRepository<Departement, Long> {
    Departement findByCode(String code);

}
