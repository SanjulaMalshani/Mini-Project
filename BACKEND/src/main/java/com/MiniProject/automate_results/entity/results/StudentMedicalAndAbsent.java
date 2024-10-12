package com.MiniProject.automate_results.entity.results;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class StudentMedicalAndAbsent {
    private Integer no;
    private String index;
    private String status;
}
