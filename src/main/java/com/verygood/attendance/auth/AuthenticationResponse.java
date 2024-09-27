package com.verygood.attendance.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.verygood.attendance.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
  @JsonProperty
  private String message;
  @JsonProperty("access_token")
  private String accessToken;
  @JsonProperty("refresh_token")
  private String refreshToken;
  @JsonProperty
  private Role role;
}
