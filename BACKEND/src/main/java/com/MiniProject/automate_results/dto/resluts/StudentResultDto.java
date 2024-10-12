package com.MiniProject.automate_results.dto.resluts;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class StudentResultDto {
    @NotNull(message = "No cannot be null")
    private Integer no;

    @NotBlank(message = "Index cannot be blank")
    private String index;

    @NotBlank(message = "Grade cannot be blank")
    private String grade;
}
