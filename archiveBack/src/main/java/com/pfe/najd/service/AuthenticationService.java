package com.pfe.najd.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AuthenticationService {
    private final JwtEncoder jwtEncoder;

    public AuthenticationService(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    public Map<String, String> generateJwtToken(Authentication authentication) {
        Map<String, String> idToken = new HashMap<>();
        Instant instant = Instant.now();
        String scope = authentication.getAuthorities().stream().map(auth->auth.getAuthority()).
                collect(Collectors.joining(" "));
        JwtClaimsSet jwtClaimsSet = JwtClaimsSet.builder()
                .subject(authentication.getName())
                .issuedAt(instant)
                .expiresAt(instant.plus(60, ChronoUnit.MINUTES))
                .issuer("security-service")
                .claim("scope",scope)
                .build();
        String jwtAccessToken = jwtEncoder.encode(JwtEncoderParameters.from(jwtClaimsSet)).getTokenValue() ;
        idToken.put("accessToken",jwtAccessToken);
        return idToken;
    }
}
