package com.abidiyoussef.indatacore.entities;

import com.opencsv.bean.CsvBindByName;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentCsvRepresentation {

    @CsvBindByName(column = "firstname")
    private String fname;
    @CsvBindByName(column = "lastname")
    private String lname;
    @CsvBindByName(column = "age")
    private int age;
    @CsvBindByName(column = "email")
    private String email;
}
