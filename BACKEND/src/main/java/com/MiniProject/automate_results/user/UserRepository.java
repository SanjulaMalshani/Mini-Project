package com.MiniProject.automate_results.user;

import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User, String> {

  Optional<User> findByEmail(String email);
  Optional<User> findByRole(String role);

  @Query("{ 'role' : { $ne: 'ADMIN' } }")
  List<User> findByRoleNotAdmin();

}
