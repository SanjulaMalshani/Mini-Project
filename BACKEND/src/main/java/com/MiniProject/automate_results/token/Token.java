package com.MiniProject.automate_results.token;

import com.MiniProject.automate_results.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Token {

  @Id
  private String id;

  @Indexed(unique = true)
  public String token;

  @Builder.Default
  private TokenType tokenType = TokenType.BEARER;

  public boolean revoked;

  public boolean expired;

  @DBRef
  public User user;
}
