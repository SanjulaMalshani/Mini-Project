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
public class StudentMedicalAndAbsentDto {
    @NotNull(message = "Number cannot be null")
    private Integer no;

    @NotBlank(message = "Index cannot be blank")
    private String index;

    @NotBlank(message = "Status cannot be blank")
    private String status;
}
