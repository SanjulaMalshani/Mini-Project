package com.MiniProject.automate_results.auth;

import com.MiniProject.automate_results.dto.Roles;
import com.MiniProject.automate_results.service.exception.BadRequestException;
import com.MiniProject.automate_results.service.exception.RecordNotFoundException;
import com.MiniProject.automate_results.user.Role;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthenticationController {

  private final AuthenticationService service;

  @PostMapping("/register/student")
  public ResponseEntity<AuthenticationResponse> registerStudent(
          @RequestBody RegisterRequest request
  ) throws BadRequestException {
    return ResponseEntity.ok(service.register(request, Role.STUDENT));
  }

  @PostMapping("/register/depSecretary")
  public ResponseEntity<AuthenticationResponse> registerSec(
          @RequestBody RegisterRequest request
  ) throws BadRequestException {
    return ResponseEntity.ok(service.register(request, Role.SECRETARY));
  }

  @PostMapping("/register/lecture")
  public ResponseEntity<AuthenticationResponse> registerLec(
          @RequestBody RegisterRequest request
  ) throws BadRequestException {
    return ResponseEntity.ok(service.register(request, Role.LECTURE));
  }

  @PostMapping("/register/hod")
  public ResponseEntity<AuthenticationResponse> registerHod(
          @RequestBody RegisterRequest request
  ) throws BadRequestException {
    return ResponseEntity.ok(service.register(request, Role.HOD));
  }

  @PostMapping("/register/dean")
  public ResponseEntity<AuthenticationResponse> registerDean(
          @RequestBody RegisterRequest request
  ) throws BadRequestException {
    return ResponseEntity.ok(service.register(request, Role.DEAN));
  }
  @PostMapping("/register/examBran")
  public ResponseEntity<AuthenticationResponse> registerExamBran(
          @RequestBody RegisterRequest request
  ) throws BadRequestException {
    return ResponseEntity.ok(service.register(request, Role.EXAMINATIONBRANCH));
  }
  @PostMapping("/register/registrar")
  public ResponseEntity<AuthenticationResponse> registerRegistrar(
          @RequestBody RegisterRequest request
  ) throws BadRequestException {
    return ResponseEntity.ok(service.register(request, Role.REGISTRAR));
  }
  @PostMapping("/register/vc")
  public ResponseEntity<AuthenticationResponse> registerVc(
          @RequestBody RegisterRequest request
  ) throws BadRequestException {
    return ResponseEntity.ok(service.register(request, Role.VC));
  }
  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request
  ) {
    return ResponseEntity.ok(service.authenticate(request));
  }

  @PostMapping("/refresh-token")
  public void refreshToken(
      HttpServletRequest request,
      HttpServletResponse response
  ) throws IOException {
    service.refreshToken(request, response);
  }


  @PostMapping("/ps")
  public ResponseEntity<?> password(
          @RequestBody AuthenticationRequest request
  ) throws BadRequestException, RecordNotFoundException {
    service.changePassword(request.getPassword(),request.getEmail());
    return ResponseEntity.ok("Changed password");
  }


}
