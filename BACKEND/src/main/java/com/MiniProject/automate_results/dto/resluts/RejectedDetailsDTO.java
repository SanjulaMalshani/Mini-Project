package com.MiniProject.automate_results.dto.resluts;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RejectedDetailsDTO {
    private String rejectStatus;
    private String rejectMessage;
}
