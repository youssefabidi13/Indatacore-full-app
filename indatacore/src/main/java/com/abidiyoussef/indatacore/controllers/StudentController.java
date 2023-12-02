package com.abidiyoussef.indatacore.controllers;

import com.abidiyoussef.indatacore.Service.StudentService;
import com.abidiyoussef.indatacore.entities.Departement;
import com.abidiyoussef.indatacore.entities.Student;
import com.abidiyoussef.indatacore.repositories.DepartementRepo;
import com.abidiyoussef.indatacore.repositories.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")

public class StudentController {
    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private DepartementRepo departementRepo;

    @Autowired
    private StudentService service;

    @GetMapping("/students")
    public List<Student> getStudents() {
        return studentRepo.findAll();
    }




    @PatchMapping("/updateStudent/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable Long id,
            @RequestBody Student studentUpdates) {

        studentRepo.findById(id);
        Student student = studentRepo.findById(id).get();
        student.setFirstName(studentUpdates.getFirstName());
        student.setLastName(studentUpdates.getLastName());
        student.setAge(studentUpdates.getAge());
        student.setEmail(studentUpdates.getEmail());
        student.setDepartement(studentUpdates.getDepartement());
        studentRepo.save(student);
        return new ResponseEntity<>(student, HttpStatus.OK);

    }
    @DeleteMapping("/deleteStudent/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentRepo.findById(id).get().setDepartement(null);
        studentRepo.deleteById(id);
    }

    @PostMapping("/addStudent")
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        String email = student.getEmail();

        Student existingStudent = studentRepo.findByEmail(email);
        if (existingStudent != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
//        Departement departement = student.getDepartement();
//        if (departementRepo.findById(departement.getId()).isEmpty()) {
//            departementRepo.save(departement);
//        }
        Student newStudent = student;
        studentRepo.save(newStudent);


        return new ResponseEntity<>(newStudent, HttpStatus.CREATED);
    }
    @PostMapping(value = "/upload", consumes = {"multipart/form-data"})
    public ResponseEntity<Integer> uploadStudents(
            @RequestPart("file") MultipartFile file
    ) throws IOException, InterruptedException {
        return ResponseEntity.ok(service.uploadStudents(file));
    }
    @GetMapping("/student-by-id/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Optional<Student> student = studentRepo.findById(id);
        return student.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


}
