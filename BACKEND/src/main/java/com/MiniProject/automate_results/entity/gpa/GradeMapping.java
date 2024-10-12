package com.MiniProject.automate_results.entity.gpa;

import java.util.HashMap;
import java.util.Map;

public class GradeMapping {
    private static final Map<String, Double> gradeValues = new HashMap<>();

    static {
        gradeValues.put("A+", 4.0);
        gradeValues.put("A", 3.5);
        gradeValues.put("A-", 3.0);
        gradeValues.put("B+", 2.5);
        gradeValues.put("B", 2.0);
        gradeValues.put("B-", 1.5);
        gradeValues.put("C+", 1.0);
        gradeValues.put("C", 0.5);
        gradeValues.put("F", 0.0);
        // Add other grades if needed
    }

    public static double getGradeValue(String grade) {
        return gradeValues.getOrDefault(grade, 0.0);
    }
}

