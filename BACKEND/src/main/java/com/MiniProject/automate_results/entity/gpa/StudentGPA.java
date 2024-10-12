package com.MiniProject.automate_results.entity.gpa;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class StudentGPA {
    private String index;
    private Double gpa;
}
