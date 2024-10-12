package com.MiniProject.automate_results.auth;


import com.MiniProject.automate_results.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

  private String fullName;
  private String email;
  private String password;
  private String faculty;
  private String department;
  private String employeeId;
  private Role role;
  private String id;
}
