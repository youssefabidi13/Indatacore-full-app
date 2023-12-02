package com.abidiyoussef.indatacore.controllers;

import com.abidiyoussef.indatacore.dto.DepartmentChartDataDTO;
import com.abidiyoussef.indatacore.entities.Departement;
import com.abidiyoussef.indatacore.entities.Student;
import com.abidiyoussef.indatacore.repositories.DepartementRepo;
import com.abidiyoussef.indatacore.repositories.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class DepartementController {
    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private DepartementRepo departementRepo;
    @GetMapping("/departements")
    public List<Departement> getDepartements() {
        return departementRepo.findAll();
    }


    @PatchMapping("/update-departement/{id}")
    public ResponseEntity<Departement> partialUpdateDepartement(
            @PathVariable Long id,
            @RequestBody Departement departementUpdates) {
            if (departementUpdates.getName() == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            Departement departement = departementRepo.findById(id).get();
            departement.setName(departementUpdates.getName());
            departement.setCode(departementUpdates.getCode());
            departementRepo.save(departement);
        return new ResponseEntity<>(departement, HttpStatus.OK);
    }
    @DeleteMapping("/deleteDepartement/{id}")
    public void deleteDepartement(@PathVariable Long id) {
        departementRepo.findById(id).get().getStudents().forEach(student -> {
            student.setDepartement(null);
            studentRepo.save(student);
        });
        departementRepo.deleteById(id);
    }

    @PostMapping("/addDepartement")
    public ResponseEntity<Departement> addDepartement(@RequestBody Departement departement) {
        String code = departement.getCode();

        Departement existingDepartement = departementRepo.findByCode(code);
        if (existingDepartement != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Departement newDepatement = departement;
        departementRepo.save(newDepatement);


        return new ResponseEntity<>(newDepatement, HttpStatus.CREATED);
    }
    @GetMapping("/departement-by-id/{id}")
    public ResponseEntity<Departement> getDepartementById(@PathVariable Long id) {
        Optional<Departement> departement = departementRepo.findById(id);
        return departement.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @GetMapping("/department-student-count")
    public List<DepartmentChartDataDTO> getDepartmentStudentCount() {
        List<Departement> departments = departementRepo.findAll();

        return departments.stream()
                .map(department -> {
                    DepartmentChartDataDTO chartData = new DepartmentChartDataDTO();
                    chartData.setDepartmentName(department.getName());
                    chartData.setNumberOfStudents(department.getStudents().size());
                    return chartData;
                })
                .collect(Collectors.toList());
    }
}
