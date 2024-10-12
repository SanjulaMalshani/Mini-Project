package com.MiniProject.automate_results.token;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;


public interface TokenRepository extends MongoRepository<Token, Integer> {

//  @Query(value = """
//      select t from Token t inner join User u\s
//      on t.user.id = u.id\s
//      where u.id = :id and (t.expired = false or t.revoked = false)\s
//      """)
//  List<Token> findAllValidTokenByUser(Integer id);

  @Query("{ 'userId' : ?0, $or: [ { 'expired': false }, { 'revoked': false } ] }")
  List<Token> findAllValidTokenByUser(String userId);


  Optional<Token> findByToken(String token);
}
