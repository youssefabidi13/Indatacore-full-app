package com.abidiyoussef.indatacore;

import com.abidiyoussef.indatacore.entities.Departement;
import com.abidiyoussef.indatacore.entities.Student;
import com.abidiyoussef.indatacore.entities.UserIndatacore;
import com.abidiyoussef.indatacore.repositories.DepartementRepo;
import com.abidiyoussef.indatacore.repositories.StudentRepo;
import com.abidiyoussef.indatacore.repositories.UserIndatacoreRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@SpringBootApplication
public class IndatacoreApplication {

    @Autowired
    private UserIndatacoreRepo userIndatacore;

    @Autowired
    private DepartementRepo departementRepo;

    @Autowired
    private StudentRepo studentRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(IndatacoreApplication.class, args);
    }

    //@Bean
    CommandLineRunner commandLineRunner(){
        return args -> {
//            userIndatacore.save(UserIndatacore.builder()
//                    .email("elmessbahiyoussef@gmail.com")
//                    .firstName("youssef")
//                    .lastName("mesbahi")
//                    .roles("USER")
//                    .password(passwordEncoder.encode("admin"))
//                    .build());
            // Save Departments
            departementRepo.saveAll(List.of(
                    Departement.builder().name("Computer Science").code("CS").build(),
                    Departement.builder().name("Electrical Engineering").code("EE").build(),
                    Departement.builder().name("Mechanical Engineering").code("ME").build()
            ));

            // Save Students
            departementRepo.findAll().forEach(department -> {
                studentRepository.saveAll(List.of(
                        Student.builder().firstName("John").lastName("Doe").age(22).email("John@gmail.com").departement(department).build(),
                        Student.builder().firstName("Jane").lastName("Smith").age(23).email("Jane@gmail.com").departement(department).build(),
                        Student.builder().firstName("Bob").lastName("Johnson").age(21).email("Bob@gmail.com").departement(department).build()
                ));
            });

        };
    }

}
