package com.newproject.mobilestore.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.newproject.mobilestore.helper.Otpgenerator;
import com.newproject.mobilestore.services.Email_service;
import com.newproject.mobilestore.services.User_service;

@RestController
@RequestMapping("/forgot-password")
public class ForgerPassword_controller {

    @Autowired
    private Email_service emailService;

    @Autowired
    private User_service userService; 

    @PostMapping("/generate-otp")
    public boolean generateOtp(@RequestParam String email) {
        try{
        if (userService.emailExists(email)) {
            String otp = Otpgenerator.generateOtp();
            userService.saveOtp(email, otp);
            emailService.sendOtpEmail(email, "Password Reset OTP", otp);
            return true;
        } else {
            return false;
        }
    }
    catch(Exception e){
        return false;
    }
    }

    @PostMapping("/verify-otp")
    public boolean verifyOtp(@RequestParam String email, @RequestParam String otp) {
        try{
        String savedOtp = userService.getOtp(email);
        if (otp.equals(savedOtp)) {
           return true;
        } else {
          return false;
        }
    }
    catch(Exception e){
        return false;
    }

    }

    @PostMapping("/reset-password")
    public boolean resetPassword(@RequestParam String email, @RequestParam String newPassword) {
        try{
        userService.resetPassword(email, newPassword);
        return true;
        }
        catch (Exception e){
            return false;
        }
    }
}

