package com.abidiyoussef.indatacore.controllers;

import com.abidiyoussef.indatacore.entities.UserIndatacore;
import com.abidiyoussef.indatacore.repositories.UserIndatacoreRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@EnableMethodSecurity(prePostEnabled = true)
@CrossOrigin("*")
public class UserController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtEncoder jwtEncoder;
    @Autowired
    private JwtDecoder jwtDecoder;

    @Autowired
    private UserIndatacoreRepo userIndatacoreRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("/auth/login")
    public Map<String,String> login (String email, String password){
        System.out.println(email+" - "+password);
        Authentication authentication =  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));
        Instant instant=Instant.now();
        String scope = authentication.getAuthorities().stream().map(a->a.getAuthority()).collect(Collectors.joining(" "));
        JwtClaimsSet jwtClaimsSet = JwtClaimsSet.builder()
                .issuedAt(instant)
                .expiresAt(instant.plus(10, ChronoUnit.MINUTES))
                .subject(email)
                .claim("scope",scope)
                .build();
        JwtEncoderParameters jwtEncoderParameters=JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS512).build(),jwtClaimsSet);
        String jwt=jwtEncoder.encode(jwtEncoderParameters).getTokenValue();
        System.out.println(jwt);
        return Map.of("access-token",jwt);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<String> registerUser(@RequestBody UserIndatacore user) {
        try {
            System.out.println(user.getPassword());
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            userIndatacoreRepo.save(user);
            return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to register user", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
