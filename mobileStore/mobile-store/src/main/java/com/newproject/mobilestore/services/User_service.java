package com.newproject.mobilestore.services;

import com.newproject.mobilestore.models.Login;
import com.newproject.mobilestore.models.Signup;


public interface User_service {
    public abstract Boolean Register(Signup data);
    public abstract String Login (Login data);
    public abstract Signup findByEmail(String email);
    public abstract String GoogleLogin(Signup data);
    public abstract boolean emailExists(String email);
    public abstract void saveOtp(String email, String otp);
    public abstract String getOtp(String email);
    public abstract void resetPassword(String email, String newPassword);
    
}
