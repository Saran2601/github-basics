package com.newproject.mobilestore.services.Impl;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.newproject.mobilestore.repositories.Admin_repository;
import com.newproject.mobilestore.services.Admin_service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import com.newproject.mobilestore.models.Admin;
import com.newproject.mobilestore.models.Login;



@Service
public class Admin_impl implements Admin_service {
 
    @Autowired
    private Admin_repository admin_repository;
      
    @Autowired
    private BCryptPasswordEncoder passwordEncoder; 

    @Override
    public Boolean Register(Admin data) {
      Optional<Admin> adminOptional = admin_repository.findByEmail(data.getEmail());
      if (adminOptional.isPresent()) {
        return false;
      }
      else{
      String encryptedPassword = passwordEncoder.encode(data.getPassword());
      data.setPassword(encryptedPassword);
      admin_repository.save(data);
      return true;
      }
    }

    @Override
    public String Login(Login data) {
      Optional<Admin> adminOptional = admin_repository.findByEmail(data.getEmail());

      if (adminOptional.isPresent()) {
          Admin admin = adminOptional.get();

          if (passwordEncoder.matches(data.getPassword(), admin.getPassword())) {
            String token = generateJWTToken(admin);
            return token;
          }
      }
      return null;
    
    }
     private String generateJWTToken(Admin admin) {
    String secretKey = "husguasuVGU@4r7DTRDcvFTVtbc#$^6^^#cyvc";

    String token = Jwts.builder()
            .setSubject(admin.getEmail())
            .claim("userId", admin.getId()) 
            .setIssuedAt(new Date()) 
            .setExpiration(new Date(System.currentTimeMillis() + 86400000))
            .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS256) 
            .compact();

    return token;
}

   
    
}
