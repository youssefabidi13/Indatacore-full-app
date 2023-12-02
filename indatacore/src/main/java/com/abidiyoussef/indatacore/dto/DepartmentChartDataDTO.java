package com.abidiyoussef.indatacore.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DepartmentChartDataDTO {
    private String departmentName;
    private int numberOfStudents;
}