package com.abidiyoussef.indatacore.Service;

import com.abidiyoussef.indatacore.entities.Student;
import com.abidiyoussef.indatacore.entities.StudentCsvRepresentation;
import com.abidiyoussef.indatacore.repositories.StudentRepo;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.Buffer;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepo repository;

    public Integer uploadStudents(MultipartFile file) throws IOException {
        Set<Student> students = parseCsv(file);
        repository.saveAll(students);
        return students.size();
    }

    private Set<Student> parseCsv(MultipartFile file) throws IOException {
        try(Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            HeaderColumnNameMappingStrategy<StudentCsvRepresentation> strategy =
                    new HeaderColumnNameMappingStrategy<>();
            strategy.setType(StudentCsvRepresentation.class);
            CsvToBean<StudentCsvRepresentation> csvToBean =
                    new CsvToBeanBuilder<StudentCsvRepresentation>(reader)
                            .withMappingStrategy(strategy)
                            .withIgnoreEmptyLine(true)
                            .withIgnoreLeadingWhiteSpace(true)
                            .build();
            return csvToBean.parse()
                    .stream()
                    .map(csvLine -> Student.builder()
                            .firstName(csvLine.getFname())
                            .lastName(csvLine.getLname())
                            .age(csvLine.getAge())
                            .email(csvLine.getEmail())

                            .build()
                    )
                    .collect(Collectors.toSet());
        }
    }
}