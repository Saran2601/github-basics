package com.newproject.mobilestore.services.Impl;

import java.util.Date;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.newproject.mobilestore.repositories.User_repository;
import com.newproject.mobilestore.services.Email_service;
import com.newproject.mobilestore.services.User_service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import com.newproject.mobilestore.models.Signup;
import com.newproject.mobilestore.models.Login;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;


@Service
public class User_impl implements User_service {

  @Autowired
  private User_repository user_repository;

  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  @Autowired
  Email_service emailservice ;

  private final Cache<String, String> otpCache;

     public User_impl() {
       
        this.otpCache = Caffeine.newBuilder()
                .expireAfterWrite(5, TimeUnit.MINUTES)
                .build();
    }


  @Override

  public Boolean Register(Signup data) {
    Optional<Signup> userOptional = user_repository.findByEmail(data.getEmail());
    if (userOptional.isPresent()) {
      return false;
    } else {
      String encryptedPassword = passwordEncoder.encode(data.getPassword());
      data.setPassword(encryptedPassword);
      user_repository.save(data);
      emailservice.sendRegistrationEmail(data.getEmail(),data.getUserName());
      return true;
    }
  }

  @Override
  public String Login(Login data) {
    Optional<Signup> userOptional = user_repository.findByEmail(data.getEmail());

    if (userOptional.isPresent()) {
      Signup user = userOptional.get();

      if (passwordEncoder.matches(data.getPassword(), user.getPassword())) {
        String token = generateJWTToken(user);
        return token;
      }
    }
    return null;
  }

  @Override
  public Signup findByEmail(String email) {
    Optional<Signup> User = user_repository.findByEmail(email);
    if (User != null) {
      Signup user = User.get();
      return user;
    }
    return null;
  }

  private String generateJWTToken(Signup user) {
    String secretKey = "husguasuVGU@4r7DTRDcvFTVtbc#$^6^^#cyvc";

    String token = Jwts.builder()
        .setSubject(user.getEmail())
        .claim("userId", user.getId())
        .claim("userName", user.getUserName())
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + 86400000))
        .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS256)
        .compact();

    return token;
  }

  @Override

  public String GoogleLogin(Signup data) {
    Optional<Signup> userOptional = user_repository.findByEmail(data.getEmail());

    if (userOptional.isPresent()) {
      Signup user = userOptional.get();
      String token = generateJWTToken(user);
      return token;
    } else {
       try {
            user_repository.save(data);
            emailservice.sendRegistrationEmail(data.getEmail(),data.getUserName());
            return generateJWTToken(data);
        } catch (DataIntegrityViolationException e) {
            return null;
        } catch (Exception e) {
            return null;
        }

    }
  }

  @Override
  public boolean emailExists(String email) {
     Optional<Signup> User = user_repository.findByEmail(email);
    if (User.isPresent()) {
      return true;
    }
    return false;

  }

  @Override
  public void saveOtp(String email, String otp) {
    otpCache.put(email, otp);
}

  @Override
  public String getOtp(String email) {
    return otpCache.getIfPresent(email);
}

  @Override
  public void resetPassword(String email, String newPassword) {
    Optional<Signup> userOptional = user_repository.findByEmail(email);
    userOptional.ifPresent(user -> {
        String encryptedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encryptedPassword);
        user_repository.save(user);
        otpCache.invalidate(email);
    });
} 

}
